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
      <link rel="icon" href="/icon.png" />
      <meta
        name="keywords"
        content="Natural Selection Tour Bracket Challenge, Natural Selection Tour, Natural Selection, Revelstoke, snowboarding, snowboarding contest, snowboarding competition, Travis Rice, Jackson Hole, Art of Flight"
      />
    </Head>
  );
}
