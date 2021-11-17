import type { Draft } from 'immer'
import createNextState, { isDraft, isDraftable } from 'immer'
import type { AnyAction, Action, Reducer } from 'redux'
import type { IfMaybeUndefined, IfVoid, IsAny, IsUnknown } from './tsHelpers'

export type Actions<T extends keyof any = string> = Record<T, Action>

export type NoInfer<T> = [T][T extends any ? 0 : never]

export type CaseReducer<S = any, A extends Action = AnyAction> = (
  state: Draft<S>,
  action: A
) => S | void | Draft<S>

export type CaseReducers<S, AS extends Actions> = {
  [T in keyof AS]: AS[T] extends Action ? CaseReducer<S, AS[T]> : void
}

export type PayloadAction<
  P = void,
  T extends string = string,
  M = never,
  E = never
  > = {
  payload: P
  type: T
} & ([M] extends [never]
  ? {}
  : {
    meta: M
  }) &
  ([E] extends [never]
    ? {}
    : {
      error: E
    })

export type SliceCaseReducers<State> = {
  [K: string]: | CaseReducer<State, PayloadAction<any>>
}

interface BaseActionCreator<P, T extends string, M = never, E = never> {
  type: T
  match: (action: Action<unknown>) => action is PayloadAction<P, T, M, E>
}

export interface ActionCreatorWithPayload<P, T extends string = string>
  extends BaseActionCreator<P, T> {
  (payload: P): PayloadAction<P, T>
}

export interface ActionCreatorWithOptionalPayload<P, T extends string = string>
  extends BaseActionCreator<P, T> {
  (payload?: P): PayloadAction<P, T>
}

export interface ActionCreatorWithNonInferrablePayload<
  T extends string = string
  > extends BaseActionCreator<unknown, T> {
    <PT extends unknown>(payload: PT): PayloadAction<PT, T>
}

export interface ActionCreatorWithoutPayload<T extends string = string>
  extends BaseActionCreator<undefined, T> {
  (): PayloadAction<undefined, T>
}

export type PayloadActionCreator<
  P = void,
  T extends string = string,
  > = IsAny<
    P,
    ActionCreatorWithPayload<any, T>,
    IsUnknown<
      P,
      ActionCreatorWithNonInferrablePayload<T>,
      // else
      IfVoid<
        P,
        ActionCreatorWithoutPayload<T>,
        // else
        IfMaybeUndefined<P, ActionCreatorWithOptionalPayload<P, T>, ActionCreatorWithPayload<P, T>>
        >
      >
    >

type ActionCreatorForCaseReducer<CR> = CR extends (
    state: any,
    action: infer Action
  ) => any
  ? Action extends { payload: infer P }
    ? PayloadActionCreator<P>
    : ActionCreatorWithoutPayload
  : ActionCreatorWithoutPayload

export type CaseReducerActions<CaseReducers extends SliceCaseReducers<any>> = {
  [Type in keyof CaseReducers]: ActionCreatorForCaseReducer<CaseReducers[Type]>
}

export interface Slice<
  State = any,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string
  > {
  name: Name
  reducer: Reducer<State>
  actions: CaseReducerActions<CaseReducers>
}

export interface CreateSliceOptions<
  State = any,
  CR extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string
  > {
  name: Name
  initialState: State
  reducers: SliceCaseReducers<State>
  extraReducers?: | CaseReducers<NoInfer<State>, any>
}

function getType (slice: string, actionKey: string): string {
  return `${slice}/${actionKey}`
}

export function createReducer<S, CR extends CaseReducers<S, any> = CaseReducers<S, any>>
(initialState: S, actionsMap: CR): Reducer<S> {
  const frozenInitialState = createNextState(initialState, () => {})

  return function (state = frozenInitialState, action): S {
    const caseReducers = [actionsMap[action.type]]

    return caseReducers.reduce((previousState, caseReducer): S => {
      if (caseReducer) {
        if (isDraft(previousState)) {
          const draft = previousState as Draft<S>
          const result = caseReducer(draft, action)

          if (typeof result === 'undefined') return previousState
          return result as S
        } else if (!isDraftable(previousState)) {
          const result = caseReducer(previousState as any, action)

          if (typeof result === 'undefined') {
            if (previousState === null) return previousState
            throw Error('A case reducer on a non-draftable value must not return undefined')
          }

          return result as S
        } else {
          // @ts-ignore createNextState() produces an Immutable<Draft<S>> rather
          // than an Immutable<S>, and TypeScript cannot find out how to reconcile these two types.
          return createNextState(previousState, (draft: Draft<S>) => caseReducer(draft, action))
        }
      }

      return previousState
    }, state)
  }
}

export function createAction (type: string): any {
  function actionCreator (...args: any[]) {
    return { type, payload: args[0] }
  }

  actionCreator.toString = () => `${type}`
  actionCreator.type = type
  actionCreator.match = (action: Action<unknown>): action is PayloadAction => action.type === type

  return actionCreator
}

export function createSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
  > (options: CreateSliceOptions<State, CaseReducers, Name>): Slice<State, CaseReducers, Name> {
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