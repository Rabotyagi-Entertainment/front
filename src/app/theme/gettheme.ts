import { ThemeConfig } from 'antd'

export const getTheme = (): ThemeConfig => {
  return {
    token: {
      colorPrimary: '#7498FF',
      colorFillSecondary: '#E0E7FF',
      colorTextSecondary: '#7498FF',
      fontFamily: 'Nunito Sans',
      colorText: '#7498FF',
    },
    components: {
      Button: {
        defaultColor: '#7498FF',
        primaryColor: 'white',
        defaultHoverBorderColor: '#7498FF',
        dangerColor: '#FD4C4C4D',
        colorSuccess: '#E0FFF0',
        colorPrimary: '#7498FF',
        borderRadius: 16,
      },
      Typography: {
        colorText: '#7498FF',
      },
    },
  }
}
