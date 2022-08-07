import type { NextApiRequest, NextApiResponse } from 'next'
import funcs from "../../api-logic/funcs"

export default (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json(funcs.getDistance(funcs.getNextDate()))
}