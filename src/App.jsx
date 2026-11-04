import { useCallback, useMemo, useState } from "react";

import { useTasks } from "./hooks/useTasks";
import ThemeToggle from "./components/ThemeToggle";
import { Toast } from "./components/Toast";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { Filtro } from "./components/Filtro";
import { Contador } from "./components/Contador";

import "./App.css";

export default function App() {
  const { tarefas = [], adicionar, alternar, remover } = useTasks();

  const [filtro, setFiltro] = useState("todas");
  const [mensagem, setMensagem] = useState("");

  const tarefasFiltradas = useMemo(() => {
    if (filtro === "pendentes") {
      return tarefas.filter((t) => !t.concluida);
    }

    if (filtro === "concluidas") {
      return tarefas.filter((t) => t.concluida);
    }

    return tarefas;
  }, [tarefas, filtro]);

  const pendentes = useMemo(
    () => tarefas.filter((t) => !t.concluida).length,
    [tarefas]
  );

  const fecharMensagem = useCallback(() => {
    setMensagem("");
  }, []);

  const aoAdicionar = useCallback(() => {
    setMensagem("Tarefa adicionada!");
  }, []);

  return (
    <main className="app">
      <header className="app-header">
        <h1>TaskFlow</h1>
        <ThemeToggle />
      </header>

      <TaskForm
        adicionar={adicionar}
        onAdicionada={aoAdicionar}
      />

      <Filtro filtro={filtro} onChange={setFiltro} />

      <Contador
        pendentes={pendentes}
        total={tarefas.length}
      />

      <TaskList
        tarefas={tarefasFiltradas}
        alternar={alternar}
        remover={remover}
      />

      <Toast
        mensagem={mensagem}
        onFechar={fecharMensagem}
      />
    </main>
  );
}