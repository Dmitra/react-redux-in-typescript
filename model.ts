import type { AppState } from 'features/app/model'
import type { DocState } from 'features/doc/model'

export type RootState = {
  app: AppState,
  doc: DocState,
}

export type Action<P = unknown, M = unknown> = {
  type: string,
  payload: P,
  global?: RootState,
  next?: RootState,
  meta?: M,
}

export type ActionCreator<P = unknown, M = unknown> = {
  type: string
  (payload?: P, meta?: M): Action<P, M>
}