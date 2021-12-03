import { Action } from 'model'
import * as AppModel from 'features/app/model'
import type { DocState, Document } from './model'

const App = { model: AppModel }

export default {
  list: [],
} as DocState

export function load (state: DocState, { payload: doc }: Action<Document>) {
  state.list.push(doc)
}

export const extraReducers = {
  'app/toggleLoading': (state: DocState, action: Action<keyof typeof App.model.AREA, boolean>) => {
  }
}