import { palettes, theming } from 'variable-theming';

export const theme = theming({
  unit: {
    text: '1em',
    space: '1em',
    radius: '0.25rem'
  },
  typography: {
    primary: `Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif`,
    secondary: `Quicksand, Rubik, var(--typography-primary)`
  },
  palette: palettes({ tintBy: 0.2, shadeBy: 0.1 })({
    surface: { main: '#27363d', contrast: '#f8f8f8' },
    feature: { main: '#000', contrast: '#fff', tint: '#cdcdcd' },
    alternate: { main: '#00000066' },
    success: { main: '#31d484', contrast: '#ffffffd9' },
    failure: { main: '#ed7178', contrast: '#ffffff' },
    warning: { main: '#fcdf75', contrast: '#2e2e2e' },
    info: { main: '#2e2e2e', contrast: '#fafafa' },
    disable: { main: '#d9d9d9', contrast: '#929292' }
  }),
  shadow: {
    xs: '0 1px 3px 0 #0000001a, 0 1px 2px 0 #0000000f',
    sm: '0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f',
    md: '0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000000d',
    lg: '0 20px 25px -5px #0000001a, 0 10px 10px -5px #0000000a',
    xl: '0 25px 50px -20px #00000099',
    inset: 'inset 0 2px 4px 0 #0000000f'
  }
});
