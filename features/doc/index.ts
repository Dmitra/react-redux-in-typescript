import { createFeature } from 'utils'
import * as state from './state'
import * as selectors from './selectors'

const { initialState, ...reducers } = state

export default createFeature({
  name: 'doc', initialState, reducers: { ...reducers }, selectors,
})