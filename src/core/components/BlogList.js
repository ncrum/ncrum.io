import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchPostsIfNeeded} from '../actions'

class BlogList extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.posts) {
      const { dispatch } = this.props
      dispatch(fetchPostsIfNeeded())
    }
  }

  render() {
    return (
      <section className="blog-list-container">
        <ul className="list">
          {
            this.props.posts.map((post) => {
              return (
                <li className="item" key={post._id}>
                  <Link to={`/blog/${post.title.addDashes()}`} activeClassName="active">
                    {post.title}
                  </Link>
                </li>
              )
            })
          }
        </ul>
        <section className="post-container">
          {this.props.children}
        </section>
      </section>
    )
  }
}

BlogList.propTypes = {
  posts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

BlogList.fetchData = function(args) {
  const {store} = args
  return store.dispatch(fetchPostsIfNeeded())
}

// now we connect the component to the Redux store:
var mapStateToProps = function(state){
  // This component will have access to `state.blog.posts` through `this.props.posts`
  return {
    posts:  state.blog.posts || [],
    isFetching: (state.blog.posts) ? state.blog.isFetching : true,
    lastUpdated: state.blog.lastUpdated
  }
}

export default connect(mapStateToProps)(BlogList)
