import { fork, take, put } from 'redux-saga/effects'

import App from 'features/app'
import Doc from 'features/doc'

export function* onLoad () {
  while (true) {
    const { global } = yield take(Doc.actions.load.type)
    const loading = App.select.loading(global)
    if (_.includes(loading, 'app')) yield put(App.actions.toggleLoading('DOC'))
  }
}

export default [
  fork(onLoad),
]