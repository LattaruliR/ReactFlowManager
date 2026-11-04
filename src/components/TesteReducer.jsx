import { useReducer, useState } from 'react';
import { tasksReducer } from '../reducers/tasksReducer';

const initialTasks = [
  { id: 1, text: 'Estudar React', done: false },
  { id: 2, text: 'Lavar a louça', done: true },
  { id: 3, text: 'Fazer exercícios', done: false },
];

export default function TesteReducer() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    const texto = novaTarefa.trim();

    if (!texto) {
      return;
    }

    dispatch({
      type: 'ADD',
      tarefa: {
        id: Date.now(),
        text: texto,
        done: false,
      },
    });

    setNovaTarefa('');
  };

  return (
    <div style={{ maxWidth: '420px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Teste do reducer</h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={novaTarefa}
          onChange={(event) => setNovaTarefa(event.target.value)}
          placeholder="Digite uma tarefa"
          style={{ flex: 1, padding: '8px 10px' }}
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '8px' }}>
        {tasks.map((tarefa) => (
          <li
            key={tarefa.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '8px 10px',
            }}
          >
            <button
              onClick={() => dispatch({ type: 'TOGGLE', id: tarefa.id })}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                textAlign: 'left',
                flex: 1,
                textDecoration: tarefa.done ? 'line-through' : 'none',
              }}
            >
              {tarefa.done ? '✅' : '⬜'} {tarefa.text}
            </button>

            <button onClick={() => dispatch({ type: 'REMOVE', id: tarefa.id })}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
