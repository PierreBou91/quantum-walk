import React from 'react'
import styles from '../styles/Card.module.css'

type Props = {
	children: React.ReactNode
}

const Card = (props: Props) => {
	return (
		<div className={styles.card}>{props.children}</div>
	)
}

export default Card