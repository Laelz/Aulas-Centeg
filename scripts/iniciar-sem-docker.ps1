# Executar apenas no computador que sera preparado para a aula.
# Nao altera PATH global nem instala Docker, WSL ou programas no Windows.
[CmdletBinding()]
param(
    [ValidateRange(1024, 65535)]
    [int]$Port = 5173,
    [switch]$PrepareOnly,
    [switch]$InstallEditorExtensions
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$toolsRoot = Join-Path $projectRoot '.tools'
$originalLocation = Get-Location
$originalPath = $env:PATH

function Find-NodeRuntime {
    $candidates = @()
    $systemNode = Get-Command node.exe -ErrorAction SilentlyContinue
    if ($systemNode) { $candidates += $systemNode.Source }
    if (Test-Path -LiteralPath $toolsRoot) {
        $candidates += Get-ChildItem -LiteralPath $toolsRoot -Directory -Filter 'node-v24.*-win-*' |
            ForEach-Object { Join-Path $_.FullName 'node.exe' }
    }
    foreach ($candidate in $candidates) {
        $npmPath = Join-Path (Split-Path -Parent $candidate) 'npm.cmd'
        if (!(Test-Path -LiteralPath $candidate) -or !(Test-Path -LiteralPath $npmPath)) { continue }
        try {
            $versionText = & $candidate --version
            if ($LASTEXITCODE -ne 0) { continue }
            $nodeVersion = [version]($versionText.Trim().TrimStart('v'))
            # Mantem a mesma linha principal utilizada pelo Docker do projeto.
            if ($nodeVersion.Major -eq 24 -and $nodeVersion -ge [version]'24.12.0') {
                return $candidate
            }
        } catch {
            # Uma instalacao incompleta nao impede tentar a proxima opcao.
        }
    }
    return $null
}

function Install-LocalNode {
    $architecture = $env:PROCESSOR_ARCHITEW6432
    if (!$architecture) { $architecture = $env:PROCESSOR_ARCHITECTURE }
    switch ($architecture.ToUpperInvariant()) {
        'AMD64' { $nodeArchitecture = 'x64' }
        'ARM64' { $nodeArchitecture = 'arm64' }
        default { throw 'Este script requer Windows de 64 bits (AMD64 ou ARM64).' }
    }

    Write-Host '[1/3] Baixando Node.js 24 do site oficial (instalacao local)...'
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
    $releases = Invoke-RestMethod -Uri 'https://nodejs.org/dist/index.json'
    $release = $releases | Where-Object {
        $_.version -match '^v24\.\d+\.\d+$' -and $_.lts -and
        ([version]$_.version.TrimStart('v')) -ge [version]'24.12.0' -and
        $_.files -contains "win-$nodeArchitecture-zip"
    } | Select-Object -First 1
    if (!$release) { throw 'Nao foi encontrada uma versao Node 24 LTS compativel no site oficial.' }

    $version = $release.version
    $folderName = "node-$version-win-$nodeArchitecture"
    $archiveName = "$folderName.zip"
    $baseUrl = "https://nodejs.org/dist/$version"
    New-Item -ItemType Directory -Path $toolsRoot -Force | Out-Null
    $archivePath = Join-Path $toolsRoot $archiveName

    # Confere SHA-256 antes de extrair ou executar qualquer arquivo baixado.
    $manifest = (Invoke-WebRequest -UseBasicParsing -Uri "$baseUrl/SHASUMS256.txt").Content
    $entry = ($manifest -split "`n") | Where-Object {
        $_.Trim() -match ('^[a-fA-F0-9]{64}\s+' + [regex]::Escape($archiveName) + '$')
    } | Select-Object -First 1
    if (!$entry) { throw 'O checksum oficial do arquivo nao foi encontrado.' }
    $expectedHash = ($entry.Trim() -split '\s+')[0]
    Invoke-WebRequest -UseBasicParsing -Uri "$baseUrl/$archiveName" -OutFile $archivePath
    $actualHash = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash
    if ($actualHash -ne $expectedHash) {
        throw 'O download falhou na verificacao SHA-256. Execute novamente para baixar outra copia.'
    }
    Expand-Archive -LiteralPath $archivePath -DestinationPath $toolsRoot -Force
    return Join-Path (Join-Path $toolsRoot $folderName) 'node.exe'
}

try {
    Set-Location -LiteralPath $projectRoot
    foreach ($requiredFile in @('package.json', 'package-lock.json', 'index.html')) {
        if (!(Test-Path -LiteralPath (Join-Path $projectRoot $requiredFile))) {
            throw "Arquivo ausente: $requiredFile. Extraia a pasta completa do projeto antes de executar."
        }
    }

    $nodePath = Find-NodeRuntime
    if (!$nodePath) { $nodePath = Install-LocalNode }
    $nodeFolder = Split-Path -Parent $nodePath
    $env:PATH = "$nodeFolder;$originalPath"
    $npmPath = Join-Path $nodeFolder 'npm.cmd'
    & $nodePath --version
    if ($LASTEXITCODE -ne 0) { throw 'Nao foi possivel executar o Node.js.' }

    Write-Host '[2/3] Instalando as dependencias do projeto com npm ci...'
    & $npmPath ci
    if ($LASTEXITCODE -ne 0) {
        throw 'npm ci falhou. Confira internet, permissoes da pasta e a mensagem acima. Feche outros processos Node deste projeto antes de tentar novamente.'
    }

    if ($InstallEditorExtensions) {
        $editor = Get-Command code.cmd -ErrorAction SilentlyContinue
        if ($editor) {
            foreach ($extension in @('Vue.volar', 'esbenp.prettier-vscode')) {
                & $editor.Source --install-extension $extension
                if ($LASTEXITCODE -ne 0) { Write-Warning "Nao foi possivel instalar $extension. Instale-a pelo VS Code." }
            }
        } else {
            Write-Warning 'VS Code nao encontrado no PATH. As extensoes sao opcionais para executar o projeto.'
        }
    }

    if ($PrepareOnly) {
        Write-Host '[3/3] Ambiente preparado. Execute iniciar-sem-docker.cmd para abrir a aplicacao.'
    } else {
        Write-Host "[3/3] Iniciando http://localhost:$Port"
        Write-Host 'Mantenha este terminal aberto. Para parar, pressione Ctrl + C.'
        Write-Host 'Se a porta estiver ocupada, feche o outro servidor ou use -Port 5174.'
        # A ultima opcao --host limita o servidor ao computador do aluno.
        # --strictPort evita abrir silenciosamente em outra porta.
        & $npmPath run dev -- --host 127.0.0.1 --port $Port --strictPort --open
        if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne 130 -and $LASTEXITCODE -ne -1073741510) {
            throw "O servidor terminou com erro ($LASTEXITCODE). Confira a mensagem acima."
        }
    }
} catch {
    Write-Host ''
    Write-Host ('ERRO: ' + $_.Exception.Message) -ForegroundColor Red
    Write-Host 'O script nao requer Docker nem WSL. A primeira preparacao requer internet e permissao de escrita na pasta.'
    exit 1
} finally {
    $env:PATH = $originalPath
    Set-Location -LiteralPath $originalLocation.Path
}
