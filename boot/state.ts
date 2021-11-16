import App from 'features/app'
import Doc from 'features/doc'

import { FeatureNames, FeatureName, RootState } from 'model'
import { Draft, PayloadAction, Reducer } from '@reduxjs/toolkit'

const reducers: { [Feature in FeatureName]: Reducer<RootState[Feature]> } = {
  app: App.reducer,
  doc: Doc.reducer,
}

export default function combination (state = {} as Draft<RootState>, action: PayloadAction) {
  action.global = state

  const nextState: RootState = FeatureNames.reduce((nextStateDraft, featureName) => {
    return {
      ...nextStateDraft,
      [featureName]: reducers[featureName](state[featureName], action),
    }
  }, {} as RootState)

  action.next = nextState
  return nextState
}
//
// function getFeatureState<F extends FeatureName,
//     FeatureState = (typeof reducers)[F] extends Reducer<infer T> ?
//         WritableDraft<T> : WritableDraft<RootState>>
// (rootState: WritableDraft<RootState>, featureName: F): FeatureState {
//   if (featureName in rootState) {
//     return rootState[featureName]
//   }
//   return rootState
// }

// export type RootState = ReturnType<typeof combination>