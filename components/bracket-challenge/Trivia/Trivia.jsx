import { useMatchups } from '@/context/matchup-context/matchup-context';
import styles from './Trivia.module.scss';
import RadioButton from './RadioButton/RadioButton';

export default function Trivia() {
  const { currentContest } = useMatchups();
  const questions = currentContest.questions;
  const isDisabled =
    currentContest.enableSelections === 'True' &&
    currentContest.lockBrackets === 'True';

  return (
    <div className={styles.container}>
      {questions.map((question, index) => {
        const winner = question.winner?.length ? question.winner[0] : null;
        return (
          <div key={index} className={styles.questionContainer}>
            <h2 className={styles.question}>{question.question}</h2>
            <form className={styles.radioButtonForm}>
              {question.options.map(optionData => {
                return (
                  <RadioButton
                    {...optionData}
                    key={optionData.name}
                    question={question}
                    isChecked={optionData.name === question.selectedWinner}
                    isCorrect={winner === optionData.name}
                    isIncorrect={winner ? winner !== optionData.name : null}
                    isDisabled={winner || isDisabled}
                  />
                );
              })}
            </form>
          </div>
        );
      })}
    </div>
  );
}
