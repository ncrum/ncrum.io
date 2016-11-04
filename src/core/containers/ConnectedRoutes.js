import React from 'react'
import {Match} from 'react-router'
import {connect} from 'react-redux'
import isEqual from 'lodash/isEqual'
import {fetchRoutes} from 'core/actions/routerActions'
import {withLocation} from 'core/reducers/routerReducer'

const MatchWithSubRoutes = (route) => (
  <Match {...route} render={(props) => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)

class Routes extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {fetchRoutes} = this.props
        fetchRoutes()
    }

    componentWillReceiveProps(nextProps) {
        const {fetchRoutes} = nextProps
        const after = nextProps.location
        const before = this.props.location

        if (before.pathname !== after.pathname
            || before.search !== after.search) {
            fetchRoutes()
        }
    }

    render() {
        const {routes} = this.props

        return <div>
            {routes && routes.map((route, i) => (
                <MatchWithSubRoutes key={i} {...route}/>
            ))}
        </div>
    }
}

export default connect(null, {fetchRoutes})(withLocation(Routes))
