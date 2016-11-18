import {connect} from 'react-redux'
import {TimerActionTypes, startTimer, stopTimer, resetTimer} from 'core/actions/timerActions'

export default function timer(state = {
    start : null,
    stop : null
}, action) {
    switch(action.type) {
        case TimerActionTypes.TIMER_START:
        return {
            ...state,
            start : action.now,
            stop : null
        }
        case TimerActionTypes.TIMER_STOP:
        return {
            ...state,
            stop : action.now
        }
        case TimerActionTypes.TIMER_RESET:
        return {
            ...state,
            start : state.start ? action.now : null,
            stop : state.stop ? action.now : null,
        }
        default:
        return state
    }
}

export function withTimer(component) {
    return connect(({timer}) => ({timer}), {startTimer, stopTimer, resetTimer})(component)
}
