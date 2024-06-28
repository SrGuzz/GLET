const url = "http://localhost:8080/Funcionario";
let listaFuncionario = [];

//mostrar todos os funcionários
function showFuncionarios(funcionarios) {
    let tab = `
        <thead>
            <th scope="col" id="col1">#</th>
            <th scope="col" id="col2">Nome</th>
            <th scope="col" id="col3">CPF</th>
            <th scope="col" id="col4">Cargo</th>
            <th scope="col" id="col5">Status</th>
            <th scope="col" id="col6">Editar</th>
        </thead>`;

    funcionarios.forEach(funcionario => {
        let cpfFormatado = formatarCPF(funcionario.cpf);
        tab += `
            <tr>
                <td scope="row">${funcionario.id}</td>
                <td scope="row">${funcionario.username}</td>
                <td scope="row" id="cpfscope">${cpfFormatado}</td>
                <td scope="row" id="cargoscope">${funcionario.cargo}</td>
                <td scope="row" id="statuscope">${funcionario.status}</td>
                <td scope="row" id="editLittleBtn"><!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" id="btnModal${funcionario.id}">Editar</button>
                
                
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
            </tr>
        `;
    });

    document.getElementById("funcionarios").innerHTML = tab;
}

async function getAllAPI(url) {
    try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error("Erro ao obter dados da API");
        }
        const data = await response.json();
        listaFuncionario = data;
        showFuncionarios(data);
    } catch (error) {
        console.error(error);
    }

}

getAllAPI(url);
// colocar^^ na tela os funcionários do BD


