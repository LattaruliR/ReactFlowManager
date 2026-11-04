// Papel 4 - Efeitos e Reuso
// Custom hook: funciona como o useState, mas o valor fica salvo no localStorage.
// Uso (Papel 3, para o tema):
//   const [tema, setTema] = useLocalStorage("taskflow-tema", "claro");
import { useState, useEffect, useDebugValue } from "react";

export function useLocalStorage(chave, valorInicial) {
  // Função inicial (lazy initializer): roda só no primeiro render.
  // Tenta ler do localStorage; se não houver (ou der erro), usa valorInicial.
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave);
      return salvo !== null ? JSON.parse(salvo) : valorInicial;
    } catch (erro) {
      console.error(`Erro ao ler "${chave}" do localStorage:`, erro);
      return valorInicial;
    }
  });

  // Efeito com dependências: salva em JSON sempre que a chave ou o valor mudar.
  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
      console.error(`Erro ao salvar "${chave}" no localStorage:`, erro);
    }
  }, [chave, valor]);

  // Mostra o valor atual do hook na aba Components do React Dev Tools.
  useDebugValue(`${chave}: ${JSON.stringify(valor)}`);

  return [valor, setValor];
}
