import { fork, take, put } from 'redux-saga/effects'
import { batchActions } from 'redux-batched-actions'

import App from 'features/app'
import Doc from 'features/doc'

export function* onBoot () {
  while (true) {
    yield take(App.actions.boot.type)
    const batch = []
    batch.push(App.actions.toggleLoading('app'))
    batch.push(Doc.actions.load({ id: 'foo' }))

    yield put(batchActions(batch))
  }
}

export default [
  fork(onBoot),
]