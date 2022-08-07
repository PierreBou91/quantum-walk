import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import styles from '../styles/Layout.module.css'
import MainBody from './MainBody'

type Props = {
	children: ReactNode
}

const navItems = [
	{
		text: "Time until next step",
		href: "/",
		target: "",
		rel: "",
	},
	{
		text: "About Quantum Walk ?",
		href: "/about",
		target: "",
		rel: "",
	},
	{
		text: "API",
		href: "/api-doc",
		target: "",
		rel: "",
	},
	{
		text: "Source",
		href: "https://github.com/PierreBou91/quantum-walk",
		target: "_blank",
		rel: "norefferer",
	},
]

const Layout = (props: Props) => {
	const { pathname } = useRouter()
	return (
		<>
			<Head>
				<title>The Quantum Walk</title>
			</Head>
			<main>
				<header className={styles.mainHeader}>
					<div className={`${styles.quantumWalk} container`}>The Quantum Walk</div>
				</header>
				<nav className={`${styles.mainNav} container`}>
					{navItems.map(item =>
						<Link key={item.text} href={item.href}>
							<a className={`${pathname == item.href ? styles.currentPage : undefined} ${styles.mainNavItems}`}
								target={item.target}
								rel={item.rel} >
								{item.text}
							</a>
						</Link>)}
				</nav>
				<MainBody>
					{props.children}
				</MainBody>
			</main>
			<footer>
			</footer>
		</>
	)
}

export default Layout