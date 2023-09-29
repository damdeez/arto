// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: string
}

const statuses = [
  'sleeping',
  'sniffing',
  'exploring',
  'outside'
];

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const randomNumber = randomIntFromInterval(0, statuses.length);
  return res.status(200).json({ status: statuses[randomNumber] });
}
