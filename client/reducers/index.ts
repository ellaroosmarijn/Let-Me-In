import { combineReducers } from 'redux'

import homeReducer from './home'
import playReducer from './play'
import resultsReducer from './results'

export default combineReducers({
  home: homeReducer,
  play: playReducer,
  results: resultsReducer,
})
