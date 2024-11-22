import { useRouter } from 'next/router';
import { getUser } from '@/lib/airtable';
import useGetApi from '@/hooks/useGetApi';
import Cookies from 'js-cookie';

export default function useGetCurrentUserBracket() {
  const uid = Cookies.get('uid');
  const { data: user } = useGetApi(() => getUser({ uid }));
  const router = useRouter();
  const bracketId = router.query.bracketId;
  const isCurrentUsersBracket = user?.brackets.includes(bracketId);

  return isCurrentUsersBracket;
}
