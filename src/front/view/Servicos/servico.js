const URL = 'http://localhost:8080/servico';
const URLFuncionarios = 'http://localhost:8080/Funcionario';
const URLVeiculos = 'http://localhost:8080/veiculo';
var listaServicos = [];
var listaFuncionarios = [];
var tipo = '';

function funcionariosDisponiveis(funcionarios) {
  var tem = false;
  for (let funcionario of funcionarios) {
    if (funcionario.servicoAtual == null) {
      tem = true;
    }
  }
  return tem;
}

function veiculosDisponiveis(veiculos) {
  var tem = false;
  for (let veiculo of veiculos) {
    if (veiculo.servicoAtual == null) {
      tem = true;
    }
  }
  return tem;
}

//FUNCAO PARA FINALIZAR SERVIÇO
document.addEventListener('click', function (event) {
  const idBotao = event.target.id;
  if (idBotao.includes("btnFinalizar")) {
    var resposta = window.confirm("Tem certeza que deseja finalizar o serviço?");
    if (resposta) {
      const idServico = idBotao.replace(/[^\d]/g, "");
      const servico = listaServicos.find(servico => servico.id == idServico);
      if (servico) {
        const novoServico = {
          id: idServico,
          nomeCliente: servico.nomeCliente,
          endereco: servico.endereco,
          dataAgendamento: servico.dataAgendamento,
          previsaoTermino: servico.previsaoTermino,
          dataTermino: new Date().toLocaleDateString(),
          valor: servico.valor,
          descricao: servico.descricao,
          funcionarios: servico.funcionarios,
          veiculos: servico.veiculos
        };
        fetch(URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(novoServico)
        })
          .then(response => response.json())
          .then(data => {
            document.getElementById('cards').innerHTML = '';
            getAPI(URL);
          })
          .catch(error => {
            console.error(error);
          });
      }

      for (let funcionario of listaFuncionarios) {
        if (funcionario.servicoAtual != null && funcionario.servicoAtual.id == idServico) {
          funcionario.servicoAtual = null;
          fetch(URLFuncionarios, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(funcionario)
          })
            .then(response => response.json())
            .then(data => {

            })
            .catch(error => {
              console.error(error);
            });
        }
      }

      for (let veiculo of listaVeiculos) {
        if (veiculo.servicoAtual != null && veiculo.servicoAtual.id == idServico) {
          veiculo.servicoAtual = null;
          fetch(URLVeiculos + "/" + veiculo.placa, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(veiculo)
          })
            .then(response => response.json())
            .then(data => {
              getVeiculos(URLVeiculos);
            })
            .catch(error => {
              console.error(error);
            });
        }
      }
    }
  }
});

