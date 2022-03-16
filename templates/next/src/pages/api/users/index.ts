/* eslint-disable unicorn/prefer-type-error */
import { NextApiRequest, NextApiResponse } from 'next';
import { sampleUserData } from '../../../utils/sample-data';

const handler = (_: NextApiRequest, response: NextApiResponse): void => {
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data');
    }

    response.status(200).json(sampleUserData);
  } catch (err) {
    response
      .status(500)
      .json({ statusCode: 500, message: (err as Error).message });
  }
};

export default handler;
