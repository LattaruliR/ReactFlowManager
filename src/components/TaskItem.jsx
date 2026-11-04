// Clicar no texto (ou na caixinha) alterna concluída. Concluída aparece riscada.
export function TaskItem({ tarefa, alternar, remover }) {
  return (
    <li className={`task-item ${tarefa.concluida ? "concluida" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={tarefa.concluida}
          onChange={() => alternar(tarefa.id)}
        />
        <span className="task-texto">{tarefa.texto}</span>
      </label>
      <button
        type="button"
        className="task-remover"
        onClick={() => remover(tarefa.id)}
        aria-label={`Remover tarefa: ${tarefa.texto}`}
      >
        Remover
      </button>
    </li>
  );
}