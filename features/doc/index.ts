import { createFeature } from 'utils'
// тут, кажется не тот импорт? Какая должна быть модель?
import * as model from './model'
import initialState, { reducers } from './state'
import * as selectors from './selectors'
import { DocState } from './model'

export default createFeature<DocState, typeof reducers>({
  name: 'doc', model, initialState, reducers, selectors,
})