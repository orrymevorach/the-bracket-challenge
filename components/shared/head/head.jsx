import Head from 'next/head';
import { imgPath } from 'utils/constants';

export default function Meta({ title = '' }) {
  const tabTitle = `The Bracket Challenge ${title ? `| ${title}` : ''}`;
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="description" content="The Bracket Challenge" />
      <title>{tabTitle}</title>
      <link rel="icon" href="/icon.png" />
      <meta
        name="keywords"
        content="The Bracket Challenge, Action sports, action sports fantasy, fantasy sports, Natural Selection Tour Bracket Challenge, Natural Selection Tour, Natural Selection, Revelstoke, snowboarding, snowboarding contest, snowboarding competition, Travis Rice, Jackson Hole, Art of Flight"
      />
    </Head>
  );
}
