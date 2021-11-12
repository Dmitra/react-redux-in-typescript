import { DeepReadonly } from 'ts-essentials'
import { AnyAction, PayloadAction as BasicPayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from 'boot/state'

import type { AppState } from 'features/app/model'
import type { DocState } from 'features/doc/model'

export const FeatureNames = ['app', 'doc'] as const
// export type Feature = 'app' | 'doc'
// export type FeatureName = (typeof FeatureNames)[number]
export type State = AppState | DocState
// export type RootState = Record<FeatureName, State>
// export type RootState = {
//   [key in Feature]: State
// }
export type RootState = {
  app: AppState,
  doc: DocState,
}
export type FeatureName = keyof RootState
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