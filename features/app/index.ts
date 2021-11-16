import { createFeature } from 'utils'
import * as model from './model'
import * as state from './state'
import * as selectors from './selectors'

const { initialState, ...reducers } = state

const feature = createFeature({ name: 'app', model, initialState, reducers: { ...reducers }, selectors })

export default feature

export const actions = feature.actions