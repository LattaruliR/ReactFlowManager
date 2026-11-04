import { TaskItem } from "./TaskItem";

// Percorre as tarefas com map (key={tarefa.id} é obrigatório).
export function TaskList({ tarefas, alternar, remover }) {
  if (tarefas.length === 0) {
    return <p className="task-vazia">Nenhuma tarefa por aqui.</p>;
  }

  return (
    <ul className="task-list">
      {tarefas.map((tarefa) => (
        <TaskItem
          key={tarefa.id}
          tarefa={tarefa}
          alternar={alternar}
          remover={remover}
        />
      ))}
    </ul>
  );
}