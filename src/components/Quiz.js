import { useReducer } from 'react';
import Question from './Question';

const initialState = {
	currentQuestionIndex: 0,
	questions: [],
};

console.log('initialState', initialState);

const reducer = (state, action) => {
	console.log('render', state);
	switch (action.type) {
		case 'NEXT_QUESTION': {
			return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
		}

		default:
			return { ...state };
	}
};

const Quiz = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="quiz">
			<div>
				<div className="score">1/10</div>
				<Question />
				<div
					className="next-button"
					onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>
					Next question
				</div>
			</div>
		</div>
	);
};

export default Quiz;
