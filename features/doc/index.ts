import { createFeature } from 'utils'
import * as model from './model'
import * as state from './state'
import * as selectors from './selectors'

const { initialState, ...reducers } = state

export default createFeature({
  name: 'doc', model, initialState, reducers: { ...reducers }, selectors,
})