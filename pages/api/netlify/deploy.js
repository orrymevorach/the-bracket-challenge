export default async function handler(req, res) {
  const { secret } = req.query;
  if (secret !== process.env.DEPLOY_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await fetch(process.env.NETLIFY_BUILD_HOOK, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Netlify responded with status: ${response.status}`);
    }

    return res.status(200).json({ message: 'Deploy triggered successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
