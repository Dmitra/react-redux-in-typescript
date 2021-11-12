import {
  createSlice,
  Slice,
  CaseReducer,
  ActionCreatorWithOptionalPayload as BaseActionCreator,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'

// import type { RootState } from 'boot'
import type { RootState, Action, ActionCreator } from 'model'
import { Reducers } from 'features/reducers'

type Name = keyof RootState
type Actions = (typeof Reducers)[Name]

export function createFeature<N, M, S, R, Sl> ({
  name, model, initialState, reducers, selectors,
}: {
  name: N,
  model: M,
  initialState: S,
  reducers: R,
  selectors: Sl,
}) {
  let extraReducers
  // if (reducers.extraReducers) {
  //   extraReducers = reducers.extraReducers
  //   reducers = _.pickBy(reducers, _.isFunction)
  // }
  const slice = createSlice({
    name: name as unknown as string,
    initialState: initialState as unknown as RootState[N],
    reducers, // : reducers as unknown as Actions,
    // reducers: _.pickBy(reducers, _.isFunction) as unknown as Actions,
    // extraReducers: reducers?.extraReducers,
  })
  // const wrap = <T extends Array<any>, U>(fn: (...args: T) => U) => (
  //   (...args: T): U => fn(...args)
  // )
  // const actions = {} as Record<keyof typeof slice.actions, ActionCreator>
  // _.each(slice.actions, <P, M>(actionCreator: BaseActionCreator<P>, key: keyof typeof slice.actions) => {
  //   const _actionCreator = (payload: P, meta: M) => {
  //     const action = actionCreator(payload) as unknown as Action
  //     // if (!_.isNil(meta)) action.meta = meta
  //     return { ...action, meta }
  //   }
  //   _actionCreator.type = actionCreator.type
  //   actions[key] = _actionCreator
  // })
  // function wrap (reducer: Reducers) {
  //   return reducer(state: State, action: Action)
  // }

  return {
    model,
    reducer: slice.reducer,
    actions: slice.actions, // as unknown as Reducers,
    select: selectors,
    // components: model?.COMPONENTS,
  }
}

// export const useSelector: TypedUseSelectorHook<CustomRootState> = useSelectorHook