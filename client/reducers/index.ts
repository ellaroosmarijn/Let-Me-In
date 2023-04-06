import { combineReducers } from 'redux'

import homeReducer from './home'
import playReducer from './play'
import uploadReducer from './uploads'
import resultsReducer from './results'

export default combineReducers({
  home: homeReducer,
  play: playReducer,
  uploads: uploadReducer,
  results: resultsReducer,
})
