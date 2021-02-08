import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { Vehicles } from 'components/Vehicles';
import { CompletedTask } from 'components/CompletedTask';
import { game } from 'reducers/game';
import { postScore } from "reducers/user";
import { TaskContainer, Button, VehicleContainer, TaskHeader, TaskParagraph } from 'components/StyledComponents';

export const Task3 = () => {
	const dispatch = useDispatch();

	const guestScore = useSelector((store) => store.game.guestScore);
	const question = useSelector((store) => store.game.questions[1]);
	const userId = useSelector((store) => store.user.userId);
	const accessToken = useSelector((store) => store.user.accessToken);
	const [answer, setAnswer] = useState();
	const [isCorrect, setIsCorrect] = useState(false);

	const answersArray = question.answers;
	const correctAnswersArray = question.correctAnswer;

	const vehicles = answersArray.map(({ answer }) => answer);
	const [vehicle, setVehicle] = useState(vehicles);

	const SortableVehiclesContainer = sortableContainer(({ children }) => (
		<VehicleContainer>{children}</VehicleContainer>
	));

	const SortableVehicle = sortableElement(({ vehicle }) => (
		<Vehicles key={vehicle} vehicle={vehicle} />
	));

	const onSortEnd = ({ oldIndex, newIndex }) =>
		setVehicle(arrayMove(vehicle, oldIndex, newIndex));

	const handleOnClick = (answer) => {
		const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
		console.log(equals(vehicle, correctAnswersArray));

		if (equals(vehicle, correctAnswersArray)) {
			setIsCorrect(true);
			if(accessToken){
				dispatch(postScore(userId, 1))
			  } else {
			  dispatch(game.actions.setGuestScore(guestScore + 1));
			  }
		} else {
			setIsCorrect(false);
		}
		setAnswer(vehicle);
		//Send answer to redux and/or backend
	};

	console.log(question)

	return (
		<>
			{!answer && (
				<TaskContainer>
					<div>
						<TaskHeader>{question.question}</TaskHeader>
						<TaskParagraph>Rangordna bilderna efter hur klimatsmarta de är med den mest klimatsmarta överst</TaskParagraph>
					</div>
					<VehicleContainer>
						<SortableVehiclesContainer axis="y" onSortEnd={onSortEnd}>
							{vehicle.map((item, index) => (
								<SortableVehicle key={item} vehicle={item} index={index} />
							))}
						</SortableVehiclesContainer>
					</VehicleContainer>
					<Button type="button" onClick={() => handleOnClick()}>
						Klar
					</Button>
					
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
