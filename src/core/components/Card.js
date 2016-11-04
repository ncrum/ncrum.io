import React from 'react'
import {Link} from 'react-router'
import {injectSheet, getColor} from 'core/jss/Style'

const Card = ({ id, title, description, sheet : {classes} }) => (
    <div className={classes.card}>
        <div className={classes.cardTitle}>
            {title}
        </div>
        <div className={classes.cardDetails}>
            <div className={classes.cardImageContainer}>
                <img src={`https://facebook.github.io/react/img/logo.svg`}
                    className={classes.cardImage}/>
            </div>
            <div className={classes.cardDescription}>
                <p className={classes.cardDescriptionText}>
                    {description}
                </p>
            </div>
        </div>
        <Link to={`/blog/${id}`}
            className={classes.linkOverlay}/>
    </div>
)

const styles = {
    card : {
        position : 'relative',
        display : 'flex',
        flexDirection : 'column',
        border : `1px solid ${getColor('border')}`,
        borderRadius : 4,
        overflow : 'hidden',
    },

    cardTitle : {
        fontSize : 24,
        textAlign : 'center',
        backgroundColor : getColor('primary'),
        color : getColor('white'),
        paddingTop : 10,
        paddingBottom : 10,
    },

    cardDetails : {
        borderTop : `1px solid ${getColor('border')}`,
        display : 'flex',
        flexFlow : 'row nowrap',
        justifyContent : 'space-between',
        alignItems : 'stretch',
        padding : 10,
    },

    cardImageContainer : {
        flex : '1 0 0',
    },

    cardImage : {
        maxWidth : '100%',
    },

    cardDescription : {
        flex : '2 0 0',
        textAlign : 'center',
    },

    cardDescriptionText : {
        textAlign : 'left',
        display : 'inline-block',
        margin : '0 10px',
    },

    linkOverlay : {
        position: 'absolute',
        content: `''`,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
}

export default injectSheet(styles)(Card)
