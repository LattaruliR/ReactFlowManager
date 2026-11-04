// Valores fixos do contrato: "todas", "pendentes", "concluidas".
const OPCOES = [
  { valor: "todas", rotulo: "Todas" },
  { valor: "pendentes", rotulo: "Pendentes" },
  { valor: "concluidas", rotulo: "Concluídas" },
];

export function Filtro({ filtro, onChange }) {
  return (
    <div className="filtro" role="group" aria-label="Filtrar tarefas">
      {OPCOES.map((opcao) => (
        <button
          key={opcao.valor}
          type="button"
          className={filtro === opcao.valor ? "ativo" : ""}
          aria-pressed={filtro === opcao.valor}
          onClick={() => onChange(opcao.valor)}
        >
          {opcao.rotulo}
        </button>
      ))}
    </div>
  );
}