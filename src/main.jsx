import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { TasksProvider } from './context/TasksContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <TasksProvider>
      <App />
    </TasksProvider>
  </ThemeProvider>
);