const url = "http://localhost:8080/veiculo";
let listaVeiculo = [];

const urlM = "http://localhost:8080/manutencao/veiculo";
let listaManutencoes = [];

// fetch nos veiculos
async function getAllAPI(url) {
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(
        `Erro ao obter dados da API: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    listaVeiculo = data;
    showVeiculos(listaVeiculo);
  } catch (error) {
    console.error(error);
  }
}

getAllAPI(url); // Chame a função inicialmente para carregar os dados

// mostra veiculos na tela
function showVeiculos(veiculos) {
  let tab = `
        <thead>
            <th scope="col" id="col1">Placa</th>
            <th scope="col" id="col2">Modelo</th>
            <th scope="col" id="col3">Ano</th>
            <th scope="col" id="col4">Capacidade em KG</th>
            <th scope="col" id="col5">Tipo de veículo</th>
            <th scope="col" id="col6" class="text-center">Editar</th>
            <th scope="col" id="col7" class="text-center">Deletar</th>
            <th scope="col" id="col8" class="text-center">Manutenções</th>
        </thead>`;

  veiculos.forEach((veiculo) => {
    let placaFormatada = veiculo.placa
      .toUpperCase()
      .replace(/(\w{3})(\w{4})/, "$1-$2");
    tab += `
            <tr>
                <td scope="row">${placaFormatada}</td>
                <td scope="row">${veiculo.modelo}</td>
                <td scope="row" id="cpfscope">${veiculo.ano}</td>
                <td scope="row" id="cargoscope">${veiculo.capacidade_carga_kg}</td>
                <td scope="row" id="statuscope">${veiculo.tipo_veiculo}</td>
                <td scope="row" id="editLittleBtn" class="text-center"><!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" id="btnModal${veiculo.placa}">Editar
                </button>
                
                <!-- Modal -->
                <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Insira os novos dados</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body" id="modalEditar">
                      </div>
                    </div>
                  </div>
                </div></td>
                <td scope="row" id="deletebtn" class="text-center"><button type="button" id="btndelete${veiculo.placa}" class="btn btn-danger">Deletar</button></td>
                <td scope="row" id="manutencaobtn" class="text-center"><button type="button" onclick="trocaParaManutencao() "id="linha${veiculo.placa}" class="btn btn-warning papai">Manutenções</button></td>
            </tr>
        `;
  });
  
  document.getElementById("veiculos").innerHTML = tab;
}

// Event listener para o campo de busca
const inputBusca = document.getElementById("buscar");
if (inputBusca) {
  inputBusca.addEventListener("input", () => {
    const termoPesquisa = inputBusca.value.toLowerCase().trim();

    // Verificar o contexto atual para decidir o filtro
    if (placaVeiculoSelecionado) {
      // Filtrar manutenções por nome da oficina
      const manutencoesFiltradas = listaManutencoes.filter((manutencao) =>
        manutencao.oficina.toLowerCase().includes(termoPesquisa)
      );
      showManutencoes(manutencoesFiltradas);
    } else {
      // Filtrar veículos por placa
      const veiculosFiltrados = listaVeiculo.filter((veiculo) =>
        veiculo.placa.toLowerCase().includes(termoPesquisa)
      );
      showVeiculos(veiculosFiltrados);
    }
  });
}

// funcao para deletar veiculos
document.addEventListener("click", function (event) {
  const idDoBotao = event.target.id;
  const idDoVeiculo = idDoBotao.substring(9);

  if (idDoBotao.includes("btndelete")) {
    const veiculo = listaVeiculo.find(
      (veiculo) => veiculo.placa == idDoVeiculo
    );

    var resposta = window.confirm("Deseja realmente deletar o veículo?");
    if (resposta) {
      fetch(`http://localhost:8080/veiculo/${veiculo.placa}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            alert(
              "Não foi possível deletar o veículo pois tem manutenções registradas. Por favor delete-as e tente novamente."
            );
            throw new Error(
              `Erro ao deletar veículo: ${response.status} ${response.statusText}`
            );
          }
          return response.text();
        })
        .then(() => {
          getAllAPI(url);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
});

