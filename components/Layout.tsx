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
		href: "/"
	},
	{ text: "About Quantum Walk ?", href: "/about" },
	{ text: "API", href: "/api-doc" },
	{ text: "Source", href: "https://github.com/PierreBou91/quantum-walk" },

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
					{navItems.map(item => <Link key={item.text} href={item.href}><a className={`${pathname == item.href ? styles.currentPage : undefined} ${styles.mainNavItems}`}>{item.text}</a></Link>)}
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