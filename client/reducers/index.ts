import { combineReducers } from 'redux'

import homeReducer from './home'
import playReducer from './play'

export default combineReducers({
  home: homeReducer,
  play: playReducer,
})