// funcao para add veiculo
document.addEventListener("click", function (event) {
  const idDoBotao = event.target.id;
  if (idDoBotao.includes("btnAdicionarVeiculo")) {
    const modalAdicionar = document.getElementById("modalAdicionar");
    modalAdicionar.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="placa" class="form-label">Placa</label>
                    <input type="text" class="form-control" id="placaAdicionar">
                    <p class="small text-danger" id="placaError"></p>
                </div>
                <div class="mb-3">
                    <label for="modelo" class="form-label">Modelo</label>
                    <input type="text" class="form-control" id="modeloAdicionar">
                    <p class="small text-danger" id="modeloError"></p>
                </div>
                <div class="mb-3">
                    <label for="ano" class="form-label">Ano</label>
                    <input type="text" class="form-control" id="anoAdicionar">
                    <p class="small text-danger" id="anoError"></p>
                </div>
                <div class="mb-3">
                    <label for="capacidadeCarga" class="form-label">Capacidade de carga em KG</label>
                    <input type="text" class="form-control" id="cargaAdicionar">
                    <p class="small text-danger" id="capacidadeError"></p>
                </div>
                <div class="mb-3">
                    <label for="tipoVeiculo" class="form-label">Tipo do veículo</label>
                    <input type="text" class="form-control" id="tipoVeiculoAdicionar">
                    <p class="small text-danger" id="tipoError"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnSalvarAdicionar">Salvar</button>
                    <button type="button" class="d-none" data-bs-dismiss="modal" id="btnFechar">Salvar</button>
                </div>
            </form>
        `;

        $('#placaAdicionar').mask('AAA-0A00');
        $('#cargaAdicionar').mask('00.000', {reverse: true});
        $('#anoAdicionar').mask('0000');

    document
      .getElementById("btnSalvarAdicionar")
      .addEventListener("click", function () {
        const AddPlaca = document.getElementById("placaAdicionar").value.replace("-", "").toUpperCase();
        if(AddPlaca.length != 7) {
          document.getElementById("placaError").innerHTML = "Por favor, digite uma placa válida";
          return;
        }
        else {
          document.getElementById("placaError").innerHTML = "";
        }

        const AddModelo = document.getElementById("modeloAdicionar").value;
        if(AddModelo == '') {
          document.getElementById("modeloError").innerHTML = "Por favor, digite um modelo válido";
          return;
        }
        else {
          document.getElementById("modeloError").innerHTML = "";
        }
        
        const AddAno = document.getElementById("anoAdicionar").value;
        if(AddAno == '' || AddAno.length != 4) {
          document.getElementById("anoError").innerHTML = "Por favor, digite um ano válido";
          return;
        }
        else if(compareYearWithCurrent(AddAno)) {
          document.getElementById("anoError").innerHTML = "Por favor, digite um ano válido";
          return;
        }
        else {
          document.getElementById("anoError").innerHTML = "";
        }

        var AddCapacidadeCarga = document.getElementById("cargaAdicionar").value;
        if(AddCapacidadeCarga == '') {
          document.getElementById("capacidadeError").innerHTML = "Por favor, digite uma capacidade de carga válida";
          return;
        }
        else {
          document.getElementById("capacidadeError").innerHTML = "";
        }
        var AddCapacidadeCarga = convertLong(AddCapacidadeCarga);
        if(AddCapacidadeCarga > 50000){
          document.getElementById("capacidadeError").innerHTML = "Por favor, digite uma capacidade de carga válida";
          return
        }
        else {
          document.getElementById("capacidadeError").innerHTML = "";
        }

        const AddTipoVeiculo = document.getElementById("tipoVeiculoAdicionar").value;
        if(AddTipoVeiculo == '') {
          document.getElementById("tipoError").innerHTML = "Por favor, digite um tipo de veículo válido";
          return;
        }
        else{
          document.getElementById("tipoError").innerHTML = "";
        }

        const AddVeiculo = {
          placa: AddPlaca,
          modelo: AddModelo,
          ano: AddAno,
          capacidade_carga_kg: AddCapacidadeCarga,
          tipo_veiculo: AddTipoVeiculo,
        };

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(AddVeiculo),
        })
          .then((response) => response.json())
          .then((data) => {
            document.getElementById("btnFechar").click();
            getAllAPI(url);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }
});

// funcao para editar um veiculo
document.addEventListener("click", function (event) {
  const idDoBotao = event.target.id;
  const idDoVeiculo = idDoBotao.substring(8);
  if (idDoBotao.includes("btnModal") || idDoBotao.includes("btnSalvar")) {
    if (idDoBotao.includes("btnModal")) {
      const veiculo = listaVeiculo.find(
        (veiculo) => veiculo.placa == idDoVeiculo
      );
      if (veiculo) {
        var modalEditar = document.getElementById("modalEditar");
        modalEditar.innerHTML = `
                    <form class="text-start">
                        <div class="mb-3">
                            <label for="carga" class="form-label">Capacidade de carga em KG</label>
                            <input type="text" class="form-control" id="capacidadeEditar" value="${veiculo.capacidade_carga_kg}">
                            <p class="small text-danger" id="capacidadeErro"></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" id="btnSalvar${veiculo.placa}">Salvar</button>
                            <button type="button" class="d-none" data-bs-dismiss="modal" id="btnFecharE"></button>
                        </div>
                    </form>
                `;
        $('#capacidadeEditar').mask('000.000', {reverse: true});
      }

      document
        .getElementById(`btnSalvar${veiculo.placa}`)
        .addEventListener("click", function () {
          var novaCapacidade = document.getElementById("capacidadeEditar").value;
          if(novaCapacidade == '') {
            document.getElementById("capacidadeErro").innerHTML = "Por favor, digite uma capacidade de carga válida";
            return;
          }
          else {
            novaCapacidade = convertLong(novaCapacidade);
          }

          if(novaCapacidade > 50000){
            document.getElementById("capacidadeErro").innerHTML = "Por favor, digite uma capacidade de carga válida";
            return;
          }

          const novoVeiculo = {
            capacidade_carga_kg: novaCapacidade,
          };
          fetch(`http://localhost:8080/veiculo/${veiculo.placa}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(novoVeiculo),
          })
            .then((response) => response.json())
            .then((data) => {
              document.getElementById("btnFecharE").click();
              getAllAPI(url);
            })
            .catch((error) => {
              console.error(error);
            });
        });
    }
  }
});

