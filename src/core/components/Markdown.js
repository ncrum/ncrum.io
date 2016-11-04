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

const Markdown = ({content}) => {
    return (
        <div dangerouslySetInnerHTML={{ __html : marked(content) }}></div>
    )
}

export default Markdown
