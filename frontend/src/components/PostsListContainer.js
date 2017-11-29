import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PostsList from './PostsList'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/posts'
import { setSortBy } from '../actions/sortBy'
import { genComparer } from '../utils'
import {castVoteOnPost} from '../actions/voting'
import {beginPostEdit, deletePost} from '../actions/activePost'
import { push } from 'react-router-redux'


class PostsListContainer extends Component {
  static propTypes = {
    // Both of these are injected by connect
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    sortBy: PropTypes.string.isRequired,
    setSortBy: PropTypes.func.isRequired,
    categoryFilter: PropTypes.string,
    castVoteOnPost: PropTypes.func.isRequired,
    beginPostEdit: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.fetchPosts();
  }

  render(){
    const {posts, sortBy, setSortBy, categoryFilter} = this.props
    const comparer = genComparer(sortBy)
    const filteredPosts = categoryFilter ? posts.filter(p => p.category===categoryFilter) : posts

    const sortOptions = [
      {value: 'voteScore', display: 'Votes'},
      {value: 'timestamp', display: 'Time'},
      {value: 'author', display: 'Author'}
    ]

    return (
      <div>
        <h2>Posts</h2>
        Sort by
        <select
          name="sorter"
          id="sorter"
          value={sortBy}
          onChange={ e => setSortBy(e.target.value) }
          >
          {sortOptions.map( opt => (
            <option key={opt.value} value={opt.value} >
              {opt.display}
            </option>
          ) )}
        </select>
        <PostsList
          posts={filteredPosts.sort(comparer)}
          castVoteOnPost={this.props.castVoteOnPost}
          beginPostEdit={(id)=>{
            this.props.changePage(`/post/${id}`)
            this.props.beginPostEdit()
          }}
          deletePost={this.props.deletePost}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: Object.values(state.posts.list),
  sortBy: state.sortBy
})

const mapDispatchToProps = {
  fetchPosts: fetchPosts,
  setSortBy: setSortBy,
  castVoteOnPost:castVoteOnPost,
  beginPostEdit:beginPostEdit,
  changePage: (url) => push(url),
  deletePost: deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsListContainer)
