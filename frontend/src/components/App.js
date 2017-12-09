
import React, {Component} from 'react';
import {withRouter} from 'react-router'
import { Route, Switch, Link } from 'react-router-dom'
import HomeView from './HomeView'
import CategoryView from './CategoryView'
import ActivePostView from './ActivePostView'
import NewPostView from './NewPostView'
import NoMatch from './NoMatch'

import { fetchCategories } from '../actions/categories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class App extends Component {

  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
  }

  componentWillMount(){
    this.props.fetchCategories()
  }

  render(){
    return (
      <div>
        <header>
          <Link to="/">Home </Link>
          <Link to="/newpost">New Post</Link>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/newpost" component={NewPostView} />
            <Route exact path="/:categoryPath" component={CategoryView} />
            <Route exact path="/:categoryPath/:postId" component={ActivePostView} />
            <Route component={NoMatch}/>
          </Switch>
        </main>
      </div>
    )
  }
}

const mapDispatchToProps = {
  fetchCategories: fetchCategories,
}

export default withRouter(connect(null, mapDispatchToProps)(App))
