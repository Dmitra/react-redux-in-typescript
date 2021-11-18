import type { Action } from 'redux'

import type { IfMaybeUndefined, IfVoid, IsAny, IsUnknown } from './tsHelpers'

export type Actions<T extends keyof any = string> = Record<T, Action>

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
  <PT>(payload: PT): PayloadAction<PT, T>
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

export type ActionCreatorForCaseReducer<CR> = CR extends (
    state: any,
    action: infer A
  ) => any
  ? A extends { payload: infer P }
    ? PayloadActionCreator<P>
    : ActionCreatorWithoutPayload
  : ActionCreatorWithoutPayload

export function createAction (type: string): any {
  function actionCreator (...args: any[]) {
    return { type, payload: args[0] }
  }

  actionCreator.toString = () => `${type}`
  actionCreator.type = type
  actionCreator.match = (action: Action<unknown>): action is PayloadAction => action.type === type

  return actionCreator
}