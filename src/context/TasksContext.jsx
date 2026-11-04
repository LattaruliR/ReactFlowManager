import { createContext, useReducer } from "react";

import {
  tasksReducer,
  initialState
} from "../reducers/tasksReducer";

export const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tarefas, dispatch] = useReducer(
    tasksReducer,
    initialState
  );

  function adicionar(tarefa) {
    dispatch({
      type: "ADD",
      tarefa: {
        id: crypto.randomUUID(),
        texto: tarefa,
        concluida: false
      }
    });
  }

  function alternar(id) {
    dispatch({
      type: "TOGGLE",
      id
    });
  }

  function remover(id) {
    dispatch({
      type: "REMOVE",
      id
    });
  }

  return (
    <TasksContext.Provider
      value={{
        tarefas,
        adicionar,
        alternar,
        remover
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}