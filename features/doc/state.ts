import { Action } from 'model'
import type { DocState, Document } from './model'

export default {
  list: [],
} as DocState

export function load (state: DocState, { payload: doc }: Action<Document>) {
  state.list.push(doc)
}