import { useMatchups } from '@/context/matchup-context/matchup-context';
import styles from './Trivia.module.scss';
import RadioButton from './RadioButton/RadioButton';
import { useRef } from 'react';

export default function Trivia() {
  const { currentContest } = useMatchups();
  const questions = currentContest.questions;
  const isDisabled =
    currentContest.enableSelections === 'True' &&
    currentContest.lockBrackets === 'True';

  // Create refs for each question
  const questionRefs = useRef([]);

  // Function to scroll to the next question
  const scrollToNextQuestion = currentIndex => {
    if (currentIndex < questionRefs.current.length - 1) {
      questionRefs.current[currentIndex + 1]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className={styles.container}>
      {questions.map((question, index) => {
        const winner = question.winner?.length ? question.winner[0] : null;
        return (
          <div
            key={index}
            className={styles.questionContainer}
            ref={e => (questionRefs.current[index] = e)}
          >
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
                    handleClick={() => scrollToNextQuestion(index)}
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
