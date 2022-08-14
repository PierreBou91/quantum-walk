import React, { useEffect, useState } from 'react'
import styles from "../styles/Countdown.module.css"

type Props = {
	distance: number
}

const Countdown = (props: Props) => {

	const [distance, setDistance] = useState(props.distance);

	// updates the state every second
	useEffect(() => {
		const interval = setInterval(() => {
			setDistance(distance => distance - 1000);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (<h1 className={styles.clockText}><div >{Math.floor(distance / 86400000) +
		" days"}</div>
		<div>&nbsp;{Math.floor((distance % 86400000) / 36e5) +
			" hours"}</div>
		<div>&nbsp;{Math.floor((distance % 36e5) / 6e4) +
			" minutes"}</div>
		<div>&nbsp;{Math.trunc((distance % 6e4) / 1000) +
			" seconds"}</div>
	</h1 >
	)
}

export default Countdown