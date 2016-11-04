import {create as createJss} from 'jss'
import {create as createInjectSheet} from 'react-jss'
import preset from 'jss-preset-default'
import color from 'color'

export const jss = createJss(preset())
export const injectSheet = createInjectSheet(jss)

const colors = {
    primary : color('#2aa3d3'),
    header : color('#eeeeee'),
    hover : color('#dbdbdb'),
    border : color('#dfdfdf'),
    active : color('#2aa3d3').darken(0.7),
    white : color('#f2f2f2'),
}

export function getColor(key) {
    return colors[key].hexString()
}
