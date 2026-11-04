import { createContext, useReducer, useCallback, useMemo } from 'react';
import { tasksReducer, initialState } from '../reducers/tasksReducer';

export const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialState);

  // os nomes das actions abaixo são placeholders: alinhe com o Papel 2
  const addTask = useCallback((title) => dispatch({ type: 'ADD_TASK', payload: title }), []);
  const toggleTask = useCallback((id) => dispatch({ type: 'TOGGLE_TASK', payload: id }), []);
  const removeTask = useCallback((id) => dispatch({ type: 'REMOVE_TASK', payload: id }), []);

  const value = useMemo(
    () => ({ tasks, addTask, toggleTask, removeTask }),
    [tasks, addTask, toggleTask, removeTask]
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}