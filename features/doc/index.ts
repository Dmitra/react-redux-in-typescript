import { createFeature } from 'utils'
import * as model from './model'
import initialState, * as reducers from './state'
import * as selectors from './selectors'

export default createFeature({
  name: 'doc', model, initialState, reducers, selectors,
})