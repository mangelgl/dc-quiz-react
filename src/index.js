import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Quiz from './components/Quiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Quiz />);

// React.StrictMode => show errors if something goes wrong
// also render the app twice
// <React.StrictMode></React.StrictMode>