// FIM DE VEICULOS

// fetch de todas as manutencoes de determinado veiculo
async function getAllM(placa) {
  try {
    const response = await fetch(
      `http://localhost:8080/manutencao/veiculo/${placa}`,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error("Erro ao obter dados da API");
    }
    const data = await response.json();
    listaManutencoes = data;
    showManutencoes(data);
  } catch (error) {
    console.error(error);
  }
}

let placaVeiculoSelecionado = null;

// event listener para carregar manutenções e trocar o botão
document.addEventListener("click", function (event) {
  const idDoTr = event.target.id;
  // idDoVeic, ao fazer a substring, se torna sua placa
  if (idDoTr.includes("linha")) {
    placaVeiculoSelecionado = idDoTr.substring(5);
    carregarManutencoes(placaVeiculoSelecionado);
  }
});

//funcao para adicionar o botao de voltar ao selecionar as manutencoes de um veiculo
function exibeBtns() {
  adicionarBotaoMediaManutencoes();
  const voltar = document.getElementById("voltardp");
  voltar.innerHTML = `
    <button id="voltar" class="btn btn-warning w-100 me-4" type="button">Voltar</button>
  `;
  document.getElementById("voltar").addEventListener("click", function () {
    getAllAPI(url);
    trocaParaVeiculo();
    placaVeiculoSelecionado = null;
    document.getElementById("xumbraaa").remove();
  });
}

