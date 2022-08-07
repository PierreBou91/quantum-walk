import React, { ReactNode } from 'react'
import styles from '../styles/MainBody.module.css'

type Props = {
	children?: ReactNode
}

const MainBody = (props: Props) => {
	return (
		<div className={`${styles.mainBody} container`}>{props.children}</div>
	)
}

export default MainBody