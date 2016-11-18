import React from 'react'
import {injectSheet, getColor} from 'core/jss/Style'

function leftPad (str, len, ch) {
  // convert `str` to `string`
  str = str + '';
  // `len` is the `pad`'s length now
  len = len - str.length;
  // doesn't need to pad
  if (len <= 0) return str;
  // `ch` defaults to `' '`
  if (!ch && ch !== 0) ch = ' ';
  // convert `ch` to `string`
  ch = ch + '';
  // cache common use cases
  if (ch === ' ' && len < 10) return cache[len] + str;
  // `pad` starts with an empty string
  var pad = '';
  // loop
  while (true) {
    // add `ch` to `pad` if `len` is odd
    if (len & 1) pad += ch;
    // divide `len` by 2, ditch the remainder
    len >>= 1;
    // "double" the `ch` so this operation count grows logarithmically on `len`
    // each time `ch` is "doubled", the `len` would need to be "doubled" too
    // similar to finding a value in binary search tree, hence O(log(n))
    if (len) ch += ch;
    // `len` is 0, exit the loop
    else break;
  }
  // pad `str`!
  return pad + str;
}

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
