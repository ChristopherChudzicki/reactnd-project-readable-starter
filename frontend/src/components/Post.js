import React from 'react'
import PropTypes from 'prop-types'
import VotingBooth from './VotingBooth'
import {connect} from 'react-redux'
import {castVoteOnPost} from '../actions/voting'
import dateFormat from 'dateformat'

const Post = (props) => {
  const {
    post,
    castVoteOnPost
  } = props

  return (
    <div>
      <h1>{post.title}</h1>
      <h3>By {post.author}</h3>
      <h4>on {dateFormat(post.timestamp)}</h4>
      <p>{post.body}</p>
      <VotingBooth
        votes={post.voteScore}
        upAction={() => castVoteOnPost(post.id, 'upVote')}
        downAction={() => castVoteOnPost(post.id, 'downVote')}
      />
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  castVoteOnPost: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  castVoteOnPost:castVoteOnPost
}

export default connect(null, mapDispatchToProps)(Post)
