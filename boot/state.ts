import { Reducer } from 'redux'
import App from 'features/app'
import Doc from 'features/doc'
import { Action, RootState } from 'model'

type Reducers = Record<keyof RootState, Reducer<any>>

const reducers: Reducers = {
  app: App.reducer,
  doc: Doc.reducer,
}

export default function combination<Payload, Meta>(state: RootState, action: Action<Payload, Meta>): RootState {
  action.global = state
  const nextState = state

  _.each(reducers, (reducer, key) => {
    nextState[key as keyof Reducers] = reducer(state[key as keyof Reducers], action)
  })

  action.next = nextState

  return nextState
}