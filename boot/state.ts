import App from 'features/app'
import Doc from 'features/doc'

const reducers = {
  app: App.reducer,
  doc: Doc.reducer,
}
// TODO
export default function combination (state, action) {
  action.global = state
  const nextState = {}

  _.each(reducers, (reducer, key) => {
    nextState[key] = reducer(state[key], action)
  })

  action.next = nextState
  return nextState
}