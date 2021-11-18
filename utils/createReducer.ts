import type { Draft } from 'immer'
import createNextState, { isDraft, isDraftable } from 'immer'
import type { AnyAction, Action, Reducer } from 'redux'

import type { Actions, PayloadAction, ActionCreatorForCaseReducer } from './createAction'

export type CaseReducer<S = any, A extends Action = AnyAction> = (
  state: Draft<S>,
  action: A
) => S | void | Draft<S>

export type CaseReducers<S, _Actions extends Actions> = {
  [T in keyof _Actions]: _Actions[T] extends Action ? CaseReducer<S, _Actions[T]> : void
}

export type ReducersBySlice<State> = {
  [Name: string]: | CaseReducer<State, PayloadAction<any>>
}
// setup relationship between ActionCreator and Reducer
export type ActionCreatorsBySlice<_ReducersBySlice extends ReducersBySlice<any>> = {
  [Type in keyof _ReducersBySlice]: ActionCreatorForCaseReducer<_ReducersBySlice[Type]>
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
        }
        if (!isDraftable(previousState)) {
          const result = caseReducer(previousState as any, action)

          if (typeof result === 'undefined') {
            if (previousState === null) return previousState
            throw Error('A case reducer on a non-draftable value must not return undefined')
          }

          return result as S
        }
        // @ts-ignore createNextState() produces an Immutable<Draft<S>> rather
        // than an Immutable<S>, and TypeScript cannot find out how to reconcile these two types.
        return createNextState(previousState, (draft: Draft<S>) => caseReducer(draft, action))
      }

      return previousState
    }, state)
  }
}