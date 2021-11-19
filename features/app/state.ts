import { Action } from 'model'
import * as AppSelectors from 'features/app/selectors'
import { AppState, AppModel } from './model'

// Здесь App.select нигде не использовался, как я понял,
// поэтому не уверен, что этот объект вообще нужен.
const App = { model: AppModel, select: AppSelectors }

export const initialState: AppState = {
  loading: [AppModel.APP, AppModel.DOC],
}

function boot (state: AppState) {
  state.loading.length = 0
}

function toggleLoading (state: AppState, { payload }: Action<keyof typeof AppModel>) {
  const loading = state.loading
  if (_.includes(loading, payload)) state.loading = _.without(loading, payload)
  else loading.push(payload)
}

export const reducers = {
  boot,
  toggleLoading,
}