import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TaskContainer } from "components/StyledComponents";
import { CompletedTask } from "components/CompletedTask";
import { game } from "reducers/game";

export const Task1 = () => {
  const dispatch = useDispatch();
  const question = useSelector((store) => store.game.questions[0]);
  const score = useSelector((store) => store.game.userScore);
  const [answer, setAnswer] = useState();
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOnClick = (answer) => {
    if (answer === question.correctAnswer[0]) {
      setIsCorrect(true);
      dispatch(game.actions.setUserScore(score + 1));
    } else {
      setIsCorrect(false);
    }
    setAnswer(answer);
    //Send answer to redux and/or backend
  };

  return (
    <>
      {" "}
      {!answer && (
        <TaskContainer>
          <h1>{question.question}</h1>
          <p>{question.description}</p>
          {question.answers.map((answer) => {
            return (
              <button key={answer.id} onClick={() => handleOnClick(answer.id)}>
                {answer.answer}
              </button>
            );
          })}
        </TaskContainer>
      )}
      {answer && (
        <CompletedTask
          isCorrect={isCorrect}
          answer={answer}
          setAnswer={setAnswer}
          why={question.why}
        />
      )}
    </>
  );
};
