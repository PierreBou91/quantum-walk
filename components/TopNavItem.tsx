import Link from 'next/link'
import React, { ReactNode } from 'react'
import styles from '../styles/TopNavItem.module.css'

type Props = {
	title: string
	href: string
	target: string
	rel: string
	icon: ReactNode
}

const TopNavItem = (props: Props) => {
	return (
		<div className={styles.topNavItem}>
			<>
				{props.icon}
				<Link key={props.title} href={props.href}>
					<a target={props.target} rel={props.rel} >
						{props.title}
					</a>
				</Link>
			</>
		</div>
	)
}

export default TopNavItem