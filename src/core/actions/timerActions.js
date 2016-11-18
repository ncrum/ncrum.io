export const TimerActionTypes = {
    TIMER_START : 'TIMER_START',
    TIMER_STOP : 'TIMER_STOP',
    TIMER_RESET : 'TIMER_RESET',
}

export function startTimer() {
    return {
        type : TimerActionTypes.TIMER_START,
        now : Date.now()
    }
}

export function stopTimer() {
    return {
        type : TimerActionTypes.TIMER_STOP,
        now : Date.now()
    }
}

export function resetTimer() {
    return {
        type : TimerActionTypes.TIMER_RESET,
        now : Date.now()
    }
}
