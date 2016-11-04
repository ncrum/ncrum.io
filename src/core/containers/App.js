import React from 'react'
import {injectSheet} from 'core/jss/Style'
import {withRoutes} from 'core/reducers/routerReducer'
import Nav from 'core/containers/Nav'
import ConnectedRoutes from 'core/containers/ConnectedRoutes'

const App = ({ routes, sheet : {classes} }) => (
    <div className={classes.root}>
        <Nav/>
        
        <ConnectedRoutes routes={routes}/>
    </div>
)

const globalStyles = {
    '@font-face': {
        fontFamily: 'Futura Book',
        src: 'url(/fonts/futura_book.ttf)',
    },

    root : {
        fontFamily: 'Futura Book',
        margin : '-8px'
    },
}

export default injectSheet(globalStyles)(withRoutes(App))
