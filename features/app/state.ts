import { Action } from 'utils/createAction'
import * as AppSelectors from 'features/app/selectors'
import { State, AREA } from './model'

const App = { select: AppSelectors }

export const initialState: State = {
  loading: ['APP', 'DOC'],
}

export function boot (state: State, action: Action) {
  const { global } = action
  // TODO ensure right type for global
  App.select.loading(global)
  state.loading.length = 0
}

export function toggleLoading (state: State, { payload }: Action<keyof typeof AREA>) {
  const loading = state.loading
  if (_.includes(loading, payload)) state.loading = _.without(loading, payload)
  else loading.push(payload)
}