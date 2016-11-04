import React from 'react'
import {injectSheet} from 'core/jss/Style'
import {withBlogs} from 'core/reducers/blogReducer'
import PageHeader from 'core/components/PageHeader'
import Markdown from 'core/components/Markdown'

class Blog extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {fetchBlogs} = this.props
        fetchBlogs()
    }

    componentWillReceiveProps(nextProps) {
        const {fetchBlogs} = this.props
        if (!nextProps.blogs && !nextProps.isFetching ) {
            fetchBlogs()
        }
    }

    render () {
        const {blogs, currentBlog, sheet : {classes}} = this.props

        if (!currentBlog) {
            return (<div></div>)
        }

        return (
            <div>
                <PageHeader title={currentBlog.title}
                        description={currentBlog.description}/>
                <div className={classes.container}>
                    <div className={classes.blogContainer}>
                        <div className={classes.blogBody}>
                            <Markdown content={currentBlog.body}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    container : {
        marginTop : '30px',
        padding : '0 15px',
    },

    '@media (min-width : 900px)' : {
        container : {
            marginLeft : 300,
            marginRight : 300,
        },
    },

    blogContainer : {
        padding : '0 15px',
    },
}

export default injectSheet(styles)(withBlogs(Blog))
