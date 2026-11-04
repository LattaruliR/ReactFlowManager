// hooks/useTasks.js
import { useContext } from 'react';
import { TasksContext } from '../context/TasksContext';

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks deve ser usado dentro de TasksProvider');
  return ctx;
}