//funcao para remover os botoes de voltar e media manutencoes quando estiver na tela de veiculos
document.addEventListener("click", function (event) {
  const butaovoltarid = event.target.id;
  if (butaovoltarid == "voltar") {
    getAllAPI(url);
    document.getElementById("voltardp").innerHTML = "";
    document.getElementById("indice").innerHTML = "";
  }
});

//funcao para exibir as manutencoes
function showManutencoes(manutencoes) {
  let tab = `
          <thead>
              <th scope="col" id="col1">Id</th>
              <th scope="col" id="col2">Oficina</th>
              <th scope="col" id="col3">Tipo de manutenção</th>
              <th scope="col" id="col4">Descrição</th>
              <th scope="col" id="col5">Data da manutenção</th>
              <th scope="col" id="col6" class="text-center">Editar</th>
              <th scope="col" id="col7" class="text-center">Deletar</th>
          </thead>`;

  manutencoes.forEach((manutencao) => {
    tab += ` <tr>
                  <td scope="row">${manutencao.id}</td>
                  <td scope="row">${manutencao.oficina}</td>
                  <td scope="row">${manutencao.tipo_manutencao}</td>
                  <td scope="row" id="cargoscope">${manutencao.descricao}</td>
                  <td scope="row" id="statuscope">${manutencao.data_manutencao}</td>
                  <td scope="row" id="editLittleBtn" class="text-center"><!-- Button trigger modal -->
                  <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#editModal" id="ModalM${manutencao.id}">Editar
                  </button>
                  
                  <!-- Modal -->
                  <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Insira os novos dados</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="modalEditar">
                        </div>
                      </div>
                    </div>
                  </div></td>
                  <td scope="row" id="deletebtn" class="text-center"><button type="button" id="btnMdelete${manutencao.id}" class="btn btn-danger">Deletar</button></td>
              </tr>
          `;
  });

  document.getElementById("veiculos").innerHTML = tab;
}

// função para trocar o botão de adicionar veículo para adicionar manutenção
function trocaParaManutencao() {
  const botao = document.getElementById("btnAdicionarVeiculo");
  botao.innerHTML = "Adicionar";
  botao.id = "btnAdicionarManutencao";

  // Alterar o ID e o placeholder do campo de busca
  const inputBusca = document.getElementById("buscar");
  inputBusca.placeholder = "Buscar por nome da oficina";
}

// função para trocar o botão de adicionar manutenção para adicionar veículo novamente e o input busca
function trocaParaVeiculo() {
  const botao = document.getElementById("btnAdicionarManutencao");
  botao.innerHTML = "Adicionar";
  botao.id = "btnAdicionarVeiculo";

  // Alterar o ID e o placeholder do campo de busca
  const inputBusca = document.getElementById("buscar");
  inputBusca.placeholder = "Buscar por placa do veículo";
}

// Event listener para filtrar manutenções por nome da oficina
const inputBuscaManutencao = document.getElementById("buscarManutencao");
if (inputBuscaManutencao) {
  inputBuscaManutencao.addEventListener("input", () => {
    const termoPesquisa = inputBuscaManutencao.value.toLowerCase().trim();

    const manutencoesFiltradas = listaManutencoes.filter((manutencao) =>
      manutencao.nome_oficina.toLowerCase().includes(termoPesquisa)
    );

    showManutencoes(manutencoesFiltradas);
  });
}

