import React from 'react'
import {injectSheet, getColor} from 'core/jss/Style'
import Card from 'core/components/Card'

const Cards = ({ blogs, sheet : {classes} }) => (
    <div className={classes.cardsContainer}>
        <ul className={classes.gridList}>
            {!!blogs && blogs.map(({_id, title, description}) => (
                <li key={_id} className={classes.gridItem}>
                    <div className={classes.cardOuter}>
                        <Card _id={_id}
                            title={title}
                            description={description}/>
                    </div>
                </li>
            ))}
        </ul>
    </div>
)

const styles = {
    cardsContainer : {
        padding : 20,
    },

    '@media (min-width: 900px)' : {
        cardsContainer : {
            margin: '0 300px',
        }
    },

    gridList : {
        display : 'flex',
        flexFlow : 'row wrap',
        justifyContent : 'flex-start',
        listStyle : 'none',
        margin : 0,
        padding : 0,
    },

    gridItem : {
        flex: '0 1 50%',
        marginBottom : 20,
    },

    '@media (min-width : 900px)' : {
        gridItem : {
            flex: '0 1 33%',
        },
    },

    cardOuter : {
        margin : '0 10px',
    },
}

export default injectSheet(styles)(Cards)
