// Papel 4 - Efeitos e Reuso
// Mensagem temporária (R8). Uso no App.jsx (Papel 1):
//   <Toast mensagem={mensagem} onFechar={fecharMensagem} />
// onFechar deve ser estável (useCallback no App.jsx), senão o timer reinicia a cada render.
import { useEffect } from "react";

const DURACAO_MS = 2500;

export function Toast({ mensagem, onFechar }) {
  useEffect(() => {
    if (!mensagem) return;

    // Agenda o fechamento da mensagem.
    const timer = setTimeout(() => {
      onFechar();
    }, DURACAO_MS);

    // Limpeza (cleanup): cancela o timer se a mensagem mudar
    // ou se o componente sair da tela antes do tempo.
    return () => clearTimeout(timer);
  }, [mensagem, onFechar]);

  // Sem mensagem, não renderiza nada.
  if (!mensagem) return null;

  return (
    <div className="toast" role="status">
      {mensagem}
    </div>
  );
}

export default Toast;
