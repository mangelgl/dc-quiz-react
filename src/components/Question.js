import { useContext } from 'react';
import Answer from './Answer';
import { QuizContext } from '../contexts/quiz';

const Question = ({ questions }) => {
	const [quizState] = useContext(QuizContext);
	const currentQuestion =
		quizState.questions[quizState.currentQuestionIndex].question;
	console.log('Question', quizState);
	return (
		<div>
			<div className="question">{currentQuestion}</div>
			<div className="answers">
				<Answer />
				<Answer />
				<Answer />
				<Answer />
			</div>
		</div>
	);
};

export default Question;
