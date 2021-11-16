import { PayloadAction } from '@reduxjs/toolkit'
import type { DocState, Document } from './model'

export const initialState: DocState = {
  list: [],
}

export function load (state: DocState, { payload: doc }: PayloadAction<Document>) {
  state.list.push(doc)
}