import {
  createSlice,
  ValidateSliceCaseReducers,
  SliceCaseReducers, Reducer,
} from '@reduxjs/toolkit'
import { CaseReducerActions } from '@reduxjs/toolkit/src/createSlice'

export const createFeature = <
    T,
    Reducers extends SliceCaseReducers<T>,
    Selectors,
    Model,
    >({
    name,
    initialState,
    reducers,
    selectors,
    model,
  }: {
  name: string;
  initialState: T;
  reducers: ValidateSliceCaseReducers<T, Reducers>;
  selectors: Selectors;
  model: Model,
}): { actions: CaseReducerActions<Reducers>, reducer: Reducer<T>, select: Selectors, model: Model } => {
  const slice = createSlice({
    name,
    initialState,
    reducers,
  })

  return {
    actions: slice.actions,
    reducer: slice.reducer,
    select: selectors,
    model,
  }
}