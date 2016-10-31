import React from 'react'
import {Match, Link} from 'react-router'
import {connect} from 'react-redux'
import isEqual from 'lodash/isEqual'
import {injectSheet} from 'core/jss/Style'
import {getRoutes} from 'core/actions/routerActions'
import {withLocation} from 'core/reducers/routerReducer'

const MatchWithSubRoutes = (route) => (
  <Match {...route} render={(props) => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)

const styles = {
    navList: {
        display: 'block',
        'text-align': 'center',
        width: '100%',
        margin: 0,
        padding: 0
    },
    navListItem: {
        display: 'inline-block',
        padding: '10px 10px'
    },
    navListItemLink: {
        'font-size': 18,
        color: '#ff4533',
        'text-decoration': 'none',
        '&:hover' : {
            color: '#67a0ff'
        }
    }
}

class App extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {getRoutes} = this.props
        getRoutes()
    }

    componentWillReceiveProps(nextProps) {
        const {getRoutes} = nextProps
        const after = nextProps.location
        const before = this.props.location

        if (before.pathname !== after.pathname
            || before.search != after.search) {
            getRoutes()
        }
    }

    render() {
        const {routes, sheet : {classes} } = this.props

        return (
            <div>
                <ul className={classes.navList}>
                    <li className={classes.navListItem}>
                        <Link to="/" className={classes.navListItemLink}>About</Link>
                    </li>
                    <li className={classes.navListItem}>
                        <Link to="/blog/1" className={classes.navListItemLink}>Blog</Link>
                    </li>
                    <li className={classes.navListItem}>
                        <Link to="https://github.com/ncrum" className={classes.navListItemLink}>Github</Link>
                    </li>
                </ul>

                {routes && routes.map((route, i) => (
                    <MatchWithSubRoutes key={i} {...route}/>
                ))}
            </div>
        )
    }
}
export default injectSheet(styles)(
    withLocation(
        connect(({router}) => router.schema, {getRoutes})(App)
    )

)
