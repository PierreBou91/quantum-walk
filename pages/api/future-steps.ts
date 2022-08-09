import type { NextApiRequest, NextApiResponse } from 'next'
import { getNextSteps } from "../../api-logic/funcs"

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(getNextSteps(req.query.size))
}