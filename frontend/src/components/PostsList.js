import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'
import VotingBooth from './VotingBooth'

const PostsList = (props) => {
  const {posts, castVoteOnPost} = props

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/${post.category}/${post.id}`}>
            {post.title}
          </Link><br/>
          Category: {post.category}<br/>
          Author: {post.author} <br/>
          Comments: {post.commentCount} <br/>
          Time: {dateFormat(post.timestamp)}
          <VotingBooth
            votes={post.voteScore}
            upAction={() => castVoteOnPost(post.id, 'upVote')}
            downAction={() => castVoteOnPost(post.id, 'downVote')}
          />
          <button onClick={()=>props.beginPostEdit(post.id)}>
            Edit Post
          </button>
          <button onClick={()=>props.deletePost(post.id)}>
            Delete Post
          </button>
        </li>
      ))}
    </ul>
  )
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  castVoteOnPost: PropTypes.func.isRequired,
  beginPostEdit: PropTypes.func.isRequired
}

export default PostsList
