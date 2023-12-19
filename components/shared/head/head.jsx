import Head from 'next/head';
import { imgPath } from 'utils/constants';

export default function Meta({ title = '' }) {
  const tabTitle = `NST Bracket Challenge ${title ? `| ${title}` : ''}`;
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="Natural Selection Tour - 2024 Bracket Challenge"
      />
      <title>{tabTitle}</title>
      <link rel="icon" href={`${imgPath}/favicon.png`} />
      <meta
        name="keywords"
        // content="Highlands Music Festival, music festival, festival, Bancroft, Ontario, Toronto, Palmer Rapids, summer camp, 2023, 2024"
      />
    </Head>
  );
}
