// import { createSlice } from '@reduxjs/toolkit'

// export function createFeature<State, Reducers>({ name, initialState, reducers, selectors }) {
//   const slice = createSlice<State, >({
//     name,
//     initialState,
//     reducers: _.pickBy(reducers, _.isFunction),
//     extraReducers: reducers?.extraReducers,
//   })

//   const actions = {}
//   _.each(slice.actions, (actionCreator, key) => {
//     const newActionCreator = (payload, meta) => {
//       const action = actionCreator(payload)
//       if (!_.isNil(meta)) action.meta = meta
//       return { ...action, meta }
//     }
//     newActionCreator.type = actionCreator.type
//     actions[key] = newActionCreator
//   })

//   return {
//     model,
//     reducer: slice.reducer,
//     actions,
//     select: selectors,
//     components: model?.COMPONENTS,
//   }
// }

import { createSlice, ValidateSliceCaseReducers, SliceCaseReducers } from '@reduxjs/toolkit'
import { ActionCreator, RootState } from 'model'

interface CreateFeatureParams<State, Reducers extends SliceCaseReducers<State>, Model extends {} = {}> {
  name?: string,
  model?: Model,
  initialState: State,
  reducers: ValidateSliceCaseReducers<State, Reducers>,
  selectors: Record<string, (state: RootState) => any>,
}

export function createFeature<State, Reducers extends SliceCaseReducers<State>>({
  name = '',
  model,
  initialState,
  reducers,
  selectors,
}: CreateFeatureParams<State, Reducers>) {
  const slice = createSlice<State, Reducers, string>({
    name,
    initialState,
    reducers,
    extraReducers: reducers?.extraReducers,
  })

  const actions = slice.actions
  _.each(slice.actions, (actionCreator, key) => {
    const newActionCreator = (payload, meta) => {
      const action = actionCreator(payload)
      if (!_.isNil(meta)) action.meta = meta
      return { ...action, meta }
    }
    newActionCreator.type = actionCreator.type
    actions[key] = newActionCreator
  })

  return {
    model,
    actions,
    reducer: slice.reducer,
    select: selectors,
    components: model?.COMPONENTS,
  }
}
