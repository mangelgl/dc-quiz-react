import { createContext, useReducer } from 'react';
import { normalizeQuestions, shuffleAnswers } from '../helpers';

const initialState = {
	currentQuestionIndex: 0,
	questions: [],
	showResults: false,
	answers: [],
	currentAnswer: '',
	correctAnswersCount: 0,
	error: null,
	showError: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADED_QUESTIONS': {
			const normalizedQuestions = normalizeQuestions(action.payload);
			return {
				...state,
				questions: normalizedQuestions,
				answers: shuffleAnswers(normalizedQuestions[0]),
			};
		}

		case 'SELECT_ANSWER': {
			const correctAnswersCount =
				action.payload ===
				state.questions[state.currentQuestionIndex].correctAnswer
					? state.correctAnswersCount + 1
					: state.correctAnswersCount;
			return {
				...state,
				currentAnswer: action.payload,
				correctAnswersCount,
			};
		}

		case 'NEXT_QUESTION': {
			const showResults =
				state.currentQuestionIndex === state.questions.length - 1;
			const currentQuestionIndex = showResults
				? state.currentQuestionIndex
				: state.currentQuestionIndex + 1;
			const answers = showResults
				? []
				: shuffleAnswers(state.questions[currentQuestionIndex]);
			const showError = !state.currentAnswer ? true : false;

			if (showError) {
				alert('Debe seleccionar una respuesta');
				return state;
			}

			return {
				...state,
				currentQuestionIndex,
				showResults,
				answers,
				currentAnswer: '',
				showError,
			};
		}

		case 'RESTART_QUIZ': {
			return initialState;
		}

		case 'SERVER_ERROR': {
			return {
				...state,
				error: action.payload,
			};
		}

		default:
			return state;
	}
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
	const value = useReducer(reducer, initialState);

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
