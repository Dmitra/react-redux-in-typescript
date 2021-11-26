import type { State as AppState } from 'features/app/model'
import type { State as DocState } from 'features/doc/model'

export type RootState = {
  app: AppState,
  doc: DocState,
}

export type FeatureName = keyof RootState

export const FeatureNames: FeatureName[] = ['app', 'doc']
export type State = AppState | DocState

export type Action<P = undefined, M = undefined> = {
  type: string,
  payload: P,
  global: RootState,
  next: RootState,
  meta: M,
}