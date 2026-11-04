import { useCallback, useMemo, useState } from "react";
import { useTasks } from "./hooks/useTasks"; // Papel 3
import { ThemeToggle } from "./components/ThemeToggle"; // Papel 3
import { Toast } from "./components/Toast"; // Papel 4
import { TaskForm } from "./components/TaskForm"; // Papel 1
import { TaskList } from "./components/TaskList"; // Papel 1
import { Filtro } from "./components/Filtro"; // Papel 1
import { Contador } from "./components/Contador"; // Papel 1
import "./App.css";

// Papel 1 - Tela principal.
// As tarefas vêm do contexto (useTasks), o tema é aplicado pelo ThemeProvider
// no main.jsx, e a persistência/API ficam por conta do Papel 4.
export default function App() {
  const { tarefas, adicionar, alternar, remover } = useTasks();

  const [filtro, setFiltro] = useState("todas");
  const [mensagem, setMensagem] = useState("");

  // Lista exibida de acordo com o filtro (R4).
  const tarefasFiltradas = useMemo(() => {
    if (filtro === "pendentes") return tarefas.filter((t) => !t.concluida);
    if (filtro === "concluidas") return tarefas.filter((t) => t.concluida);
    return tarefas;
  }, [tarefas, filtro]);

  // Quantidade de pendentes para o contador (R3).
  const pendentes = useMemo(
    () => tarefas.filter((t) => !t.concluida).length,
    [tarefas]
  );

  // Funções estáveis: o Toast depende de onFechar não mudar a cada render,
  // senão o timer do useEffect reiniciaria sempre e a mensagem não sumiria (R8).
  const fecharMensagem = useCallback(() => setMensagem(""), []);
  const aoAdicionar = useCallback(
    () => setMensagem("Tarefa adicionada!"),
    []
  );

  return (
    <main className="app">
      <header className="app-header">
        <h1>TaskFlow</h1>
        <ThemeToggle />
      </header>

      <TaskForm adicionar={adicionar} onAdicionada={aoAdicionar} />

      <Filtro filtro={filtro} onChange={setFiltro} />
      <Contador pendentes={pendentes} total={tarefas.length} />

      <TaskList
        tarefas={tarefasFiltradas}
        alternar={alternar}
        remover={remover}
      />

      <Toast mensagem={mensagem} onFechar={fecharMensagem} />
    </main>
  );
}