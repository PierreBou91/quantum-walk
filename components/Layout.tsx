import React, { ReactNode } from 'react'
import Head from 'next/head'

import { MdOutlineNextPlan } from 'react-icons/md'
import { BsQuestionDiamond } from 'react-icons/bs'
import { AiOutlineApi, AiFillGithub } from 'react-icons/ai'

import styles from '../styles/Layout.module.css'
import TopNavItem from './TopNavItem'

type Props = {
	children: ReactNode
}

const navItems = [
	{
		title: "QuantumWalk",
		href: "/",
		target: "",
		rel: "",
		icon: <MdOutlineNextPlan />
	},
	{
		title: "About",
		href: "/about",
		target: "",
		rel: "",
		icon: <BsQuestionDiamond />
	},
	{
		title: "API(soon)",
		href: "/api-doc",
		target: "",
		rel: "",
		icon: <AiOutlineApi />
	},
	{
		title: "Github",
		href: "https://github.com/PierreBou91/quantum-walk",
		target: "_blank",
		rel: "norefferer",
		icon: <AiFillGithub />
	},
]

const Layout = (props: Props) => {
	return (
		<>
			<Head>
				<title>The Quantum Walk</title>
			</Head>
			<main>
				<nav className={`${styles.topNav} container`}>
					{navItems.map(item => <TopNavItem key={item.title} title={item.title} href={item.href} target={item.target} rel={item.rel} icon={item.icon}></TopNavItem>)}
				</nav>
				{props.children}
			</main>
		</>
	)
}

export default Layout