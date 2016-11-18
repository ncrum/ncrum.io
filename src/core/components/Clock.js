import React from 'react'
import {injectSheet, getColor} from 'core/jss/Style'
import leftPad from 'core/util/leftPad'

const Clock = ({time, start, stop, reset, sheet : {classes}}) => (
    <div className={classes.clockContainer}>
        <div className={classes.timeKeeper}>
            {`${leftPad(Math.trunc(time/60000), 2, '0')}:${leftPad(Math.trunc(time/1000%60), 2, '0')}:${leftPad(time%1000, 3, '0')}`}
        </div>
        <button className={classes.button}
            onClick={start}>Start</button>
        <button className={classes.button}
            onClick={stop}>Stop</button>
        <button className={classes.button}
            onClick={reset}>Reset</button>
    </div>
)

const styles = {
    clockContainer : {
        textAlign : 'center'
    },

    timeKeeper : {
        display : 'block',
        fontSize : 36,
        textAlign : 'center',
        color : getColor('primary'),
        padding : '20px',
        fontFamily: '"Courier New", Courier, monospace',
    },

    button : {
        display : 'inline',
        padding : '10px 20px',
        marginLeft : 10,
        fontSize : 16,
        backgroundColor : getColor('white'),
        border : `1px solid ${getColor('border')}`,
        color : getColor('primary')
    }
}

export default injectSheet(styles)(Clock)
