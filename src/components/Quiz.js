import { useContext, useEffect } from 'react';
import Question from './Question';
import { QuizContext } from '../contexts/quiz';

const Quiz = () => {
	const [quizState, dispatch] = useContext(QuizContext);
	const apiUrl = 'https://opentdb.com/api.php?amount=10&encode=url3986';

	useEffect(() => {
		if (quizState.questions.length > 0 || quizState.error) {
			return;
		}
		fetch(apiUrl)
			.then((res) => res.json())
			.then((data) => {
				// eslint-disable-next-line
				dispatch({ type: 'LOADED_QUESTIONS', payload: data.results });
			})
			.catch((err) => dispatch({ type: 'SERVER_ERROR', payload: err.message }));
	});

	return (
		<div className="quiz">
			{quizState.error && (
				<div className="results">
					<div className="congratulations">Server error</div>
					<div className="results-info">
						<div>{quizState.error}</div>
					</div>
				</div>
			)}
			{quizState.showResults && (
				<div className="results">
					<div className="congratulations">Congratulations!</div>
					<div className="results-info">
						<div>You have completed the quiz.</div>
						<div>
							You've got {quizState.correctAnswersCount} of{' '}
							{quizState.questions.length}
						</div>
					</div>
					<div
						className="next-button"
						onClick={() => dispatch({ type: 'RESTART_QUIZ' })}>
						Restart
					</div>
				</div>
			)}
			{!quizState.showResults && quizState.questions.length > 0 && (
				<div>
					<div className="score">
						Question {quizState.currentQuestionIndex + 1} /{' '}
						{quizState.questions.length}
					</div>
					<Question />
					<div
						className="next-button"
						onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>
						Next question
					</div>
				</div>
			)}
		</div>
	);
};

export default Quiz;
