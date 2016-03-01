import React from 'react'
import marked from 'marked'
import highlight from 'highlight.js'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return highlight.highlightAuto(code).value
  }
})

class PostContent extends React.Component {
  render() {
    let {title, body} = Object.assign({}, { body : '', title: ''}, this.props)

    let markdown = {
      __html : marked(decodeURIComponent(body))
    }

    return (
      <div className="post-content">
        <h2 className="post-title">{title}</h2>
        <hr/>
        <div className="post-body markdown-body" dangerouslySetInnerHTML={markdown}></div>
      </div>
    )
  }
}

export default PostContent
