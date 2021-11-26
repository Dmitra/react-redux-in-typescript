import { AnyAction, PayloadAction as BasicPayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from 'boot/state'

import type { State as AppState } from 'features/app/model'
import type { State as DocState } from 'features/doc/model'

export type RootState = {
  app: AppState,
  doc: DocState,
}

export type FeatureName = keyof RootState

export const FeatureNames: FeatureName[] = ['app', 'doc']
// export type Feature = 'app' | 'doc'
// export type FeatureName = (typeof FeatureNames)[number]
export type State = AppState | DocState
// export type RootState = Record<FeatureName, State>
// export type RootState = {
//   [key in Feature]: State
// }

// export type RootState = DeepReadonly<{
//   app: AppState,
//   doc: DocState,
// }>

export type Action<P = undefined, M = undefined> = {
  type: string,
  payload: P,
  global: RootState,
  next: RootState,
  meta: M,
}

export type ActionCreator<P = undefined, M = undefined> = {
  type: string
  (payload?: P, meta?: M): Action<P, M>
}