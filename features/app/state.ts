import { Action } from 'utils/createAction'
import { State, AREA } from './model'

export const initialState: State = {
  loading: ['APP', 'DOC'],
}

export function boot (state: State, action: Action) {
  state.loading.length = 0
}

export function toggleLoading (state: State, { payload }: Action<keyof typeof AREA>) {
  const loading = state.loading
  if (_.includes(loading, payload)) state.loading = _.without(loading, payload)
  else loading.push(payload)
}