import React from 'react'
import {withTimer} from 'core/reducers/timerReducer'
import Clock from 'core/components/Clock'

class Timer extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.interval = setInterval(this.forceUpdate.bind(this), this.props.updateInterval || 33)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const {timer : {start, stop}, startTimer, stopTimer, resetTimer} = this.props

        return (
            <Clock time={start ? (stop || Date.now()) - start : 0} start={startTimer} stop={!stop && stopTimer} reset={resetTimer}/>
        )
    }
}

export default withTimer(Timer)
