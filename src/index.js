import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QuizProvider } from './contexts/quiz';
import Home from './components/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<QuizProvider>
		<Home />
	</QuizProvider>
	// </React.StrictMode>
);
