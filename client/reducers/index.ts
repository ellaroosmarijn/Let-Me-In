import { combineReducers } from 'redux'

import homeReducer from './home'
import playReducer from './play'
import createReducer from './create'

export default combineReducers({
  home: homeReducer,
  play: playReducer,
  create: createReducer,
})
