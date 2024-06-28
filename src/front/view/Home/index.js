const URLSERVICOS = 'http://localhost:8080/servico';
const URLFUNCIONARIOS = 'http://localhost:8080/Funcionario';
const URLVEICULOS = 'http://localhost:8080/veiculo';

var listaServicos = [];
var listaFuncionarios = [];
var listaVeiculos = [];

//FUNÇÃO PARA PEGAR OS DADOS DA API
async function getAPI(URLSERVICOS) {
    const response = await fetch(URLSERVICOS, { method: 'GET' });
    getFuncionarios(URLFUNCIONARIOS);
    getVeiculos(URLVEICULOS);
  
    listaServicos = await response.json();
    if (response.status !== 200) {
      throw new Error('Não foi possível acessar a API');
    }
}
  
  //FUNÇÂO PARA PEGAR OS FUNCIONARIOS DA API
async function getFuncionarios(URLFUNCIONARIOS) {
    try {
      const response = await fetch(URLFUNCIONARIOS, { method: "GET" });
      if (!response.ok) {
        throw new Error("Erro ao obter dados da API");
      }
      const data = await response.json();
      listaFuncionarios = data;
    } catch (error) {
      console.error(error);
    }
}
  
  //FUNÇÂO PARA PEGAR VEICULOS DA API
async function getVeiculos(URLVEICULOS) {
    try {
      const response = await fetch(URLVEICULOS, { method: "GET" });
      if (!response.ok) {
        throw new Error("Erro ao obter dados da API");
      }
      const data = await response.json();
      listaVeiculos = data;
    } catch (error) {
      console.error(error);
    }
}

function exibeMetricaServico() {
    var tituloindicador = document.getElementById('tituloIndicador');
    var indicador = document.getElementById('indicador');
    var numConcluidos = 0;
    var feitosNoPrazo = 0;
    let data1;
    let data2;
    for (let servico of listaServicos) {
      if (servico.dataTermino != '') {
        numConcluidos++;
        data1 = parseDate(servico.dataTermino);
        data2 = parseDate(servico.previsaoTermino);
        if (data1 <= data2) {
          feitosNoPrazo++;
        }
      }
    }
    tituloindicador.innerText = "Total de Entregas no Prazo";
      
    indicador.innerHTML = `
      <p class="tamanhoTexto">Número de serviços:<b> ${listaServicos.length}</b></p>
      <p class="tamanhoTexto">Número de serviços concluídos:<b> ${numConcluidos}</b></p>
      <p class="tamanhoTexto">Número de serviços concluídos no prazo:<b> ${feitosNoPrazo}</b></p>
      <p class="tamanhoTexto">Número de serviços a serem concluídos:<b> ${listaServicos.length - numConcluidos}</b></p>
      <p class="tamanhoTexto">Porcentagem de serviços concluídos no prazo:<b> ${parseFloat(feitosNoPrazo / numConcluidos * 100).toFixed(2)}%</b></p>
    `;
}

function parseDate(dateString) {
    let parts = dateString.split('/');
    // No formato 'dd/mm/yyyy'
    let day = parts[0];
    let month = parts[1] - 1; // Meses são indexados em 0
    let year = parts[2];
  
    return new Date(year, month, day);
}

getAPI(URLSERVICOS);
getFuncionarios(URLFUNCIONARIOS);
getVeiculos(URLVEICULOS);

//INDICADOR DE FUNCIONÁRIO
function exibeMetricaFuncionarios(){
  let funcionarios = listaFuncionarios.filter(funcionario => funcionario.status === "Ativo").length;
  var tituloindicador = document.getElementById('tituloIndicador');
  tituloindicador.innerText = 'Tamanho da Empresa';
    let modalPerformance = document.getElementById("indicador");
    if (funcionarios <= 9) {
        modalPerformance.innerHTML = `Micro Empresa - 0-9 <br>Funcionários ativos: ${funcionarios}`;
    }
    else if (funcionarios >= 10 && funcionarios <= 19) {
        modalPerformance.innerHTML = `Empresa de Pequeno Porte - 10-19 <br>Funcionários ativos: ${funcionarios}`;
    }
    else if (funcionarios >= 20 && funcionarios <= 99) {
        modalPerformance.innerHTML = `Empresa de Médio Porte - 20-99 <br>Funcionários ativos: ${funcionarios}`;
    }
    else if (funcionarios >= 100) {
        modalPerformance.innerHTML = `Empresa de Grande Porte - 100+ <br>Funcionários ativos: ${funcionarios}`;
    }
    modalPerformance.hide();
}

async function calcularECalcularCustoMedioTodos() {
  try {
    const responseFornecedores = await fetch('http://localhost:8080/fornecedor');
    if (!responseFornecedores.ok) {
      throw new Error("Erro ao buscar fornecedores.");
    }
    const fornecedores = await responseFornecedores.json();

    const resultados = [];

    for (const fornecedor of fornecedores) {
      const responseMateriais = await fetch(`http://localhost:8080/material/fornecedor/${fornecedor.id}`);
      if (!responseMateriais.ok) {
        throw new Error("Erro ao buscar materiais do fornecedor.");
      }
      const materiais = await responseMateriais.json();

      let somaCustos = 0;
      materiais.forEach(material => {
        somaCustos += parseFloat(material.preco);
      });

      const custoMedio = materiais.length > 0 ? (somaCustos / materiais.length).toFixed(2) : 0;

      resultados.push({
        nomeFornecedor: fornecedor.nome, // Acessa o nome do fornecedor diretamente
        custoMedio: custoMedio
      });
    }

    return resultados;
  } catch (error) {
    console.error("Erro ao calcular custos médios:", error);
    return { error: error.message };
  }
}

async function exibirCustoMedioTodos() {
  // Limpa o conteúdo da tabela antes de adicionar novos dados
  const tabelaBody = document.querySelector("#tabelaCustoMedio tbody");
  tabelaBody.innerHTML = "";
  const resultados = await calcularECalcularCustoMedioTodos();

  if (resultados.error) {
    // Se houver um erro, exiba uma mensagem de erro no modal
    alert("Erro ao calcular o custo médio: " + resultados.error);
    return; 
  }

  // Preenche a tabela com os resultados
  resultados.forEach(resultado => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${resultado.nomeFornecedor}</td>
      <td>R$ ${resultado.custoMedio}</td>
    `;
    tabelaBody.appendChild(row);
  });

  // Abre o modal
  const modalCustoMedioTodos = new bootstrap.Modal(document.getElementById("modalCustoMedioTodos"));
  modalCustoMedioTodos.show();
  modalCustoMedioTodos.show();

// Adiciona um event listener para quando o modal for completamente fechado
modalCustoMedioTodos._element.addEventListener('hidden.bs.modal', () => {
// Encontra o elemento do overlay
const overlay = document.querySelector('.modal-backdrop'); 

// Remove o overlay
  if (overlay) {
    overlay.remove();
  }
});
}
document.getElementById("btnCalcularCustoMedioTodos").addEventListener("click", exibirCustoMedioTodos);