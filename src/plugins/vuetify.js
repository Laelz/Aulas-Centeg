import { createVuetify } from 'vuetify'
import {
  VApp, VAppBar, VAvatar, VBtn, VCard, VChip, VCol,
  VContainer, VDivider, VMain, VRow, VSpacer,
} from 'vuetify/components'

export const vuetify = createVuetify({
  components: {
    VApp, VAppBar, VAvatar, VBtn, VCard, VChip, VCol,
    VContainer, VDivider, VMain, VRow, VSpacer,
  },
  theme: {
    defaultTheme: 'alunos',
    themes: {
      alunos: {
        dark: false,
        colors: {
          primary: '#176b58',
          secondary: '#e8b04b',
          background: '#f7f8f4',
          surface: '#ffffff',
        },
      },
    },
  },
})

