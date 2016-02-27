import React from 'react'
import Markdown from 'react-markdown'

class PostContent extends React.Component {
  render() {
    let {title, body} = this.props
    return (
      <div className="post-content">
        <h3>{title}</h3>
        <hr/>
        <Markdown source={decodeURIComponent(body) || ''}/>
      </div>
    )
  }
}

export default PostContent
