const contentful = require('contentful');

export default async function handler(req, res) {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://staging--thebracketchallenge.netlify.app/'
  ); // Replace '*' with your staging URL to restrict access
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'POST') {
    const { contentTypeId } = req.body;
    // Initialize the Contentful client
    const client = contentful.createClient({
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
      environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
    });

    let entries = null;
    try {
      const response = await client.getEntries({
        content_type: contentTypeId,
        limit: 1000,
      });

      entries = response.items.map(({ fields }) => fields);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }

    res.status(200).json({ entries });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
