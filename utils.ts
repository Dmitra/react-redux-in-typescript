import { createSlice } from '@reduxjs/toolkit'

// TODO
export function createFeature ({ name, model, initialState, reducers, selectors }) {
  const slice = createSlice({
    name,
    initialState,
    reducers: _.pickBy(reducers, _.isFunction),
    extraReducers: reducers?.extraReducers,
  })

  const actions = {}
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
    reducer: slice.reducer,
    actions,
    select: selectors,
    components: model?.COMPONENTS,
  }
}