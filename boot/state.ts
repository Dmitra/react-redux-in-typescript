import App from 'features/app'
import Doc from 'features/doc'

import { FeatureName, RootState } from 'model'
import { Draft, Reducer } from '@reduxjs/toolkit'
import { Action } from '../utils/createAction'

const reducers: { [Feature in FeatureName]: Reducer<RootState[Feature]> } = {
  app: App.reducer,
  doc: Doc.reducer,
}

export default function combination<T> (
  state = {} as Draft<RootState>,
  action: Action<Draft<RootState>, any, string, Draft<RootState>>,
) {
  action.global = state
  const nextState = {} as any

  const names = ['app', 'doc'] as const
  for (let i = 0; i < names.length; i++) {
    const name: keyof RootState = names[i]
    const sliceState = state[name] as unknown as T
    const reducer = reducers[name] as unknown as Reducer<T>
    nextState[name] = reducer(sliceState as T, action)
  }

  action.next = nextState as RootState
  return nextState
}