import type { Reducer } from 'redux'
import { createSlice, SliceCaseReducers, CaseReducerActions } from 'utils/createSlice'

export const createFeature = <
  T,
  Model,
  Reducers extends SliceCaseReducers<T>,
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
  actions: CaseReducerActions<Reducers>,
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