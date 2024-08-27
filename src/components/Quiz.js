import { useContext, useEffect } from 'react';
import Question from './Question';
import { QuizContext } from '../contexts/quiz';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Quiz = () => {
	const [quizState, dispatch] = useContext(QuizContext);

	const notify = () => {
		toast('You must select an answer', {
			type: 'error',
			theme: 'colored',
			transition: Bounce,
		});
	};

	const categoryFilter =
		quizState.quizFilters.category !== 'any'
			? `&category=${quizState.quizFilters.category}`
			: '';
	const typeFilter =
		quizState.quizFilters.type !== 'any'
			? `&type=${quizState.quizFilters.type}`
			: '';
	const difficultyFilter =
		quizState.quizFilters.difficulty !== 'any'
			? `&difficulty=${quizState.quizFilters.difficulty}`
			: '';
	const apiUrl = `https://opentdb.com/api.php?amount=10&encode=url3986${categoryFilter}${typeFilter}${difficultyFilter}`;

	useEffect(() => {
		if (
			quizState.questions.length > 0 ||
			quizState.error ||
			quizState.dataFetchError
		) {
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
			{quizState.dataFetchError && (
				<div className="results">
					<div className="congratulations">Data fetch error</div>
					<div className="results-info">
						<div>No data returned, try with distinct filters</div>
					</div>
					<div
						className="next-button"
						onClick={() => dispatch({ type: 'RESTART_QUIZ' })}>
						BACK
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
					{quizState.nextQuestionError && notify()}
					<ToastContainer
						autoClose={1000}
						hideProgressBar={true}
						limit={3}
						pauseOnFocusLoss={false}
						closeOnClick={false}
						position="bottom-center"
					/>
				</div>
			)}
		</div>
	);
};

export default Quiz;
