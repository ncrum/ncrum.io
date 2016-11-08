import React from 'react'
import {injectSheet} from 'core/jss/Style'
import {withRoutes} from 'core/reducers/routerReducer'
import Nav from 'core/containers/Nav'
import ConnectedRoutes from 'core/containers/ConnectedRoutes'

const App = ({ routes}) => (
    <div>
        <Nav/>

        <ConnectedRoutes routes={routes}/>
    </div>
)

const globalStyles = {
    '@font-face': {
        fontFamily: 'Futura Book',
        src: 'url(/fonts/futura_book.ttf)',
    },

    body : {
        fontFamily: 'Cambria, Georgia, san-serif'
    },

    h1 : {
        fontFamily: 'Futura Book'
    },

    h2 : {
        fontFamily: 'Futura Book'
    },

    h3 : {
        fontFamily: 'Futura Book'
    },

    h4 : {
        fontFamily: 'Futura Book'
    },

    h5 : {
        fontFamily: 'Futura Book'
    },
}

export default injectSheet(globalStyles, {named:false})(withRoutes(App))
