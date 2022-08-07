const { createHash } = require('crypto')

const STARTDATE = new Date(2022, 1, 9, 14, 0, 0).getTime()
const MAX_INTERVAL = 172800000

const hashDate = (date) => {
	return createHash('sha256').update(date.toString()).digest('hex');
}

const hashToInterval = (hash) => {
	return parseInt(hash,16) % MAX_INTERVAL;
}

const getNextStep = (date) => {
	const dateHash = hashDate(date);
	const interval = hashToInterval(dateHash)
	return new Date(date + interval).getTime()
}

const getPastSteps = () => {
	const now = new Date().getTime()
	let obsDate = STARTDATE
	let dates = [STARTDATE]
	while (obsDate < now) {
		const newDate = getNextStep(obsDate)
		dates.push(newDate)
		obsDate = newDate
	}
	return {dates: dates}
}

const getNextDate = () => {
	return {nextDate: getPastSteps().dates.pop()}
}

const getNextSteps = (listSize) => {
	const next = getNextDate()
	let obsDate = next
	let dates = [next]
	for (let i = 0; i < listSize; i++) {
		const newDate = getNextStep(obsDate)
		dates.push(newDate)
		obsDate = newDate
	}
	return dates
}

const getDistance = (date) => {
	const now = new Date().getTime();
	return {distance: date.nextDate - now};
}

exports.getNextDate = getNextDate;
exports.getPastSteps = getPastSteps;
exports.getNextSteps = getNextSteps;
exports.getDistance = getDistance;
