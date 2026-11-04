// Mostra quantas tarefas estão pendentes do total (R3).
export function Contador({ pendentes, total }) {
  return (
    <p className="contador">
      {pendentes} {pendentes === 1 ? "pendente" : "pendentes"} de {total}
    </p>
  );
}