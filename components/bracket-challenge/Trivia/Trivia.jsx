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
      const targetElement = questionRefs.current[currentIndex + 1];

      // Get the Y position of the element relative to the viewport
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;

      // Scroll to that position with an offset
      window.scrollTo({
        top: elementPosition - 150, // Scroll to the element position minus 150px
        behavior: 'smooth',
      });
    }
  };

  const highlightTextInsideAsterisks = text => {
    const updatedText = text.replace(
      /\*\*(.*?)\*\*/g,
      `<span class=${styles.peach}>$1</span>`
    );
    return <div dangerouslySetInnerHTML={{ __html: updatedText }} />;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.contestName}>
        {currentContest.name} <br />
        <span>{currentContest.subBracket}</span>
      </h2>
      {questions.map((question, index) => {
        const winner = question.winner?.length ? question.winner[0] : null;
        return (
          <div
            key={index}
            className={styles.questionContainer}
            ref={e => (questionRefs.current[index] = e)}
          >
            <h2 className={styles.question}>
              {highlightTextInsideAsterisks(question.question)}
            </h2>
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
