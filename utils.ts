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

import {
  createSlice,
  SliceCaseReducers,
  CreateSliceOptions,
  CaseReducerActions,
  Reducer,
} from '@reduxjs/toolkit'
import { Action, ActionCreator, RootState } from 'model'

type CreateFeatureParams<
  State,
  Reducers extends SliceCaseReducers<State>,
  Model extends Record<string, unknown> = Record<string, unknown>
> = CreateSliceOptions<State, Reducers> & {
  model?: Model
  selectors: Record<string, (state: RootState) => any>
}

type FeatureActions<State, Reducers extends SliceCaseReducers<State>> = {
  [key in keyof CaseReducerActions<Reducers>]: CaseReducerActions<Reducers>[key] extends (
    ...args: any[]
  ) => any
    ? ActionCreator<ReturnType<CaseReducerActions<Reducers>[key]>['payload']>
    : never
}

export function createFeature<
  State,
  Reducers extends SliceCaseReducers<State>,
  Model extends Record<string, unknown> = Record<string, unknown>
> ({
  name = '',
  model,
  initialState,
  reducers,
  selectors,
  extraReducers,
}: CreateFeatureParams<State, Reducers, Model>): {
  model?: Model
  actions: FeatureActions<State, Reducers>
  reducer: Reducer<State>
  select: Record<string, (state: RootState) => any>
  components: unknown
} {
  const slice = createSlice<State, Reducers, string>({
    name,
    initialState,
    reducers,
    extraReducers,
  })

  const actions = {} as FeatureActions<State, Reducers>

  _.each(slice.actions, (actionCreator, key) => {
    if (_.isFunction(actionCreator)) {
      const newActionCreator: ActionCreator<
        ReturnType<typeof actionCreator>['payload']
      > = (payload, meta) => {
        const action: Action<typeof payload, typeof meta> = actionCreator(payload)
        if (!_.isNil(meta)) action.meta = meta

        return { ...action, meta }
      }

      newActionCreator.type = actionCreator.type
      // Тут бессмысленная ошибка тайпскрипта.
      // Он почему-то не понимает что мы внутри этого цикла и правильный
      // ключ всегда будет в наличии
      // @ts-ignore next-line
      actions[key as keyof CaseReducerActions<Reducers>] = newActionCreator
    }
  })

  return {
    model,
    actions,
    reducer: slice.reducer,
    select: selectors,
    components: model?.COMPONENTS,
  }
}