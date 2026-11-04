export const initialState = [];

export function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.tarefa];

    case "TOGGLE":
      return state.map((tarefa) =>
        tarefa.id === action.id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      );

    case "REMOVE":
      return state.filter((tarefa) => tarefa.id !== action.id);

    case "SET":
      return action.tarefas;

    default:
      return state;
  }
}