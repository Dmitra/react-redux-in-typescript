import { createFeature } from 'utils'
import * as state from './state'
import * as selectors from './selectors'

const { initialState, ...reducers } = state

const feature = createFeature({ name: 'app', initialState, reducers: { ...reducers }, selectors })

export default feature

export const actions = feature.actions