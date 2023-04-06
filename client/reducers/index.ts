import { combineReducers } from 'redux'

import homeReducer from './home'
import playReducer from './play'
import createReducer from './create'
import uploadReducer from './uploads'
import resultsReducer from './results'

export default combineReducers({
  home: homeReducer,
  play: playReducer,
  create: createReducer,
  uploads: uploadReducer,
  results: resultsReducer,
})
