import { Action } from 'utils/createAction'
import type { State, Document } from './model'

export const initialState: State = {
  list: [],
}

export function load (state: State, action: Action<Document, boolean>) {
  const { payload: doc, meta: waitForApp } = action
  if (!waitForApp) state.list.push(doc)
}

export const extraReducers = {
  'app/load': (state: State, action: Action) => {
    state.list = []
  },
}