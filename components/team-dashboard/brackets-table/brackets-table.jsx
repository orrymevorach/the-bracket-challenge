import styles from './brackets-table.module.scss';
import { useEffect, useState } from 'react';
import { getBracket, getLeague } from '@/lib/airtable';
import { useWinners } from '@/context/winners-context/winners-context';
import {
  orderSnowboardersByRound,
  countWinners,
  getRanking,
} from './bracket-ranking-utils';

export default function BracketsTable({ brackets = [], name: userName }) {
  const [bracketData, setBracketData] = useState([]);
  const winnersData = useWinners();
  const winners = orderSnowboardersByRound({ snowboarders: winnersData });

  // Set number of correct picks and rank
  useEffect(() => {
    const getBracketData = async () => {
      const bracketData = await Promise.all(
        brackets.map(async ({ id, leagueName, name }) => {
          const bracket = await getBracket({ recId: id });
          const leagueData = await getLeague({ name: leagueName });
          const numberOfCorrectPicks = countWinners({
            bracketData: bracket,
            winners,
          });
          const ranking = getRanking({
            leagueData,
            winners,
            bracketName: name,
          });
          return {
            id,
            leagueName,
            name,
            numberOfCorrectPicks,
            ranking,
          };
        })
      );

      setBracketData(bracketData);
    };
    if (brackets.length && bracketData.length === 0 && winners) {
      getBracketData();
    }
  }, [brackets, bracketData, winners, userName]);

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th></th> {/* Making room for league number */}
            <th>League Name</th>
            <th>Team Name</th>
            <th>Correct Picks</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {bracketData.map(bracket => {
            return (
              <tr key={bracket.name}>
                <td>1.</td>
                <td>{bracket.leagueName}</td>
                <td>{bracket.name}</td>
                <td>
                  {bracket.numberOfCorrectPicks
                    ? `${bracket.numberOfCorrectPicks}/${winners.length}`
                    : 'Loading...'}
                </td>
                <td>{bracket.ranking}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
