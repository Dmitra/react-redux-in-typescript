export const AREA = {
  APP: 'APP',
  DOC: 'DOC',
  // as const означает, что в качестве значений ключей
  // нам нужны не какие-то строки, а именно эти: 'APP' и 'DOC'
} as const

export type AppState = {
  loading: (keyof typeof AREA)[],
}

export const palette = {
  main: 'blue',
  secondary: 'red',
}