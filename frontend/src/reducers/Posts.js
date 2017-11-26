import { REQUEST_POSTS, SET_POSTS, CAST_VOTE_ON_POST, DELETE_POST } from '../actions'
import {voteIncrements} from '../actions/voting'
import omit from 'lodash.omit'

const initialState = {
  list: [],
  isLoading: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case REQUEST_POSTS:
      return {
        ...state,
        isLoading: true
      }
    case SET_POSTS:
      return {
        ...state,
        isLoading: false,
        list: action.posts
      }
    case CAST_VOTE_ON_POST:
      return {
        ...state,
        list: {
          ...state.list,
          [action.id]: {
            ...state.list[action.id],
            voteScore: state.list[action.id].voteScore + voteIncrements[action.vote]
          }
        }
      }
    case DELETE_POST:
      return {
        ...state,
        list: omit(state.list, action.id)
      }
    default:
      return state
  }
}
