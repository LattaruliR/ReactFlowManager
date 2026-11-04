export function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.tarefa];
    case "TOGGLE":
      return state.map((tarefa) => {
        if (tarefa.id === action.id) {
          return { ...tarefa, done: !tarefa.done };
        }
        return tarefa;
      });
    case "REMOVE":
      return state.filter((tarefa) => tarefa.id !== action.id);
    case "SET":
      return action.tarefas;
    default:
      return state;
  }
}