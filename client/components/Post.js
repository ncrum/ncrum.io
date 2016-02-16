import React from 'react';
import {connect} from 'react-redux';
import {fetchPostIfNeeded} from '../actions';
import PostContent from './PostContent';

class Post extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, params } = this.props
    dispatch(fetchPostIfNeeded(params.title.removeDashes()))
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.post) {
      const { dispatch, params } = nextProps
      dispatch(fetchPostIfNeeded(params.title.removeDashes()))
    }
  }

  render() {

    return (
      <div>
        <PostContent {...this.props.post}/>
      </div>
    );
  }
}

// now we connect the component to the Redux store:
var mapStateToProps = function(state){
  const {blog} = state;
  const {currentPost} = blog;

  if (blog[currentPost]) {
    return {...blog[currentPost]}
  } else {
    return {
      post: {},
      isFetching: true,
    }
  }
};

export default connect(mapStateToProps)(Post);
