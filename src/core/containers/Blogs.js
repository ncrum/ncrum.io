import React from 'react'
import {injectSheet, getColor} from 'core/jss/Style'
import {withBlogs} from 'core/reducers/blogReducer'
import PageHeader from 'core/components/PageHeader'
import Cards from 'core/components/Cards'

class Blogs extends React.Component {
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

    render() {
        const {blogs} = this.props

        return (
            <div>
                <PageHeader title={`Blogs`}
                    description={`Here are some blogs I've written covering a variety of topics.`}/>
                <Cards blogs={blogs}/>
            </div>
        )
    }
}

export default withBlogs(Blogs)
