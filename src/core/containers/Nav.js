import React from 'react'
import {Link} from 'react-router'
import {injectSheet, getColor} from 'core/jss/Style'

const Nav = ({ sheet : { classes }}) => (
    <ul className={classes.navList}>
        <li className={classes.navListItem}>
            <Link to="/" className={classes.navListItemLink}>About</Link>
        </li>
        <li className={classes.navListItem}>
            <Link to="/blogs" className={classes.navListItemLink}>Blogs</Link>
        </li>
        <li className={classes.navListItem}>
            <a href="https://github.com/ncrum" className={classes.navListItemLink}>Github</Link>
        </li>
    </ul>
)

const styles = {
    navList: {
        display: 'block',
        'text-align': 'center',
        width: '100%',
        margin: 0,
        padding: 0,
        backgroundColor : getColor('primary'),
    },
    navListItem: {
        display: 'inline-block',
        padding: '10px 20px',
    },
    navListItemLink: {
        fontSize: 21,
        color: getColor('white'),
        textDecoration: 'none',
        '&:hover' : {
            color: getColor('hover'),
        },
    }
}

export default injectSheet(styles)(Nav)
