import { Action } from 'model'
import * as selectors from 'features/app/selectors'
import { AppState, AREA } from './model'

// Здесь App.select нигде не использовался, как я понял,
// поэтому не уверен, что этот объект вообще нужен.
const App = { model: AREA, select: selectors }

// Здесь не совсем корректно делать тайпкаст. Лучше объявить
// переменную с типом AppState и потом отдельно ее экспортировать
export default {
  loading: [AREA.APP, AREA.DOC],
} as AppState

function boot (state: AppState) {
  state.loading.length = 0
}

function toggleLoading (state: AppState, { payload }: Action<keyof typeof AREA>) {
  const loading = state.loading
  if (_.includes(loading, payload)) state.loading = _.without(loading, payload)
  else loading.push(payload)
}

export const reducers = {
  boot,
  toggleLoading,
}