import { useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUserBrackets, getUser } from '@/lib/airtable';
import useGetApi from '@/hooks/useGetApi';
import Cookies from 'js-cookie';

export default function useGetCurrentUserBracket() {
  const uid = Cookies.get('uid');
  const user = useGetApi(() => getUser({ uid }));
  const router = useRouter();
  const [isCurrentUsersBracket, setIsCurrentUsersBracket] = useState(false);
  const bracketId = router.query.bracketId;
  getCurrentUserBrackets({ id: user.id }).then(currentUsersBrackets => {
    const currentUsersBracket = currentUsersBrackets.find(
      bracket => bracket.id === bracketId
    );
    setIsCurrentUsersBracket(!!currentUsersBracket);
  });

  return isCurrentUsersBracket;
}
