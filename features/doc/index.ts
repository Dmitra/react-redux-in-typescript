import { createFeature } from 'utils'
import * as model from './model'
import initialState, { reducers, extraReducers } from './state'
import * as selectors from './selectors'
import { DocState } from './model'

export default createFeature<DocState, typeof reducers>({
  name: 'doc',
  model,
  initialState,
  reducers,
  extraReducers,
  selectors,
})