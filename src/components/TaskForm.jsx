import { useEffect, useRef, useState } from "react";

// Formulário para adicionar tarefas.
// useState  -> input controlado (texto)
// useRef    -> acesso direto ao <input> para devolver o foco
export function TaskForm({ adicionar, onAdicionada }) {
  const [texto, setTexto] = useState("");
  const inputRef = useRef(null);

  // Foca o input assim que o componente aparece na tela.
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function enviar(e) {
    e.preventDefault(); // evita recarregar a página

    const textoLimpo = texto.trim();
    if (!textoLimpo) {
      inputRef.current.focus();
      return; // ignora texto vazio
    }

    adicionar(textoLimpo);
    setTexto(""); // limpa o campo
    inputRef.current.focus(); // devolve o cursor ao input (R1)
    if (onAdicionada) onAdicionada();
  }

  return (
    <form className="task-form" onSubmit={enviar}>
      <input
        ref={inputRef}
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="O que precisa ser feito?"
        aria-label="Nova tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}