function formatarCPF(cpf) {
    // Formato: XXX.XXX.XXX-XX
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function desformatarCPF(cpfFormatado) {
    // Remove pontos e traço do CPF formatado
    return cpfFormatado.replace(/[^\d]/g, "");
}

// Função para pesquisar por nome
function pesquisarPorNome(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém o valor inserido no campo de entrada
    const termoPesquisa = document.getElementById("InputBusca").value.trim().toLowerCase();

    // Se o campo de busca estiver vazio, exibir todos os funcionários
    if (termoPesquisa === "") {
        showFuncionarios(listaFuncionario);
        return; // Retorna para evitar a execução do código de filtragem abaixo
    }

    // Filtra a lista de funcionários para encontrar aqueles cujos nomes correspondem ao termo de pesquisa
    const funcionariosFiltrados = listaFuncionario.filter(funcionario => funcionario.username.toLowerCase().includes(termoPesquisa));

    // Chama a função para exibir os funcionários encontrados
    showFuncionarios(funcionariosFiltrados);
}

//editar funcionário, e atualizar informações no bd
document.addEventListener('click', function (event) {
    const idDoBotao = event.target.id;
    const idDoFuncionario = idDoBotao.replace(/[^\d]/g, "");
    if (idDoBotao.includes("btnModal") || idDoBotao.includes("btnSalvar")) {
        if (idDoBotao.includes("btnModal")) {

            const funcionario = listaFuncionario.find(funcionario => funcionario.id == idDoFuncionario);
            if (funcionario) {
                var modalEditar = document.getElementById("modalEditar");
                modalEditar.innerHTML = `
                    <form>
                        <div class="mb-3">
                            <label for="username" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="usernameEditar" value="${funcionario.username}">
                            <p class="small text-danger" id="nomeErro"></p>
                        </div>
                        <div class="mb-3">
                            <label for="cpf" class="form-label">CPF</label>
                            <input type="text" class="form-control" id="cpfEditar" value="${funcionario.cpf}">
                            <p class="small text-danger" id="cpfErro"></p>
                        </div>
                        <div class="mb-3">
                            <label for="cargo" class="form-label">Cargo</label>
                            <input type="text" class="form-control" id="cargoEditar" value="${funcionario.cargo}">
                            <p class="small text-danger" id="cargoErro"></p>
                        </div>
                        <div class="btn-group d-grid gap-2">
                            <p style="margin:0; border: 0;">Status</p>
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="escolhedorstatus" style="margin-bottom: 1vh">
                                ${funcionario.status}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" id="AtivoStatus" href="#">Ativo</a></li>
                                <li><a class="dropdown-item" id="InativoStatus" href="#">Inativo</a></li>
                            </ul>
                            <p class="small text-danger" id="sttErro"></p>
                        </div>
                        <div class="mb-3">
                            <label for="dataAdmissao" class="form-label">Data de Admissão</label>
                            <input type="text" class="form-control" id="dataAdmissaoEditar" value="${funcionario.dataAdmissao}">
                            <p class="small text-danger" id="admissaoErro"></p>
                        </div>
                        <div class="mb-3">
                            <label for="tipoCNH" class="form-label">Tipo de CNH ( Z caso não tenha )</label>
                            <input type="text" class="form-control" id="tipoCNHEditar" value="${funcionario.tipoCNH}">
                            <p class="small text-danger" id="cnhErro"></p>
                        </div>
                        <div class="mb-3">
                            <label for="observacoes" class="form-label">Observações</label>
                            <input type="text" class="form-control rows-3" id="observacoesEditar" value="${funcionario.observacoes}">
                            <p class="small text-danger" id="observacoesErro"></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" id="btnSalvar${funcionario.id}">Salvar</button>
                            <button type="button" class="d-none" data-bs-dismiss="modal" id="fechaEdit"></button>
                        </div>
                    </form>
                `;
            }
            $('#cpfEditar').mask('000.000.000-00');
            $('#dataAdmissaoEditar').mask('00/00/0000');
            let novoStatus = null;

            novoStatus = funcionario.status;

            document.getElementById("AtivoStatus").addEventListener("click", function () {
                // Atribuindo o valor "Ativo" à variável novoStatus quando "AtivoStatus" é clicado
                novoStatus = "Ativo";
                var escolhedorstatus = document.getElementById("escolhedorstatus");
                escolhedorstatus.innerHTML = "Ativo";
            });


            document.getElementById("InativoStatus").addEventListener("click", function () {
                // Atribuindo o valor "Inativo" à variável novoStatus quando "InativoStatus" é clicado
                novoStatus = "Inativo";
                var escolhedorstatus = document.getElementById("escolhedorstatus");
                escolhedorstatus.innerHTML = "Inativo";
            });

            document.getElementById(`btnSalvar${idDoFuncionario}`).addEventListener("click", function () {
                const novoNome = document.getElementById("usernameEditar").value;
                if(novoNome == ""){
                    document.getElementById("nomeErro").innerText = "Preencha o nome!";
                    return;
                }
                else{
                    document.getElementById("nomeErro").innerText = "";
                }

                var novoCpf = document.getElementById("cpfEditar").value;
                if(novoCpf == ""){
                    document.getElementById("cpfErro").innerText = "Preencha o CPF!";
                    return;
                }
                else if(novoCpf.length < 14){
                    document.getElementById("cpfErro").innerText = "CPF inválido!";
                    return;
                }
                else{
                    document.getElementById("cpfErro").innerText = "";
                }

                const novoCargo = document.getElementById("cargoEditar").value;
                if(novoCargo == ""){
                    document.getElementById("cargoErro").innerText = "Preencha o cargo!";
                    return;
                }
                else{
                    document.getElementById("cargoErro").innerText = "";
                }

                const novoDataAdmissao = document.getElementById("dataAdmissaoEditar").value;
                var parts = novoDataAdmissao.split('/');
                if (!isValidDate(novoDataAdmissao)) {
                    document.getElementById("admissaoErro").innerText = "Data de admissão inválida!";
                    return;
                }
                else if(compareYearWithCurrent(parts[2])){
                    document.getElementById("admissaoErro").innerText = "Ano de admissão inválida!";
                    return;
                }
                else{
                    document.getElementById("admissaoErro").innerText = "";
                }

                const novoTipoCNH = document.getElementById("tipoCNHEditar").value;
                if(novoTipoCNH != "Z" && novoTipoCNH != "A" && novoTipoCNH != "B" && novoTipoCNH != "C" && novoTipoCNH != "D" && novoTipoCNH != "E"){
                    document.getElementById("cnhErro").innerText = "CNH inválida!";
                    return;
                }
                else{
                    document.getElementById("cnhErro").innerText = "";
                }

                const novoObservacoes = document.getElementById("observacoesEditar").value;
                if(novoObservacoes == ""){
                    document.getElementById("observacoesErro").innerText = "Preencha as observações!";
                    return;
                }

                novoCpf = desformatarCPF(novoCpf);

                const novoFuncionario = {
                    id: idDoFuncionario,
                    username: novoNome,
                    cpf: novoCpf,
                    cargo: novoCargo,
                    status: novoStatus,
                    dataAdmissao: novoDataAdmissao,
                    tipoCNH: novoTipoCNH,
                    observacoes: novoObservacoes,
                    servico: funcionario.servico
                };
                fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(novoFuncionario)
                })
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById("fechaEdit").click();
                        getAllAPI(url);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        }
    }
});

//adicionar funcionário
document.addEventListener('click', function (event) {
    const idDoBotao = event.target.id;
    if (idDoBotao.includes("btnAdicionar")) {
        const modalAdicionar = document.getElementById("modalAdicionar");
        modalAdicionar.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="username" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="usernameAdicionar">
                    <p class="small text-danger" id="nomeError"></p>

                </div>
                <div class="mb-3">
                    <label for="cpf" class="form-label">CPF</label>
                    <input type="text" class="form-control" id="cpfAdicionar">
                    <p class="small text-danger" id="cpfError"></p>
                </div>
                <div class="mb-3">
                    <label for="cargo" class="form-label">Cargo</label>
                    <input type="text" class="form-control" id="cargoAdicionar">
                    <p class="small text-danger" id="cargoError"></p>
                </div>
                <div class="btn-group d-grid gap-2">
                        <p style="margin:0; border: 0;">Status</p>
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="escolhedorAddstatus" style="margin-bottom: 1vh">
                            Escolha o Status
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" id="AddAtivStatus" href="#">Ativo</a></li>
                            <li><a class="dropdown-item" id="AddInatStatus" href="#">Inativo</a></li>
                        </ul>
                        <p class="small text-danger" id="sttError"></p>
                </div>
                <div class="mb-3">
                    <label for="dataAdmissao" class="form-label">Data de Admissão</label>
                    <input type="text" class="form-control" id="dataAdmissaoAdicionar">
                    <p class="small text-danger" id="admissaoError"></p>
                </div>
                <div class="mb-3">
                    <label for="tipoCNH" class="form-label">Tipo de CNH ( Z caso não tenha )</label>
                    <input type="text" class="form-control" id="tipoCNHAdicionar">
                    <p class="small text-danger" id="cnhError"></p>
                </div>
                <div class="mb-3">
                    <label for="observacoes" class="form-label">Observações</label>
                    <input type="text" class="form-control rows-3" id="observacoesAdicionar">
                    <p class="small text-danger" id="observaçoesError"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnSalvarAdicionar">Salvar</button>
                    <button type="button" class="d-none" data-bs-dismiss="modal" id="fechaAdd"></button>
                </div>
            </form>
        `;
        $('#cpfAdicionar').mask('000.000.000-00');
        $('#dataAdmissaoAdicionar').mask('00/00/0000');
        let AddStatus = null;

        document.getElementById("AddAtivStatus").addEventListener("click", function () {
            // Atribuindo o valor "Ativo" à variável novoStatus quando "AtivoStatus" é clicado
            AddStatus = "Ativo";
            var escolhedorAddstatus = document.getElementById("escolhedorAddstatus");
            escolhedorAddstatus.innerHTML = "Ativo";
        });


        document.getElementById("AddInatStatus").addEventListener("click", function () {
            // Atribuindo o valor "Inativo" à variável novoStatus quando "InativoStatus" é clicado
            AddStatus = "Inativo";
            var escolhedorAddstatus = document.getElementById("escolhedorAddstatus");
            escolhedorAddstatus.innerHTML = "Inativo";
        });
        

        document.getElementById("btnSalvarAdicionar").addEventListener("click", function () {
    
            const AddNome = document.getElementById("usernameAdicionar").value;
            if(AddNome == ""){
                document.getElementById("nomeError").innerText = "Preencha o nome!";
                return;
            }
            else{
                document.getElementById("nomeError").innerText = "";
            }

            var AddCpf = document.getElementById("cpfAdicionar").value;
            if(AddCpf == ""){
                document.getElementById("cpfError").innerText = "Preencha o CPF!";
                return;
            }
            else if(AddCpf.length < 14){
                document.getElementById("cpfError").innerText = "CPF inválido!";
                return;
            }
            else{
                document.getElementById("cpfError").innerText = "";
            }

            const AddCargo = document.getElementById("cargoAdicionar").value;
            if(AddCargo == ""){
                document.getElementById("cargoError").innerText = "Preencha o cargo!";
                return;
            }
            else{
                document.getElementById("cargoError").innerText = "";
            }

            if(AddStatus == null){
                document.getElementById("sttError").innerText = "Escolha o status!";
                return;
            }
            else{
                document.getElementById("sttError").innerText = "";
            }

            const AddDataAdmissao = document.getElementById("dataAdmissaoAdicionar").value;
            var parts = AddDataAdmissao.split('/');
            if (!isValidDate(AddDataAdmissao)) {
                document.getElementById("admissaoError").innerText = "Data de admissão inválida!";
                return;
            }
            else if(compareYearWithCurrent(parts[2])){
                document.getElementById("admissaoError").innerText = "Ano de admissão inválida!";
                return;
            }
            else{
                document.getElementById("admissaoError").innerText = "";
            }

            const AddTipoCNH = document.getElementById("tipoCNHAdicionar").value;
            if(AddTipoCNH != "Z" && AddTipoCNH != "A" && AddTipoCNH != "B" && AddTipoCNH != "C" && AddTipoCNH != "D" && AddTipoCNH != "E"){
                document.getElementById("cnhError").innerText = "CNH inválida!";
                return;
            }
            else{
                document.getElementById("cnhError").innerText = "";
            }

            const AddObservacoes = document.getElementById("observacoesAdicionar").value;
            if(AddObservacoes == ""){
                document.getElementById("observaçoesError").innerText = "Preencha as observações!";
                return;
            }
            else{
                document.getElementById("observaçoesError").innerText = "";
            }
            
            AddCpf = desformatarCPF(AddCpf);

            const AddFuncionario = {
                username: AddNome,
                cpf: AddCpf,
                cargo: AddCargo,
                status: AddStatus,
                dataAdmissao: AddDataAdmissao,
                tipoCNH: AddTipoCNH,
                observacoes: AddObservacoes
            };

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(AddFuncionario)
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById("fechaAdd").click();
                    getAllAPI(url);
                })
                .catch(error => {
                    window.alert("Funcionario ja cadastrado!");
                    console.error(error);
                });
        });
    }
});

function mostrarPerformance() {
    Performance();

    let modal = new bootstrap.Modal(document.getElementById("modalPerformance"));
    modal.show();
}

function Performance() {
    let funcionarios = listaFuncionario.filter(funcionario => funcionario.status === "Ativo").length;
    let modalPerformance = document.getElementById("modalPerformance");
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

//mostrarInativos, ou Ativos ou Todos
document.addEventListener("DOMContentLoaded", function () {
    var inativos = document.getElementById("Inativos");
    var ativos = document.getElementById("Ativos");
    var todos = document.getElementById("Todos");
    if (inativos) {
        inativos.onclick = function () {
            const funcionariosFiltrados = listaFuncionario.filter(funcionario => funcionario.status === "Inativo");
            showFuncionarios(funcionariosFiltrados);
            var escolhedor = document.getElementById("escolhedorvisualizacao");
            escolhedor.innerHTML = "Inativos";
        }
    }
    if (ativos) {
        ativos.onclick = function () {
            const funcionariosAtivos = listaFuncionario.filter(funcionario => funcionario.status === "Ativo");
            showFuncionarios(funcionariosAtivos);
            var escolhedor = document.getElementById("escolhedorvisualizacao");
            escolhedor.innerHTML = "Ativos";
        }

    }
    if (todos) {
        todos.onclick = function () {
            showFuncionarios(listaFuncionario);
            var escolhedor = document.getElementById("escolhedorvisualizacao");
            escolhedor.innerHTML = "Todos";
        }
    }
    var formBusca = document.querySelector('form[role="search"]');
    formBusca.addEventListener("submit", pesquisarPorNome);

});

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