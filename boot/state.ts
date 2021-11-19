import App from 'features/app'
import Doc from 'features/doc'
import { Action, RootState } from 'model'

const reducers = {
  app: App.reducer,
  doc: Doc.reducer,
}

export default function combination<Payload, Meta>(state: RootState, action: Action<Payload, Meta>): RootState {
  action.global = state
  const nextState = state

  _.each(reducers, (reducer, key) => {
    // Можем заигнорить следующую линию, потому что в _.each переменная key всегда будет string
    // и привести к правильным типам будет сложно. Но здесь мы уверены, что ключи существуют
    // и соответствуют своим значениям, потому что вот же мы их перебираем в этом же цикле.
    // @ts-ignore next-line
    nextState[key] = reducer(state[key], action)
  })

  action.next = nextState
  return nextState
}