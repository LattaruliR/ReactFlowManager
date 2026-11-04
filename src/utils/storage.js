// Papel 4 - Efeitos e Reuso
// Funções utilitárias para ler/salvar as tarefas no localStorage.

export const CHAVE_TAREFAS = "taskflow-tarefas";

// Devolve o array de tarefas salvo no navegador, ou [] se não houver nada
// ou se o conteúdo salvo estiver corrompido.
// Usada pelo Papel 3 como terceiro argumento do useReducer:
//   useReducer(tasksReducer, [], lerTarefasSalvas)
export function lerTarefasSalvas() {
  try {
    const salvo = localStorage.getItem(CHAVE_TAREFAS);
    if (!salvo) return [];
    const tarefas = JSON.parse(salvo);
    return Array.isArray(tarefas) ? tarefas : [];
  } catch (erro) {
    console.error("Erro ao ler tarefas salvas:", erro);
    return [];
  }
}

// Salva o array de tarefas no navegador (em JSON).
export function salvarTarefas(tarefas) {
  try {
    localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
  } catch (erro) {
    console.error("Erro ao salvar tarefas:", erro);
  }
}