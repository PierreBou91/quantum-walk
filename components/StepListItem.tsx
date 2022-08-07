import React from 'react'
import styles from "../styles/StepListItem.module.css"

type Props = {
	children: number
}

const StepListItem = (props: Props) => {
	//convert timestamp to date
	const date = new Date(props.children)
	const dateString = date.toLocaleDateString()
	const timeString = date.toLocaleTimeString()

	return (
		<li className={styles.stepList}>{dateString} {timeString}</li>
	)
}

export default StepListItem