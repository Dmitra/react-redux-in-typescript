import { all } from 'redux-saga/effects'

import App from 'features/app/effects'
import Doc from 'features/doc/effects'

export default function* sagas () {
  yield all([
    ...App,
    ...Doc,
  ])
}