export const AREA = {
  APP: 'APP',
  DOC: 'DOC',
} as const

export type AppState = {
  loading: (keyof typeof AREA)[],
}

export const palette = {
  main: 'blue',
  secondary: 'red',
}