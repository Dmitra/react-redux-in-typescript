import { PayloadAction } from 'utils/createAction'
import type { State, Document } from './model'

export const initialState: State = {
  list: [],
}

export function load (state: State, { payload: doc }: PayloadAction<Document>) {
  state.list.push(doc)
}