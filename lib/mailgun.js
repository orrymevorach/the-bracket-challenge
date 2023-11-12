export const inviteMember = async ({ email, admin, leagueId }) => {
  const res = await fetch('/api/email/invite-member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, admin, leagueId }),
  }).then(res => res.json());
};
