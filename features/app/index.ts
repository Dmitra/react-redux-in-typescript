import { createFeature } from 'utils'
import { initialState, reducers } from './state'
import { selectors } from './selectors'
import { AppModel, AppState } from './model'

const feature = createFeature<AppState, typeof reducers>({ name: 'app', model: AppModel, initialState, reducers, selectors })

export default feature

export const actions = feature.actions