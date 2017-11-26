import {
  getAllPosts
} from '../utils/contentAPI'
import {
  REQUEST_POSTS,
  SET_POSTS,
} from './index'

export const fetchPosts = () => {
  return dispatch => {
    dispatch({
      type: REQUEST_POSTS
    })

    getAllPosts().then(
      res => {
        const posts = res.reduce( (obj, item) => {
          obj[item.id] = item
          return obj
        }, {})
        dispatch({
          type: SET_POSTS,
          posts: posts
        })
      }
    )

  }
}