// funcao para adicionar manutencao
document.addEventListener("click", function (event) {
  const idDoBotao = event.target.id;
  if (idDoBotao.includes("btnAdicionarManutencao")) {
    const modalAdicionar = document.getElementById("modalAdicionar");
    modalAdicionar.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="placa" class="form-label">Oficina</label>
                    <input type="text" class="form-control" id="oficinaAdicionar">
                    <p class="small text-danger" id="oficinaError"></p>
                </div>
                <div class="mb-3">
                    <label for="modelo" class="form-label">Tipo de manutenção</label>
                    <input type="text" class="form-control" id="tipoManutencaoAdicionar">
                    <p class="small text-danger" id="tipoError"></p>
                </div>
                <div class="mb-3">
                    <label for="ano" class="form-label">Descrição</label>
                    <input type="text" class="form-control" id="descricaoAdicionar">
                    <p class="small text-danger" id="descError"></p>
                </div>
                <div class="mb-3">
                    <label for="capacidadeCarga" class="form-label">Data da manutenção</label>
                    <input type="text" class="form-control" id="dataAdicionar">
                    <p class="small text-danger" id="dataError"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnSalvarAdicionar">Salvar</button>
                    <button type="button" class="d-none" data-bs-dismiss="modal" id="btnFecharM"></button>
                </div>
            </form>
        `;
        $('#dataAdicionar').mask('00/00/0000');

    document
      .getElementById("btnSalvarAdicionar")
      .addEventListener("click", function () {
        const AddOficina = document.getElementById("oficinaAdicionar").value;
        if(AddOficina == '') {
          document.getElementById("oficinaError").innerHTML = "Por favor, digite uma oficina válida";
          return;
        }
        else {
          document.getElementById("oficinaError").innerHTML = "";
        }

        const AddTipoManutencao = document.getElementById("tipoManutencaoAdicionar").value;
        if(AddTipoManutencao == '') {
          document.getElementById("tipoError").innerHTML = "Por favor, digite um tipo de manutenção válido";
          return;
        }
        else {
          document.getElementById("tipoError").innerHTML = "";
        }

        const AddDescricao = document.getElementById("descricaoAdicionar").value;
        if(AddDescricao == '') {
          document.getElementById("descError").innerHTML = "Por favor, digite uma descrição válida";
          return;
        }
        else {
          document.getElementById("descError").innerHTML = "";
        }

        const AddData = document.getElementById("dataAdicionar").value;
        if(AddData.length != 10 || !isValidDate(AddData) || compareYearWithCurrent(AddData.substring(6))) {
          document.getElementById("dataError").innerHTML = "Por favor, digite uma data válida";
          return;
        }
        const veiculo = achaVeiculo(listaVeiculo, placaVeiculoSelecionado);

        const AddManutencao = {
          veiculo: veiculo, // Adiciona a placa do veículo ao objeto de manutenção
          oficina: AddOficina,
          tipo_manutencao: AddTipoManutencao,
          descricao: AddDescricao,
          data_manutencao: AddData,
        };

        fetch("http://localhost:8080/manutencao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(AddManutencao),
        })
          .then((response) => response.json())
          .then((data) => {
            document.getElementById("btnFecharM").click();
            console.log(data);
            getAllM(placaVeiculoSelecionado);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }
});

function achaVeiculo(listaVeiculo, placaVeiculoSelecionado) {
  for (let i = 0; i < listaVeiculo.length; i++) {
    if (listaVeiculo[i].placa === placaVeiculoSelecionado) {
      return listaVeiculo[i];
    }
  }
  return null; // Caso o veículo não seja encontrado
}

// funcao para deletar manutencao
async function deletarManutencao(idDaManutencao) {
  try {
    var resposta = window.confirm("Deseja realmente deletar a manutenção?");
    if (resposta) {
      const response = await fetch(
        `http://localhost:8080/manutencao/${idDaManutencao}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Erro ao deletar manutenção: ${response.status} ${response.statusText}`
        );
      }
      // Atualiza a lista de manutenções após a exclusão
      await getAllM(placaVeiculoSelecionado);
    }
  } catch (error) {
    console.error(error);
  }
}

// Adiciona um event listener apenas uma vez para todos os botões de deletar manutenção
document.addEventListener("click", function (event) {
  const idDoBotao = event.target.id;
  const idDaManutencao = idDoBotao.substring(10); // Assume que o idDoBotao está no formato btnMdelete{idDaManutencao}

  if (idDoBotao.startsWith("btnMdelete")) {
    deletarManutencao(idDaManutencao);
  }
});

