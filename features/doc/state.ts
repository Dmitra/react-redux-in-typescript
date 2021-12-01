import { Action } from 'model'
import type { DocState, Document } from './model'

export default {
  list: [],
} as DocState

function load (state: DocState, { payload: doc }: Action<Document>) {
  state.list.push(doc)
}

export const reducers = {
  load,
}