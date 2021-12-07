import { createFeature } from 'utils'
import * as model from './model'
import initialState, { reducers } from './state'
import * as selectors from './selectors'
import type { AppState } from './model'

const feature = createFeature<AppState, typeof reducers>({
  name: 'app',
  model: model.AREA,
  initialState,
  reducers,
  selectors,
})

export default feature

export const actions = feature.actions