// funcao para editar manutencao
document.addEventListener("click", function (event) {
  const idDoBotao = event.target.id;
  const idDaManutencao = idDoBotao.substring(6);
    if (idDoBotao.includes("ModalM")) {
      const manutencao = listaManutencoes.find(
        (manutencao) => manutencao.id == idDaManutencao
      );
      if (manutencao) {
        var modalEditar = document.getElementById("modalEditar");
        modalEditar.innerHTML = `
                    <form class="text-start">
                        <div class="mb-3">
                            <label for="carga" class="form-label">Oficina</label>
                            <input type="text" class="form-control" id="oficinaEditar" value="${manutencao.oficina}">
                            <p class="small text-danger" id="oficinaErro"></p>
                        </div>
                        <div class="mb-3">
                            <label for="carga" class="form-label">Tipo de Manutenção</label>
                            <input type="text" class="form-control" id="tipoManutencaoEditar" value="${manutencao.tipo_manutencao}">
                            <p class="small text-danger" id="tipoErro"></p>
                        </div>
                        <div class="mb-3">
                            <label for="carga" class="form-label">Descrição</label>
                            <input type="text" class="form-control" id="descricaoEditar" value="${manutencao.descricao}">
                            <p class="small text-danger" id="descErro"></p>
                        </div>
                        <div class="mb-3">
                            <label for="carga" class="form-label">Data da manutenção</label>
                            <input type="text" class="form-control" id="dataManutencaoEditar" value="${manutencao.data_manutencao}">
                            <p class="small text-danger" id="dataMErro"></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" id="btnSalvaM${manutencao.id}">Salvar</button>
                            <button type="button" class="d-none" data-bs-dismiss="modal" id="btnFecharME"></button>
                        </div>
                    </form>
                `;
    }

      document
        .getElementById(`btnSalvaM${manutencao.id}`)
        .addEventListener("click", function () {
          const novaOficina = document.getElementById("oficinaEditar").value;
          if(novaOficina == '') {
            document.getElementById("oficinaErro").innerHTML = "Por favor, digite uma oficina válida";
            return;
          }
          else {
            document.getElementById("oficinaErro").innerHTML = "";
          }

          const novoTipoManutencao = document.getElementById("tipoManutencaoEditar").value;
          if(novoTipoManutencao == '') {
            document.getElementById("tipoErro").innerHTML = "Por favor, digite um tipo de manutenção válido";
            return;
          }
          else {
            document.getElementById("tipoErro").innerHTML = "";
          }

          const novaDescricao = document.getElementById("descricaoEditar").value;
          if(novaDescricao == '') {
            document.getElementById("descErro").innerHTML = "Por favor, digite uma descrição válida";
            return;
          }
          else {
            document.getElementById("descErro").innerHTML = "";
          }

          const novaData = document.getElementById("dataManutencaoEditar").value;
          if(novaData.length != 10 || !isValidDate(novaData) || compareYearWithCurrent(novaData.substring(6))) {
            document.getElementById("dataMErro").innerHTML = "Por favor, digite uma data válida";
            return;
          }
          else {
            document.getElementById("dataMErro").innerHTML = "";
          }

          const novaManutencao = {
            id : manutencao.id,
            oficina : novaOficina,
            tipo_manutencao : novoTipoManutencao,
            descricao : novaDescricao,
            data_manutencao : novaData
          };
          fetch(`http://localhost:8080/manutencao/${manutencao.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(novaManutencao),
          })
            .then((response) => response.json())
            .then((data) => {
              document.getElementById("btnFecharME").click();
              getAllM(placaVeiculoSelecionado);
            })
            .catch((error) => {
              console.error(error);
            });
        });
    }

});

// Método que renderiza tudo relacionado às manutenções
function carregarManutencoes(placa) {
  getAllM(placa);
  exibeBtns();
  trocaParaManutencao();
}

function adicionarBotaoMediaManutencoes() {
  const voltarContainer = document.getElementById("indice");
  voltarContainer.innerHTML += `
    <button id="mediaManutencoes" class="btn btn-dark w-100" type="button">Média de Manutenções Corretivas</button>
  `;

  document
    .getElementById("mediaManutencoes")
    .addEventListener("click", function () {
      exibirModalMediaManutencoes();
    });
}

// Função para calcular a média de manutenções corretivas
function calcularMediaManutencoesCorretivas() {
  let totalMCorretivas = 0;
  const manutencoesPorAno = {};

  listaManutencoes.forEach((manutencao) => {
    if (manutencao.tipo_manutencao.toLowerCase() === "corretiva") {
      totalMCorretivas++;

      // Obter o ano da manutenção (últimos 4 caracteres do campo data_manutencao)
      const ano = manutencao.data_manutencao.substring(
        manutencao.data_manutencao.length - 4
      );

      // Incrementar o contador de manutenções corretivas para o ano correspondente
      if (!manutencoesPorAno[ano]) {
        manutencoesPorAno[ano] = 0;
      }
      manutencoesPorAno[ano]++;
    }
  });

  // Calcular a média de manutenções corretivas por ano
  const anosDistintos = Object.keys(manutencoesPorAno).length;
  let mediaCorretivasPorAno = totalMCorretivas / anosDistintos;

  return { totalMCorretivas, manutencoesPorAno, mediaCorretivasPorAno };
}

// Função para exibir a média de manutenções corretivas em um modal
function exibirModalMediaManutencoes() {
  const { totalMCorretivas, manutencoesPorAno, mediaCorretivasPorAno } =
    calcularMediaManutencoesCorretivas();

  const modalContent = `
    <div class="modal fade" id="mediaManutencoesModal" tabindex="-1" aria-labelledby="mediaManutencoesModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="mediaManutencoesModalLabel">Média de Manutenções Corretivas em ${
              Object.keys(manutencoesPorAno).length
            } anos</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Total de Manutenções Corretivas: ${totalMCorretivas}</p>
            <ul>
              ${Object.keys(manutencoesPorAno)
                .map(
                  (ano) =>
                    `<li>Ano ${ano}: ${manutencoesPorAno[ano]} manutenção/ões</li>`
                )
                .join("")}
            </ul>
            <p>Média de Manutenções Corretivas em ${
              Object.keys(manutencoesPorAno).length
            } ano(s): ${mediaCorretivasPorAno}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Inserir o modal no documento
  document.body.insertAdjacentHTML("beforeend", modalContent);

  // Mostrar o modal
  const mediaManutencoesModal = new bootstrap.Modal(
    document.getElementById("mediaManutencoesModal")
  );
  mediaManutencoesModal.show();
}

function compareYearWithCurrent(yearString) {
  // Obtenha o ano atual
  var currentYear = new Date().getFullYear();
  
  // Converta a string do ano para um número
  var year = parseInt(yearString, 10);
  
  // Compare os anos
  if (year > (currentYear + 1)) {
      return true;
  } 
  return false;
}

function convertLong(peso){
  // Remove os pontos e substitui a vírgula por ponto
  let valorNumerico = peso.replace(/\./g, '').replace(',', '.');

  // Converte para número de ponto flutuante
  peso = parseInt(valorNumerico);
  return peso;
}

function isValidDate(dateString) {
  // Verifica se a string está no formato 'dd/mm/yyyy'
  let regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateString.match(regex)) return false;

  // Dividir a string e verificar se a data é válida
  let parts = dateString.split('/');
  let day = parseInt(parts[0], 10);
  let month = parseInt(parts[1], 10) - 1; // Meses são indexados em 0
  let year = parseInt(parts[2], 10);

  // Criar um objeto Date
  let date = new Date(year, month, day);

  // Verificar se o objeto Date é válido e se os componentes batem
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return false;
  }
  return true;
}
