@echo off
setlocal
title Ola, Alunos! - Sem Docker
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\iniciar-sem-docker.ps1" %*
set "resultado=%errorlevel%"
if not "%resultado%"=="0" (
  echo.
  echo Nao foi possivel iniciar. Leia a mensagem acima.
  pause
)
exit /b %resultado%
