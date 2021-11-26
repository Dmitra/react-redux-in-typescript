import { PayloadAction } from 'utils/createAction'
import type { State, Document } from './model'

export const initialState: State = {
  list: [],
}

export function load (state: State, action: PayloadAction<Document, boolean>) {
  const { payload: doc, meta: waitForApp } = action
  if (!waitForApp) state.list.push(doc)
}