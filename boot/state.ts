import App from 'features/app'
import Doc from 'features/doc'

import { FeatureNames, FeatureName, RootState, Action } from 'model'
import { Draft } from '@reduxjs/toolkit'

const reducers = {
  app: App.reducer,
  doc: Doc.reducer,
} as const

// export const Features = ['app', 'doc']

export default function combination (state = {} as Draft<RootState>, action: Action) {
  action.global = state
  const nextState = {} as RootState

  // _.each(reducers, (reducer, key: Feature) => {
  //   nextState[key] = reducer(state[key], action)
  // })
  for (let i = 0; i < FeatureNames.length; i++) {
    const key = FeatureNames[i]
    nextState[key] = reducers[key](state[key], action)
  }

  action.next = nextState
  return nextState
}

// export type RootState = ReturnType<typeof combination>