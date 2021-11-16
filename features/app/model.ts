export enum AREA {
  APP = 'APP',
  DOC = 'DOC',
}

export type AppState = {
  loading: (keyof typeof AREA)[],
}

export const palette = {
  main: 'blue',
  secondary: 'red',
}