import type { Reducer } from 'redux'

import { NoInfer } from './tsHelpers'
import { createAction } from './createAction'
import type { ReducersBySlice, ActionCreatorsBySlice, CaseReducers, CaseReducer } from './createReducer'
import { createReducer } from './createReducer'

export interface Slice<
  State = any,
  _ReducersBySlice extends ReducersBySlice<State> = ReducersBySlice<State>,
  Name extends string = string
  > {
  name: Name
  reducer: Reducer<State>
  actions: ActionCreatorsBySlice<_ReducersBySlice>
}

function getType (slice: string, actionKey: string): string {
  return `${slice}/${actionKey}`
}

export interface SliceOptions<
  State = any,
  CR extends ReducersBySlice<State> = ReducersBySlice<State>,
  Name extends string = string
  > {
  name: Name
  initialState: State
  reducers: ReducersBySlice<State>
  extraReducers?: | CaseReducers<NoInfer<State>, any>
}

export function createSlice<
  State,
  _ReducersBySlice extends ReducersBySlice<State>,
  Name extends string = string
  > (options: SliceOptions<State, _ReducersBySlice, Name>): Slice<State, _ReducersBySlice, Name> {
  const { name, initialState } = options
  if (!name) throw new Error('`name` is a required option for createSlice')

  const reducers = options.reducers || {}
  const extraReducers = options.extraReducers || {}

  const reducerNames = Object.keys(reducers)

  const sliceCaseReducersByType: Record<string, CaseReducer> = {}
  const actionCreators: Record<string, Function> = {}

  reducerNames.forEach(reducerName => {
    const caseReducer: CaseReducer<State, any> = reducers[reducerName]
    const type = getType(name, reducerName)

    sliceCaseReducersByType[type] = caseReducer
    actionCreators[reducerName] = createAction(type)
  })

  const finalCaseReducers = { ...extraReducers, ...sliceCaseReducersByType }
  const reducer = createReducer(initialState, finalCaseReducers as any)

  return {
    name,
    reducer,
    actions: actionCreators as any,
  }
}