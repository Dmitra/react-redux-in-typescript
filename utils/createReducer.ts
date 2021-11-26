import type { Draft } from 'immer'
import createNextState, { isDraft, isDraftable } from 'immer'
import type { AnyAction, Action as BaseAction, Reducer } from 'redux'

import type { Actions, Action, ActionCreatorForCaseReducer } from './createAction'

export type DraftReducer<_State = any, _Action extends BaseAction = AnyAction> = (
  state: Draft<_State>,
  action: _Action
) => _State | void | Draft<_State>

export type DraftReducers<_State, _Actions extends Actions> = {
  [T in keyof _Actions]: _Actions[T] extends BaseAction ? DraftReducer<_State, _Actions[T]> : void
}

export type ReducersBySlice<_State> = {
  [SliceName: string]: DraftReducer<_State, Action<any, any>>
}
// setup relationship between ActionCreator and Reducer
export type ActionCreatorsBySlice<_State, _ReducersBySlice extends ReducersBySlice<_State>> = {
  [SliceName in keyof _ReducersBySlice]: ActionCreatorForCaseReducer<_State, _ReducersBySlice[SliceName]>
}

export function createReducer<
  _State, _CaseReducers extends DraftReducers<_State, any> = DraftReducers<_State, any>
  >
(initialState: _State, actionsMap: _CaseReducers): Reducer<_State> {
  const frozenInitialState = createNextState(initialState, () => {})

  return function (state = frozenInitialState, action): _State {
    const caseReducers = [actionsMap[action.type]]

    return caseReducers.reduce((previousState, caseReducer): _State => {
      if (caseReducer) {
        if (isDraft(previousState)) {
          const draft = previousState as Draft<_State>
          const result = caseReducer(draft, action)

          if (typeof result === 'undefined') return previousState
          return result as _State
        }
        if (!isDraftable(previousState)) {
          const result = caseReducer(previousState as any, action)

          if (typeof result === 'undefined') {
            if (previousState === null) return previousState
            throw Error('A case reducer on a non-draftable value must not return undefined')
          }

          return result as _State
        }
        // @ts-ignore createNextState() produces an Immutable<Draft<S>> rather
        // than an Immutable<S>, and TypeScript cannot find out how to reconcile these two types.
        return createNextState(previousState, (draft: Draft<_State>) => caseReducer(draft, action))
      }

      return previousState
    }, state)
  }
}