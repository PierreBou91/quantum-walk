import type { NextApiRequest, NextApiResponse } from 'next'
import funcs from "../../api-logic/funcs"

export default (req: NextApiRequest, res: NextApiResponse) => {
	console.log("past-steps fetched")
	res.status(200).json(funcs.getPastSteps())
}