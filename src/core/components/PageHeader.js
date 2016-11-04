import React from 'react'
import {injectSheet, getColor} from 'core/jss/Style'

const PageHeader = ({ title, description, sheet : {classes} }) => (
    <div className={classes.headerBackground}>
        <div className={classes.header}>
            <h2 className={classes.headerTitle}>{title}</h2>
            <p className={classes.headerDescription}>
                {description}
            </p>
        </div>
    </div>
)

const styles = {
    headerBackground : {
        backgroundColor : getColor('header'),
    },

    header : {
        display : 'flex',
        flexDirection : 'column',
        padding : 20,
    },

    '@media (min-width: 900px)' : {
        header : {
            margin: '0 300px',
        }
    },

    headerTitle : {
        fontSize : 40,
        margin : 0,
        paddingBottom : 20,
        borderBottom : `2px solid ${getColor('primary')}`,
    },

    headerDescription : {
        paddingTop : 20,
        margin : 0,
    },
}

export default injectSheet(styles)(PageHeader)
