import { createContext, useReducer } from 'react';
import questions from '../data';

const initialState = {
	currentQuestionIndex: 0,
	questions,
	showResults: false,
};

const reducer = (state, action) => {
	console.log('render', state);
	switch (action.type) {
		case 'NEXT_QUESTION': {
			const showResults =
				state.currentQuestionIndex === state.questions.length - 1;
			const currentQuestionIndex = showResults
				? state.currentQuestionIndex
				: state.currentQuestionIndex + 1;
			return { ...state, currentQuestionIndex, showResults };
		}

		case 'RESTART_QUIZ': {
			return initialState;
		}

		default:
			return state;
	}
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
	const value = useReducer(reducer, initialState);
	console.log('state', value);
	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
