import React from 'react'
import styles from "../styles/Countdown.module.css"

type Props = {
	distance: number
}

const Countdown = (props: Props) => {
	return (<h1 className={styles.clockText}><div >{Math.floor(props.distance / 86400000) +
		" days"}</div>
		<div>&nbsp;{Math.floor((props.distance % 86400000) / 36e5) +
			" hours"}</div>
		<div>&nbsp;{Math.floor((props.distance % 36e5) / 6e4) +
			" minutes"}</div>
		<div>&nbsp;{Math.trunc((props.distance % 6e4) / 1000) +
			" seconds"}</div>
		{/* {
			Math.floor(props.distance / 86400000) +
			" days " +
			Math.floor((props.distance % 86400000) / 36e5) +
			" hours " +
			Math.floor((props.distance % 36e5) / 6e4) +
			" minutes " +
			Math.trunc((props.distance % 6e4) / 1000) +
			" seconds"
		} */}
	</h1 >
	)
}

export default Countdown