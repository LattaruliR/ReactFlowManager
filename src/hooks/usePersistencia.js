// Papel 4 - Efeitos e Reuso
// Hook chamado pelo Papel 3 dentro do TasksProvider:
//   usePersistencia(tarefas, dispatch);
// - Efeito 1 (R7): se não houver tarefas ao abrir o app, busca 5 na API.
// - Efeito 2 (R6): salva as tarefas no localStorage sempre que mudarem.
import { useEffect } from "react";
import { salvarTarefas } from "../utils/storage";

const URL_API = "https://jsonplaceholder.typicode.com/todos?_limit=5";

export function usePersistencia(tarefas, dispatch) {
  // Efeito 1: roda UMA vez (array vazio), ao abrir o app.
  useEffect(() => {
    // Já existem tarefas salvas: não precisa buscar na API.
    if (tarefas.length > 0) return;

    // Evita dispatch depois que o componente foi desmontado
    // (ex.: StrictMode monta, desmonta e monta de novo em desenvolvimento).
    let ativo = true;

    fetch(URL_API)
      .then((resposta) => {
        if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
        return resposta.json();
      })
      .then((dados) => {
        if (!ativo) return;
        // Converte { id, title, completed } -> { id, texto, concluida }
        const tarefasDaApi = dados.map((item) => ({
          id: item.id,
          texto: item.title,
          concluida: item.completed,
        }));
        dispatch({ type: "SET", tarefas: tarefasDaApi });
      })
      .catch((erro) => {
        // Sem rede ou API fora do ar: o app continua funcionando, só sem as tarefas iniciais.
        console.warn("Não foi possível buscar as tarefas iniciais:", erro.message);
      });

    return () => {
      ativo = false;
    };
    // PROPOSITAL: "tarefas" e "dispatch" ficam fora das dependências.
    // Queremos que este efeito rode só uma vez, ao abrir o app,
    // e não toda vez que a lista mudar (isso causaria novas buscas na API).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efeito 2: roda sempre que as tarefas mudarem.
  useEffect(() => {
    salvarTarefas(tarefas);
  }, [tarefas]);
}