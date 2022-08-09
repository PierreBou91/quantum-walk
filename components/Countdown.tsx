import React from 'react'

type Props = {
	distance: number
}

const Countdown = (props: Props) => {
	return (<h1>
		{
			Math.floor(props.distance / 86400000) +
			" days " +
			Math.floor((props.distance % 86400000) / 36e5) +
			" hours " +
			Math.floor((props.distance % 36e5) / 6e4) +
			" minutes " +
			Math.trunc((props.distance % 6e4) / 1000) +
			" seconds"
		}
	</h1 >
	)
}

export default Countdown