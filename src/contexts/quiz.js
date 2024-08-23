import { createContext, useReducer } from 'react';
import questions from '../data';

const initialState = {
	currentQuestionIndex: 0,
	questions,
};

const reducer = (state, action) => {
	console.log('render', state);
	switch (action.type) {
		case 'NEXT_QUESTION': {
			return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
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
