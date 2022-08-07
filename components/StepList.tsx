import React from 'react'
import StepListItem from './StepListItem'
import styles from "../styles/StepList.module.css"

type Props = {
	children: number[]
}

const StepList = (props: Props) => {
	return (
		<ul role="list" className={styles.stepList}>
			{props.children?.map((timestamp) => {
				return <StepListItem key={timestamp}>{timestamp}</StepListItem>
			})}
		</ul>
	)
}

export default StepList