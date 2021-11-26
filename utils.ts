import type { Reducer } from 'redux'
import { createSlice } from 'utils/createSlice'
import { ReducersBySlice, ActionCreatorsBySlice } from 'utils/createReducer'

export const createFeature = <
  T,
  Model,
  // TODO seems to be incompatible with Reducer type from redux
  Reducers extends ReducersBySlice<T>,
  Selectors,
  Utils,
>({
    name,
    model,
    initialState,
    reducers,
    selectors,
    utils,
  }: {
  name: string;
  initialState: T;
  reducers: Reducers;
  selectors: Selectors;
  model: Model,
  utils?: Utils,
}): {
  model: Model,
  actions: ActionCreatorsBySlice<T, Reducers>,
  reducer: Reducer<T>,
  select: Selectors,
  utils?: Utils
} => {
  const slice = createSlice({
    name,
    initialState,
    reducers,
  })

  return {
    model,
    actions: slice.actions,
    reducer: slice.reducer,
    select: selectors,
    utils,
  }
}