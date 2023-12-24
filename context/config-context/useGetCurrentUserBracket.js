import { useState } from 'react';
import useUser from '../user-context/useUser';
import { useRouter } from 'next/router';
import { getCurrentUserBrackets } from '@/lib/airtable';

export default function useGetCurrentUserBracket() {
  const user = useUser();
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
