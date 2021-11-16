import {
  createSlice,
  ValidateSliceCaseReducers,
  SliceCaseReducers, Reducer,
} from '@reduxjs/toolkit'
import { CaseReducerActions } from '@reduxjs/toolkit/src/createSlice'

export const createFeature = <
    T,
    Reducers extends SliceCaseReducers<T>,
    Selectors
    >({
    name,
    initialState,
    reducers,
    selectors,
  }: {
  name: string;
  initialState: T;
  reducers: ValidateSliceCaseReducers<T, Reducers>;
  selectors: Selectors;
}): { actions: CaseReducerActions<Reducers>, reducer: Reducer<T>, select: Selectors } => {
  const slice = createSlice({
    name,
    initialState,
    reducers,
  })

  return {
    actions: slice.actions,
    reducer: slice.reducer,
    select: selectors,
  }
}