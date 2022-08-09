import React from 'react'
import StepListItem from './StepListItem'
import styles from "../styles/StepList.module.css"

type Props = {
	children: number[]
	label?: string
}

const StepList = (props: Props) => {
	return (
		<>
			<h2>{props.label}</h2>
			<ul role="list" className={styles.stepList}>
				{props.children?.map((timestamp) => {
					return <StepListItem key={timestamp}>{timestamp}</StepListItem>
				})}
			</ul>
		</>
	)
}

export default StepList