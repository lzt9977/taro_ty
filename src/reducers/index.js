import { combineReducers } from 'redux'
import common from './common'
import circle from './circle'
import login from './login'
import home from './home'
import share from './share'
import user from './user'
import list from './list'

export default combineReducers({
  common,
  circle,
  login,
  home,
  share,
  user,
  list
})
