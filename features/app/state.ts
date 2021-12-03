import { Action } from 'model'
import * as AppModel from 'features/app/model'
import * as AppSelectors from 'features/app/selectors'
import { AppState } from './model'

const App = { model: AppModel, select: AppSelectors }

export default {
  loading: [App.model.AREA.APP, App.model.AREA.DOC],
} as AppState

export function boot (state: AppState, action: Action) {
  const { global } = action
  // TODO ensure right type for global
  App.select.loading(global)
  state.loading.length = 0
}

export function toggleLoading (state: AppState, action: Action<keyof typeof App.model.AREA, boolean>) {
  const { meta, payload } = action
  if (meta) return

  const loading = state.loading
  if (_.includes(loading, payload)) state.loading = _.without(loading, payload)
  else loading.push(payload)
}