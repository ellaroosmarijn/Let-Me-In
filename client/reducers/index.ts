import { combineReducers } from 'redux'

import createReducer from './create'
import homeReducer from './home'
import playReducer from './play'

export default combineReducers({
  home: homeReducer,
  play: playReducer,
  create: createReducer,
})
