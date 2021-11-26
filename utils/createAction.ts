import type { Action as BaseAction } from 'redux'

import type { IfMaybeUndefined, IfVoid, IsAny, IsUnknown } from './tsHelpers'

export type PayloadAction<
  _Payload = void,
  _Meta = void,
  _Type extends string = string,
  _State = void,
  > = {
  payload: _Payload
  meta: _Meta
  type: _Type
  global: _State,
  next: _State,
}

export type Actions<_Type extends keyof any = string> = Record<_Type, BaseAction>

interface BaseActionCreator<_Payload, _Type extends string, _Meta = never, _Error = never> {
  type: _Type
  match: (action: BaseAction<unknown>) => action is PayloadAction<_Payload, _Meta, _Type, _Error>
}

export interface ActionCreatorWithPayload<_Payload, _Type extends string = string, _Meta = void>
  extends BaseActionCreator<_Payload, _Type> {
  (payload: _Payload): PayloadAction<_Payload, _Meta, _Type>
}

export interface ActionCreatorWithOptionalPayload<
  _Payload,
  _Type extends string = string,
  _Meta = void
  >
  extends BaseActionCreator<_Payload, _Type> {
  (payload?: _Payload): PayloadAction<_Payload, _Meta, _Type>
}

export interface ActionCreatorWithNonInferrablePayload<
  _Type extends string = string,
  _Meta = void
  > extends BaseActionCreator<unknown, _Type> {
  <_Payload>(payload: _Payload): PayloadAction<_Payload, _Meta, _Type>
}

export interface ActionCreatorWithoutPayload<_Type extends string = string, _Meta = void>
  extends BaseActionCreator<undefined, _Type> {
  (): PayloadAction<undefined, _Meta, _Type>
}

export type PayloadActionCreator<
  _Payload = void,
  _Type extends string = string,
  > = IsAny<
  _Payload,
  ActionCreatorWithPayload<any, _Type>,
  IsUnknown<
    _Payload,
    ActionCreatorWithNonInferrablePayload<_Type>,
    // else
    IfVoid<
      _Payload,
      ActionCreatorWithoutPayload<_Type>,
      // else
      IfMaybeUndefined<
        _Payload,
        ActionCreatorWithOptionalPayload<_Payload, _Type>,
        ActionCreatorWithPayload<_Payload, _Type>
        >
      >
    >
  >

export type ActionCreatorForCaseReducer<_State, _CaseReducer> = _CaseReducer extends (
    state: _State,
    action: infer _Action
  ) => any
  ? _Action extends { payload: infer _Payload }
    ? PayloadActionCreator<_Payload>
    : ActionCreatorWithoutPayload
  : ActionCreatorWithoutPayload

export function createAction (type: string): any {
  function actionCreator (...args: any[]) {
    return { type, payload: args[0] }
  }

  actionCreator.toString = () => `${type}`
  actionCreator.type = type
  actionCreator.match = (action: BaseAction<unknown>): action is PayloadAction => (
    action.type === type
  )

  return actionCreator
}