import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider, TypedUseSelectorHook,
  useDispatch as useDispatchReact,
  useSelector as useSelectorReact } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { RootState } from 'model'
import App from 'features/app'
import AppComponent from '../features/app/components/app'
import reducer from './state'
import effects from './effects'

const sagaMiddleware = createSagaMiddleware()
const middleware = [
  ...getDefaultMiddleware({ thunk: false }),
  sagaMiddleware,
]

export const store = configureStore({
  // TODO
  reducer,
  middleware,
  devTools: true,
})

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <AppComponent/>
    </Provider>,
    document.getElementById('root-container'),
  )
})

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorReact
export const useDispatch = () => useDispatchReact<typeof store.dispatch>()

sagaMiddleware.run(effects)
store.dispatch(App.actions.boot())