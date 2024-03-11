import { getUserWithLeagueData, getWinners } from '@/lib/airtable';

export default async function handler(req, res) {
  const { uid } = req.body;

  const user = await getUserWithLeagueData({ uid });

  const winnersData = await getWinners();

  res.status(200).json({ user, winnersData });
}
