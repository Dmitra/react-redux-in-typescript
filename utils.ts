import type { Reducer } from 'redux'
import { createSlice } from 'utils/createSlice'
import { ReducersBySlice, ActionCreatorsBySlice, DraftReducers } from 'utils/createReducer'

export const createFeature = <
  T,
  Model,
  // TODO seems to be incompatible with Reducer type from redux
  Reducers extends ReducersBySlice<T>,
  EReducers extends DraftReducers<T, any>,
  Selectors,
  Utils,
>({
    name,
    model,
    initialState,
    reducers,
    extraReducers,
    selectors,
    utils,
  }: {
  name: string;
  initialState: T;
  reducers: Reducers;
  extraReducers?: EReducers,
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
    extraReducers,
  })

  return {
    model,
    actions: slice.actions as ActionCreatorsBySlice<T, Reducers>,
    reducer: slice.reducer,
    select: selectors,
    utils,
  }
}