//FUNÇÃO PARA EXIBIR OS CARDS NA TELA
function exibeCard(listaServicos) {
  getFuncionarios(URLFuncionarios);
  getVeiculos(URLVeiculos);
  var card = document.getElementById('cards');
  card.innerHTML = '';
  if(listaServicos.length == 0){
    card.innerHTML = `<h2 class="text-center">Nenhum serviço cadastrado ate o momento!</h2>`;
    return;
  }
  for (let servico of listaServicos) {
    motorista = "Sem motorista";
    for (let funcionario of servico.funcionarios) {
      if (funcionario.cargo === "Motorista") {
        let partesDoNome = funcionario.username.split(" ");
        motorista = partesDoNome[0] + " " + partesDoNome[1];
      }
    }
    card.innerHTML += ` 
      <div class=" col-12 col-md-6 col-lg-4  ">
        <div class="card mb-4 rounded-3 shadow-sm ">
          <div class="card-header bg-dark text-light">
              <h4 class="my-0 fw-normal">Serviço ${servico.id}</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-2">
              <li class="border-bottom "><p class="tamanhoTexto" ><b>Nome:</b> ${servico.nomeCliente}</p></li>
              <li class="border-bottom "><p class="tamanhoTexto" ><b>Endereco:</b> ${servico.endereco}</p></li>
              <li class="border-bottom mt-2"><p class="tamanhoTexto" ><b>Agendamento:</b> ${servico.dataAgendamento}</p></li>
              <li class="border-bottom mt-2"><p class="tamanhoTexto" ><b>Previsão:</b> ${servico.previsaoTermino}</p></li>
              <li class="border-bottom mt-2"><p class="tamanhoTexto" ><b>Termino:</b> ${servico.dataTermino}</p></li>
              <li class="border-bottom mt-2"><b class="tamanhoTexto">Valor:</b> <p id="exibeValor${servico.id}" class="tamanhoTexto d-inline-block"></p></li>
              <li class="border-bottom mt-2"><p class="tamanhoTexto d-inline-block" ><b>Motoristas:</b> </p>
                <div id="addMotoristas${servico.id}" class="d-inline-block">
                </div>
              </li>
              <li class="border-bottom mt-2"><p class="tamanhoTexto d-inline-block" ><b>Ajudantes:</b> </p>
                <div id="addAjudantes${servico.id}" class="d-inline-block">
                </div>
              </li>
              <li class="border-bottom mt-2"><p class="tamanhoTexto d-inline-block" ><b>Veiculos:</b> </p>
                <div id="addVeiculos${servico.id}" class="d-inline-block">
                </div>
              </li>
            </ul>
            <div>
              <div class="d-flex justify-content-center align-content-center" id="botoes${servico.id}">
                <button type="button" class="w-50 btn btn-dark me-2" id="btnModal${servico.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                <button type="button" class="w-50 btn btn-success ms-2" id="btnFinalizar${servico.id}">Finalizar</button>
              </div>
              
              <!-- Modal -->
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Dados do Servico</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="dadosModal">
                      ...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    let formatoReal = servico.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    document.getElementById(`exibeValor${servico.id}`).innerText = formatoReal;

    for (let funcionario of servico.funcionarios) {
      if (funcionario.cargo === "Ajudante") {
        let partesDoNome = funcionario.username.split(" ");
        document.getElementById(`addAjudantes${servico.id}`).innerHTML += `
          <p class="tamanhoTexto d-inline-block" >${partesDoNome[0]} ${partesDoNome[1]},</p>
        `
      }
      else if (funcionario.cargo === "Motorista") {
        let partesDoNome = funcionario.username.split(" ");
        document.getElementById(`addMotoristas${servico.id}`).innerHTML += `
          <p class="tamanhoTexto d-inline-block" >${partesDoNome[0]} ${partesDoNome[1]},</p>
        `
      }
    }

    for (let veiculo of servico.veiculos) {
      document.getElementById(`addVeiculos${servico.id}`).innerHTML += `
        <p class="tamanhoTexto d-inline-block" >${veiculo.modelo} - ${veiculo.placa},</p>
      `
    }

    if (servico.dataTermino != '') {
      document.getElementById(`botoes${servico.id}`).innerHTML = `<button type="button" class="w-50 btn btn-success ms-2 disabled" id="btnModal${servico.id}">Finalizado</button>`;
    }
  }
}

//ADICIONA UM SERVICO
document.addEventListener('click', function (event) {
  const idBotao = event.target.id;
  if (idBotao.includes("adicionarServ")) {
    tipo = 'adicionar';
    var modal = document.getElementById("dadosAdicionar");
    modal.innerHTML = `
    <form>
      <div class="mb-3">
        <label for="nomeCliente" class="form-label">Nome do Cliente:</label>
        <input type="text" class="form-control" id="nomeCliente">
        <p class="text-danger small" id="nomeClienteError"></p>
      </div>
      <div class="mb-3">
        <label for="endereco" class="form-label">Endereco:</label>
        <input type="text" class="form-control" id="endereco">
        <p class="text-danger small" id="enderecoError"></p>
      </div>
      <div class="mb-3">
          <label for="valor" class="form-label">Valor:</label>
          <input type="text" placeholder="R$ 0,00" class="form-control" id="valor" >
          <p class="text-danger small" id="valorError"></p>
      </div>
      <div class="mb-3">
          <label for="agendamento" class="form-label">Agendamento:</label>
          <input type="text" class="form-control" id="agendamento" >
          <p class="text-danger small" id="agendamentoError"></p>
      </div>
      <div class="mb-3">
          <label for="previsao" class="form-label">Previsao de Termino:</label>
          <input type="text" class="form-control" id="previsao" >
          <p class="text-danger small" id="previsaoError"></p>
      </div>
      <div class="mb-3">
          <label for="termino" class="form-label">Conclusão:</label>
          <input type="text" class="form-control" id="termino" >
          <p class="text-danger small" id="terminoError"></p>
      </div>
      <div class="mb-3">
          <label for="descricao" class="form-label">Descrição:</label>
          <input type="text" class="form-control" id="descricao" >
          <p class="text-danger small" id="descricaoError"></p>
      </div>
      <div class="mb-3">
        <label for="motoristas" class="form-label">Motoristas:</label>
        <select name="motoristas" id="motoristasA" multiple>
          
        </select>
        <p class="text-danger small" id="motoristaError"></p>
      </div>
      <div class="mb-3 ">
        <label for="ajudantes" class="form-label ">Ajudantes:</label>
        <select name="ajudantes" id="ajudantesA" multiple>
          
        </select>
        <p class="text-danger small" id="ajudanteError"></p>
      </div>
      <div class="mb-3 ">
        <label for="veiculos" class="form-label ">Veiculos:</label>
        <select name="veiculos" id="veiculosA" multiple>
          
        </select>
        <p class="text-danger small" id="veiculoError"></p>
      </div>
      <p class="text-danger small" id="preencha"></p>
      <div class="modal-footer">
        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" id="salvarNovo">Salvar</button>
        <button type="button" class="btn btn-dark d-none" id="fechaAdicionar" data-bs-dismiss="modal"></button>
      </div>
    </form>        
    `
    // Aplicar a máscara aos inputs de data
    $('#agendamento').mask('00/00/0000');
    $('#previsao').mask('00/00/0000');
    $('#termino').mask('00/00/0000');
    $('#valor').mask('000.000.000.000.000,00', { reverse: true });

    exibeFuncionariosA(listaFuncionarios);
    exibeVeiculosA(listaVeiculos);
    new MultiSelectTag('motoristasA')
    new MultiSelectTag('ajudantesA')
    new MultiSelectTag('veiculosA')


    document.getElementById(`salvarNovo`).addEventListener("click", function () {
      if (!funcionariosDisponiveis(listaFuncionarios)) {
        document.getElementById("preencha").innerText = "Capacidade operacional insuficiente";
        return;
      }
      if (!veiculosDisponiveis(listaVeiculos)) {
        document.getElementById("preencha").innerText = "Capacidade operacional insuficiente";
        return;
      }

      const nomeCliente = document.getElementById("nomeCliente").value;
      if(nomeCliente == ""){document.getElementById("nomeClienteError").innerText = "Preencha o nome do cliente"; return;}else{document.getElementById("nomeClienteError").innerText = "";}

      const endereco = document.getElementById("endereco").value;
      if(endereco == ""){document.getElementById("enderecoError").innerText = "Preencha o endereço"; return;}else{document.getElementById("enderecoError").innerText = ""}

      var valor = document.getElementById("valor").value.replace(/\./g, '').replace(',', '.');
      if(valor == ""){document.getElementById("valorError").innerText = "Preencha o valor"; return;}else{document.getElementById("valorError").innerText = "";}
      valor = parseFloat(valor);
    
      const agendamento = document.getElementById("agendamento").value;
      if(isValidDate(agendamento) == false) {document.getElementById("agendamentoError").innerText = "Por favor, preencha com uma data valida";return;} else{document.getElementById("agendamentoError").innerText = "";}
      
      const previsao =  document.getElementById("previsao").value;
      if(isValidDate(previsao) == false) {document.getElementById("previsaoError").innerText = "Por favor, preencha com uma data valida";return;} else{document.getElementById("previsaoError").innerText = "";}

      const termino = document.getElementById("termino").value;
      if(isValidDate(termino) == false && termino != "") {document.getElementById("terminoError").innerText = "Por favor, preencha com uma data valida ou vazia";return;} else{document.getElementById("terminoError").innerText = "";}
      
      const descricao = document.getElementById("descricao").value;
      if(descricao == ""){document.getElementById("descricaoError").innerText = "Preencha a descrição"; return;}else{document.getElementById("descricaoError").innerText = "";}

      const motoristas = getSelectedMotoristas();
      if (motoristas.length == 0) {
        document.getElementById("motoristaError").innerText = "Selecione ao menos um motorista";
        return;
      }
      else{
        document.getElementById("motoristaError").innerText = "";
      }

      const ajudantes = getSelectedAjudantes();
      if (ajudantes.length == 0) {
        document.getElementById("ajudanteError").innerText = "Selecione ao menos um ajudante";
        return;
      }
      else{
        document.getElementById("ajudanteError").innerText = "";
      }

      const veiculos = getSelectedVeiculos();
      if (veiculos.length == 0) {
        document.getElementById("veiculoError").innerText = "Selecione ao menos um veículo";
        return;
      }
      else{
        document.getElementById("veiculoError").innerText = "";
      }

      if(veiculos.length > motoristas.length){
        document.getElementById("motoristaError").innerText = "Quantidade de motoristas insuficiente";
        return;
      }
      else{
        document.getElementById("motoristaError").innerText = "";
      }

      if(motoristas.length > veiculos.length){
        document.getElementById("veiculoError").innerText = "Quantidade de veiculos insuficiente";
        return;
      }
      else{
        document.getElementById("veiculoError").innerText = "";
      }

      let dataAgendamento = parseDate(agendamento);
      let dataPrevisao = parseDate(previsao);
      let dataTermino = parseDate(termino);

      if(dataAgendamento > dataPrevisao) {
        document.getElementById("previsaoError").innerText = "O agendamento não pode ser depois que a data de previsão";
        return;
      }
      else{document.getElementById("previsaoError").innerText = "";}

      if(dataAgendamento > dataTermino){
        document.getElementById("terminoError").innerText = "O agendamento não pode ser apos a data de termino";
        return;
      }
      else{document.getElementById("terminoError").innerText = "";        
      }

      const funcionarios = motoristas.concat(ajudantes);
                
      const novoServico = {
          endereco: endereco,
          nomeCliente: nomeCliente,
          dataAgendamento: agendamento,
          previsaoTermino: previsao,
          dataTermino: termino,
          valor: valor,
          descricao: descricao,
          funcionarios: funcionarios,
          veiculos: veiculos
      };

      
      fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoServico)
      })
      .then(response => response.json())
      .then(data => {
        if(data.dataTermino == '') {
          for(let funcionario of funcionarios) {
            funcionario.servicoAtual = data;
            modificaFuncionario(funcionario);
          }
  
          for(let veiculo of veiculos) {
            veiculo.servicoAtual = data;
            modificaVeiculo(veiculo);
          }
        }
        window.alert("Serviço adicionado com sucesso");
        document.getElementById('fechaAdicionar').click();
        getFuncionarios(URLFuncionarios);
        getVeiculos(URLVeiculos);
        getAPI(URL);
      })
      .catch(error => {
        console.error(error);
      });
    });
  }
});

//EDITA OS DADOS DO SERVIÇO
document.addEventListener('click', function (event) {
  const idBotao = event.target.id;
  const idServico = idBotao.replace(/[^\d]/g, "");
  if (idBotao.includes("btnModal") || idBotao.includes("salvar")) {
    if (idBotao.includes("btnModal")) {
      const servico = listaServicos.find(servico => servico.id == idServico);
      if (servico) {
        tipo = 'editar';
        var modal = document.getElementById("dadosModal");
        modal.innerHTML = `
        <form>
          <fieldset disabled>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">Número do Serviço:</label>
              <input type="text" class="form-control" placeholder="${servico.id}">
            </div>
          </fieldset>
          <div class="mb-3">
            <label for="nomeEditar" class="form-label">Nome do Cliente::</label>
            <input type="text" class="form-control" id="nomeEditar" value="${servico.nomeCliente}">
            <p class="text-danger small" id="nomeErro"></p>
          </div>
          <div class="mb-3">
            <label for="enderecoEditar" class="form-label">Endereço:</label>
            <input type="text" class="form-control" id="enderecoEditar" value="${servico.endereco}">
            <p class="text-danger small" id="enderecoErro"></p>
          </div>
          <div class="mb-3">
            <label for="valorEditar" class="form-label">Valor:</label>
            <input type="text" class="form-control" id="valorEditar" value="">
            <p class="text-danger small" id="valorErro"></p>
          </div>
          <div class="mb-3">
              <label for="agendamentoEditar" class="form-label">Agendamento:</label>
              <input type="text" class="form-control" id="agendamentoEditar" value="${servico.dataAgendamento}">
              <p class="text-danger small" id="agendamentoErro"></p>
          </div>
          <div class="mb-3">
              <label for="previsaoEditar" class="form-label">Previsão de termino:</label>
              <input type="text" class="form-control" id="previsaoEditar" value="${servico.previsaoTermino}">
              <p class="text-danger small" id="previsaoErro"></p>
          </div>
          <div class="mb-3">
              <label for="terminoEditar" class="form-label">Termino:</label>
              <input type="text" class="form-control" id="terminoEditar" value="${servico.dataTermino}">
              <p class="text-danger small" id="terminoErro"></p>
          </div>
          <div class="mb-3">
              <label for="descricaoEditar" class="form-label">Descrição:</label>
              <input type="text" class="form-control" id="descricaoEditar" value="${servico.descricao}">
              <p class="text-danger small" id="descricaoErro"></p>
          </div>
          <div class="mb-3">
              <label for="motoristas" class="form-label">Motorista:</label>
              <select name="motoristas" id="motoristasE" multiple>

              </select>
              <p class="text-danger small" id="motoristaErro"></p>
          </div>
          <div class="mb-3">
            <label for="ajudantes" class="form-label ">Ajudantes:</label>
            <select id="ajudantesE" multiple>
              
            </select>
            <p class="text-danger small" id="ajudanteErro"></p>
          </div>
          <div class="mb-3">
            <label for="veiculos" class="form-label ">Veiculos:</label>
            <select id="veiculosE" multiple>
              
            </select>
            <p class="text-danger small" id="veiculoErro"></p>
          </div>
          <p class="text-danger small" id="editarError"></p>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="excluir${servico.id}">Excluir</button>
            <button type="button" class="btn btn-success"  id="salvar${servico.id}">Salvar</button>
            <button type="button" class="btn btn-dark d-none" id="fechaEditar" data-bs-dismiss="modal"></button>
          </div>
        </form>
        `
        // Aplicar a máscara aos inputs de data
        $('#agendamentoEditar').mask('00/00/0000');
        $('#terminoEditar').mask('00/00/0000');
        $('#valorEditar').mask('000.000.000.000.000,00', { reverse: true });
        document.getElementById('valorEditar').value = servico.valor;

        exibeFuncionariosE(listaFuncionarios, idServico);
        exibeVeiculosE(listaVeiculos, idServico);

        new MultiSelectTag('motoristasE')
        new MultiSelectTag('ajudantesE')
        new MultiSelectTag('veiculosE')

        var funcionariosAntigos = []
        var veiculosAntigos = []

        for (let funcionario of listaFuncionarios) {
          if(funcionario.servicoAtual != null && funcionario.servicoAtual.id == idServico){
            funcionariosAntigos.push(funcionario);
          }
        }

        for (let veiculo of listaVeiculos) {
          if(veiculo.servicoAtual != null && veiculo.servicoAtual.id == idServico){
            veiculosAntigos.push(veiculo);
          }
        }

        document.getElementById(`salvar${idServico}`).addEventListener("click", function () {
          
          const novoNome = document.getElementById("nomeEditar").value;
          if(novoNome == ""){document.getElementById("nomeErro").innerText = "Preencha o nome do cliente"; return;}else{document.getElementById("nomeErro").innerText = "";}

          const novoEndereco = document.getElementById("enderecoEditar").value;
          if(novoEndereco == ""){document.getElementById("enderecoErro").innerText = "Preencha o endereço"; return;}else{document.getElementById("enderecoErro").innerText = "";}

          const novoAgendamento = document.getElementById("agendamentoEditar").value;
          if(isValidDate(novoAgendamento) == false) {document.getElementById("agendamentoErro").innerText = "Por favor, preencha com uma data valida";return;} else{document.getElementById("agendamentoErro").innerText = "";}

          const novoPrevisao = document.getElementById("previsaoEditar").value;
          if(isValidDate(novoPrevisao) == false) {document.getElementById("previsaoErro").innerText = "Por favor, preencha com uma data valida";return;} else{document.getElementById("previsaoErro").innerText = "";}

          const novoTermino = document.getElementById("terminoEditar").value;
          if(isValidDate(novoTermino) == false && novoTermino != "") {document.getElementById("terminoErro").innerText = "Por favor, preencha com uma data valida ou vazia";return;} else{document.getElementById("terminoErro").innerText = "";}

          const novoDescricao = document.getElementById("descricaoEditar").value;
          if(novoDescricao == ""){document.getElementById("descricaoErro").innerText = "Preencha a descrição"; return;}else{document.getElementById("descricaoErro").innerText = "";}

          var novoValor = document.getElementById("valorEditar").value.replace(/\./g, '').replace(',', '.');
          if(novoValor == ""){document.getElementById("valorErro").innerText = "Preencha o valor"; return;}else{document.getElementById("valorErro").innerText = "";}
          novoValor = parseFloat(novoValor);
          if(novoValor == 0){document.getElementById("valorErro").innerText = "O valor deve ser maior que zero"; return;}
          
          const motoristas = getSelectedMotoristas();
          if (motoristas.length == 0) {
            document.getElementById("motoristaErro").innerText = "Selecione ao menos um motorista";
            return;
          }
          else{
            document.getElementById("motoristaErro").innerText = "";
          }

          const ajudantes = getSelectedAjudantes();
          if (ajudantes.length == 0) {
            document.getElementById("ajudanteErro").innerText = "Selecione ao menos um ajudante";
            return;
          }
          else{
            document.getElementById("ajudanteErro").innerText = "";
          }

          const veiculos = getSelectedVeiculos();
          if (veiculos.length == 0) {
            document.getElementById("veiculoErro").innerText = "Selecione ao menos um veículo";
            return;
          }
          else{
            document.getElementById("veiculoErro").innerText = "";
          }

          if(veiculos.length > motoristas.length){
            document.getElementById("motoristaErro").innerText = "Quantidade de motoristas insuficiente";
            return;
          }
          else{
            document.getElementById("motoristaErro").innerText = "";
          }

          if(motoristas.length > veiculos.length){
            document.getElementById("veiculoErro").innerText = "Quantidade de veiculos insuficiente";
            return;
          }
          else{
            document.getElementById("veiculoErro").innerText = "";
          }

          let dataAgendamento = parseDate(novoAgendamento);
          let dataPrevisao = parseDate(novoPrevisao);
          let dataTermino = parseDate(novoTermino);

          if(dataAgendamento > dataPrevisao) {
            document.getElementById("previsaoErro").innerText = "O agendamento não pode ser depois que a data de previsão";
            return;
          }
          else{document.getElementById("previsaoErro").innerText = "";}

          if(dataAgendamento > dataTermino){
            document.getElementById("terminoErro").innerText = "O agendamento não pode ser apos a data de termino";
            return;
          }
          else{document.getElementById("terminoErro").innerText = "";        
          }

          const funcionarios = motoristas.concat(ajudantes);

          //REMOVE OS FUNCIONARIOS ANTIGOS
          for (let funcionario of funcionariosAntigos) {
            funcionario.servicoAtual = null;
            modificaFuncionario(funcionario);
            console.log(`${funcionario.username} foi removido do serviço`);
          }

          //REMOVE OS VEICULOS ANTIGOS
          for (let veiculo of veiculosAntigos) {
            veiculo.servicoAtual = null;
            modificaVeiculo(veiculo);
            console.log(`${veiculo.modelo} - ${veiculo.placa} foi removido do serviço`);
          }

          //SERVICO ATUALIZADO
          const novoServico = {
            id: idServico,
            nomeCliente: novoNome,
            endereco: novoEndereco,
            nomeCliente: novoNome,
            dataAgendamento: novoAgendamento,
            previsaoTermino: novoPrevisao,
            dataTermino: novoTermino,
            descricao: novoDescricao,
            valor: novoValor,
            funcionarios: funcionarios,
            veiculos: veiculos
          };

          fetch(URL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(novoServico)
          })
            .then(response => response.json())
            .then(data => {
              document.getElementById('fechaEditar').click();
              document.getElementById('cards').innerHTML = '';
              getFuncionarios(URLFuncionarios);
              getVeiculos(URLVeiculos);
              getAPI(URL);
            })
            .catch(error => {
              console.error("Erro ao editar os dados do serviço: ", error);
            })

          //ADICIONA OS NOVOS FUNCIONARIOS
          for (let funcionario of funcionarios) {
            funcionario.servicoAtual = servico;
            modificaFuncionario(funcionario);
            console.log(`${funcionario.username} foi adicionado ao serviço`);
          }

          //ADICIONA OS NOVOS VEICULOS
          for (let veiculo of veiculos) {
            veiculo.servicoAtual = servico;
            modificaVeiculo(veiculo);
            console.log(`${veiculo.modelo} - ${veiculo.placa} foi adicionado ao serviço`);
          }
        });
        


        document.getElementById(`excluir${idServico}`).addEventListener("click", function () {
          var resposta = window.confirm("Tem certeza que deseja excluir o serviço?");
          if (resposta) {

            fetch(URL + "/" + idServico, {
              method: "DELETE",
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Deu Biziu em alguma coisa na hora de apagar no banco de dados');
                }
                var funcionariosServico = listaFuncionarios.filter(funcionario => funcionario.servicoAtual != null && funcionario.servicoAtual.id == idServico);
                if (funcionariosServico.length > 0) {
                  for (let funcionario of funcionariosServico) {
                    funcionario.servicoAtual = null;
                    modificaFuncionario(funcionario);
                  }
                }
                var veiculosServico = listaVeiculos.filter(veiculo => veiculo.servicoAtual != null && veiculo.servicoAtual.id == idServico);
                if (veiculosServico.length > 0) {
                  for (let veiculo of veiculosServico) {
                    veiculo.servicoAtual = null;
                    modificaVeiculo(veiculo);
                  }
                }

                document.getElementById('cards').innerHTML = '';
                getAPI(URL);
              })
              .catch(error => {
                console.error("Ocorreu um erro: ", error);
              });
          }
        });
      }
    }
  }
});

//BUSCAR FUNCIONARIO POR ID
function buscarFuncionario(idFuncionario) {
  return listaFuncionarios.find(funcionario => funcionario.id == idFuncionario);
}

//BUSCAR VEICULO POR PLACA
function buscarVeiculo(placa) {
  return listaVeiculos.find(veiculo => veiculo.placa == placa);
}

//FUNÇÂO PARA MODIFICAR UM FUNCIONARIO
function modificaFuncionario(funcionario) {
  fetch(URLFuncionarios, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(funcionario)
  })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
      console.error(error);
    });
}

//FUNÇÂO PARA MODIFICAR UM VEICULO
function modificaVeiculo(veiculo) {
  fetch(URLVeiculos + "/" + veiculo.placa, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(veiculo)
  })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
      console.error(error);
    });

}

//FUNÇÃO PARA BUSCAR SERVIÇO POR ID
document.getElementById('procurar').addEventListener('click', function () {
  var nomeBusca = document.getElementById('buscar').value;
  if (nomeBusca === '') {
    document.getElementById('cards').innerHTML = '';
    getAPI(URL);
    return;
  }
  else {
    nomeBusca = nomeBusca.toLowerCase();
    var servicoEncontrado = [];
    for (let servico of listaServicos) {
      if (servico.nomeCliente.toLowerCase() == nomeBusca.toLowerCase()) {
        servicoEncontrado.push(servico);
      }
    }
    if (servicoEncontrado.length == 0) {
      document.getElementById('buscar').value = '';
      window.alert("Serviço não encontrado");
      exibeCard(listaServicos);
    }
    else {
      document.getElementById('buscar').value = '';
      exibeCard(servicoEncontrado);
    }
  }
});

getAPI(URL);

//FUNÇÃO PARA PEGAR OS DADOS DA API
async function getAPI(URL) {
  const response = await fetch(URL, { method: 'GET' });
  getFuncionarios(URLFuncionarios);
  getVeiculos(URLVeiculos);

  listaServicos = await response.json();
  if (response.status !== 200) {
    throw new Error('Não foi possível acessar a API');
  }
  exibeCard(listaServicos);
  return listaServicos;
}

//FUNÇÂO PARA PEGAR OS FUNCIONARIOS DA API
async function getFuncionarios(URLFuncionarios) {
  try {
    const response = await fetch(URLFuncionarios, { method: "GET" });
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
async function getVeiculos(URLVeiculos) {
  try {
    const response = await fetch(URLVeiculos, { method: "GET" });
    if (!response.ok) {
      throw new Error("Erro ao obter dados da API");
    }
    const data = await response.json();
    listaVeiculos = data;
  } catch (error) {
    console.error(error);
  }
}

function exibeFuncionariosE(funcionarios, idServico) {
  var selectAjudante = document.getElementById('ajudantesE');
  var selectMotorista = document.getElementById('motoristasE');
  var servicoFuncionario = 0;
  var partesDoNome = [];
  for (let funcionario of funcionarios) {
    partesDoNome = funcionario.username.split(" ");
    // Verificação para garantir que `funcionario.servicoAtual` não seja null ou undefined
    if (funcionario.servicoAtual) {
      servicoFuncionario = funcionario.servicoAtual.id;
    } else {
      servicoFuncionario = null; // Se `servicoAtual` é null, define `servicoFuncionario` como null
    }
    if (funcionario.servicoAtual == null && funcionario.cargo.toLowerCase() === "ajudante" && funcionario.status === "Ativo" && servicoFuncionario != idServico) {
      selectAjudante.innerHTML += `
      <option  value="ajudante${funcionario.id}">${partesDoNome[0]} ${partesDoNome[1]}</option>
      `
    }
    else if (funcionario.servicoAtual != null && funcionario.cargo.toLowerCase() === "ajudante" && funcionario.status === "Ativo" && servicoFuncionario == idServico) {
      selectAjudante.innerHTML += `
      <option  value="ajudante${funcionario.id}" selected>${partesDoNome[0]} ${partesDoNome[1]}</option>
      `
    }
    else if (funcionario.servicoAtual == null && funcionario.cargo.toLowerCase() === "motorista" && funcionario.status === "Ativo") {
      selectMotorista.innerHTML += `
        <option value="motorista${funcionario.id}">${partesDoNome[0]} ${partesDoNome[1]}</option>
      `
    }
    else if (funcionario.servicoAtual != null && funcionario.cargo.toLowerCase() === "motorista" && funcionario.status === "Ativo" && servicoFuncionario == idServico) {
      selectMotorista.innerHTML += `
        <option value="motorista${funcionario.id}" selected>${partesDoNome[0]} ${partesDoNome[1]}</option>
      `
    }

  }
}

function exibeFuncionariosA(funcionarios) {
  var selectAjudante = document.getElementById('ajudantesA');
  var selectMotorista = document.getElementById('motoristasA');
  var partesDoNome = [];
  for (let funcionario of funcionarios) {
    partesDoNome = funcionario.username.split(" ");
    if (funcionario.servicoAtual == null && funcionario.cargo.toLowerCase() === "ajudante" && funcionario.status === "Ativo") {
      selectAjudante.innerHTML += `
        <option value="ajudante${funcionario.id}">${partesDoNome[0]} ${partesDoNome[1]}</option>
      `
    }
    else if (funcionario.servicoAtual == null && funcionario.cargo.toLowerCase() === "motorista" && funcionario.status === "Ativo") {
      selectMotorista.innerHTML += `
        <option value="motorista${funcionario.id}">${partesDoNome[0]} ${partesDoNome[1]}</option>
      `
    }

  }
}

function exibeVeiculosA(veiculos) {
  var selectVeiculo = document.getElementById('veiculosA');
  for (let veiculo of veiculos) {
    if (veiculo.servicoAtual == null) {
      selectVeiculo.innerHTML += `
        <option value="veiculo${veiculo.placa}">${veiculo.modelo} - ${veiculo.placa}</option>
      `
    }
  }
}

function exibeVeiculosE(veiculos, idServico) {
  var selectVeiculo = document.getElementById('veiculosE');
  var servicoVeiculo = 0;
  for (let veiculo of veiculos) {
    if (veiculo.servicoAtual) {
      servicoVeiculo = veiculo.servicoAtual.id;
    } else {
      servicoVeiculo = null; // Se `servicoAtual` é null, define `servicoVeiculo` como null
    }
    if (veiculo.servicoAtual == null && servicoVeiculo != idServico) {
      selectVeiculo.innerHTML += `
      <option value="veiculo${veiculo.placa}">${veiculo.modelo}</option>
      `
    }
    else if (veiculo.servicoAtual != null && servicoVeiculo == idServico) {
      selectVeiculo.innerHTML += `
      <option value="veiculo${veiculo.placa}" selected>${veiculo.modelo}</option>
      `
    }
  }
}

getFuncionarios(URLFuncionarios);

getVeiculos(URLVeiculos);

function parseDate(dateString) {
  let parts = dateString.split('/');
  // No formato 'dd/mm/yyyy'
  let day = parts[0];
  let month = parts[1] - 1; // Meses são indexados em 0
  let year = parts[2];

  return new Date(year, month, day);
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

function exibeMetrica() {
  var indicador = document.getElementById('indicador');
  var numConcluidos = 0;
  var feitosNoPrazo = 0;
  for (let servico of listaServicos) {
    if (servico.dataTermino != '') {
      numConcluidos++;
      servico.dataTermino = parseDate(servico.dataTermino);
      servico.dataPrevisao = parseDate(servico.previsaoTermino);
      if (servico.dataTermino <= servico.dataPrevisao) {
        feitosNoPrazo++;
      }
    }
  }

  indicador.innerHTML = `
    <p class="tamanhoTexto">Número de serviços:<b> ${listaServicos.length}</b></p>
    <p class="tamanhoTexto">Número de serviços concluídos:<b> ${numConcluidos}</b></p>
    <p class="tamanhoTexto">Número de serviços concluídos no prazo:<b> ${feitosNoPrazo}</b></p>
    <p class="tamanhoTexto">Número de serviços a serem concluídos:<b> ${listaServicos.length - numConcluidos}</b></p>
    <p class="tamanhoTexto">Porcentagem de serviços concluídos no prazo:<b> ${parseFloat(feitosNoPrazo / numConcluidos * 100).toFixed(2)}%</b></p>
  `;
}

function getSelectedMotoristas() {
  let selectElement = document.getElementById('motoristasA');
  if(tipo == 'editar'){ selectElement = document.getElementById('motoristasE');}
  let selectedOptions = Array.from(selectElement.selectedOptions);
  let selectedValues = selectedOptions.map(option => option.value);
  let motoristasSelecionados = [];
  for (let motorista of selectedValues) {
    motoristasSelecionados.push(buscarFuncionario(motorista.substring(9)));
  }
  return motoristasSelecionados;
}

function getSelectedAjudantes(){
  let selectElement = document.getElementById('ajudantesA');
  if(tipo == 'editar'){ selectElement = document.getElementById('ajudantesE');}
  let selectedOptions = Array.from(selectElement.selectedOptions);
  let selectedValues = selectedOptions.map(option => option.value);
  let ajudantesSelecionados = [];
  for (let ajudante of selectedValues) {
    ajudantesSelecionados.push(buscarFuncionario(ajudante.substring(8)));
  }
  return ajudantesSelecionados;
}

function getSelectedVeiculos(){
  let selectElement = document.getElementById('veiculosA');
  if(tipo == 'editar'){ selectElement = document.getElementById('veiculosE');}
  let selectedOptions = Array.from(selectElement.selectedOptions);
  let selectedValues = selectedOptions.map(option => option.value);
  let veiculosSelecionados = [];
  for (let veiculo of selectedValues) {
    veiculosSelecionados.push(buscarVeiculo(veiculo.substring(7)));
  }
  return veiculosSelecionados;
}

