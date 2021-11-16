import { AppState, AREA } from './model'
import { PayloadAction } from '@reduxjs/toolkit'

export const initialState: AppState = {
  loading: ['APP', 'DOC'],
}

export function boot (state: AppState, action: PayloadAction) {
  state.loading.length = 0
}

export function toggleLoading (state: AppState, { payload }: PayloadAction<keyof typeof AREA>) {
  const loading = state.loading
  if (_.includes(loading, payload)) state.loading = _.without(loading, payload)
  else loading.push(payload)
}