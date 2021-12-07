import { Action } from 'model'
import * as AppSelectors from 'features/app/selectors'
import * as AppModel from 'features/app/model'
import type { AppState } from './model'

const App = { model: AppModel, select: AppSelectors }

// Здесь не совсем корректно делать тайпкаст. Лучше объявить
// переменную с типом AppState и потом отдельно ее экспортировать
export default {
  loading: [App.model.AREA.APP, App.model.AREA.DOC],
} as AppState

function boot (state: AppState) {
  state.loading.length = 0
}

export function toggleLoading (
  state: AppState,
  action: Action<keyof typeof App.model.AREA, boolean>,
) {
  const { meta, payload } = action
  if (meta) return
  const loading = state.loading
  if (_.includes(loading, payload)) state.loading = _.without(loading, payload)
  else loading.push(payload)
}

export const reducers = {
  boot,
  toggleLoading,
}