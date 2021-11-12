import { createFeature } from 'utils'
import * as model from './model'
import initialState, * as reducers from './state'
import * as selectors from './selectors'

const feature = createFeature({ name: 'app', model, initialState, reducers, selectors })

export default feature

export const actions = feature.actions