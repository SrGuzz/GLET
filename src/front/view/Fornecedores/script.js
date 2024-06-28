const url = "http://localhost:8080/fornecedor";
let listaFornecedor = [];
let nomeFornecedorSelecionado = null;
let camposEmEdicao = false;

// Função para buscar todos os fornecedores da API
async function getAllAPI() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao obter dados da API");
    }
    const data = await response.json();
    listaFornecedor = data;
    showFornecedores(listaFornecedor);
  } catch (error) {
    console.error(error);
  }
}

function formatarTelefone(input) {
  let telefone = input.value.replace(/\D/g, '');
  if (telefone.length > 2) {
    telefone = `(${telefone.substring(0, 2)}) ${telefone.substring(2)}`;
  }
  if (telefone.length > 10) {
    telefone = `${telefone.substring(0, 10)}-${telefone.substring(10, 14)}`;
  }
  input.value = telefone;
  camposEmEdicao = true; 
  // Chama a função de validação sempre que o telefone é modificado
}

function formatarCNPJ(input) {
  let cnpj = input.value.replace(/\D/g, '');

  if (cnpj.length > 2) {
    cnpj = `${cnpj.substring(0, 2)}.${cnpj.substring(2)}`;
  }
  if (cnpj.length > 6) {
    cnpj = `${cnpj.substring(0, 6)}.${cnpj.substring(6)}`;
  }
  if (cnpj.length > 10) {
    cnpj = `${cnpj.substring(0, 10)}/${cnpj.substring(10)}`;
  }
  if (cnpj.length > 15) {
    cnpj = `${cnpj.substring(0, 15)}-${cnpj.substring(15, 17)}`;
  }
  input.value = cnpj;
  camposEmEdicao = true; 
  // Chama a função de validação sempre que o CNPJ é modificado
}

function formatarNome(input) {
  if (input.value.length > 0) {
    // Transforma a primeira letra em maiúscula e mantém o restante do texto como está
    input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
  }
  camposEmEdicao = true; 
}

function formatarCategoria(input) {
  if (input.value.length > 0) {
    // Transforma a primeira letra em maiúscula e mantém o restante do texto como está
    input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
  }   
  camposEmEdicao = true; 

  // Chama a função de validação sempre que o telefone é modificado
}

// Função para exibir os fornecedores na tabela
function showFornecedores(fornecedores) {
  const tbody = document.getElementById("fornecedores");
  tbody.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

  // Adiciona o cabeçalho da tabela
  tbody.innerHTML = `
    <thead>
        <th scope="col">Nome</th>
        <th scope="col">Contato</th>
        <th scope="col">Categoria</th>
        <th scope="col">CNPJ</th>
        <th scope="col">Editar</th>
        <th scope="col">Deletar</th>
        <th scope="col">Materiais</th>
    </thead>
  `;

  fornecedores.forEach((fornecedor) => {
    const row = tbody.insertRow();
    row.insertCell().textContent = fornecedor.nome;
    row.insertCell().textContent = fornecedor.contato;
    row.insertCell().textContent = fornecedor.categoria;
    row.insertCell().textContent = fornecedor.cnpj;

    // Botão Editar
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("btn", "btn-primary");
    editButton.setAttribute("data-bs-toggle", "modal"); // Adiciona o atributo para abrir o modal
    editButton.setAttribute("data-bs-target", "#editModal"); // Define o alvo do modal
    editButton.addEventListener("click", () => {
      preencherModalEditar(fornecedor);
    });
    row.insertCell().appendChild(editButton);

    // Botão Deletar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Deletar";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => {
      deletarFornecedor(fornecedor.id);
    });
    row.insertCell().appendChild(deleteButton);

    // Botão Materiais
    const materiaisButton = document.createElement("button");
    materiaisButton.textContent = "Materiais";
    materiaisButton.classList.add("btn", "btn-warning");
    materiaisButton.addEventListener("click", () => {
      carregarMateriais(fornecedor.id);
    });
    row.insertCell().appendChild(materiaisButton);

});
  // ... (dentro da função showFornecedores, após criar os botões "Editar" e "Deletar")


}

// Função para preencher o modal de edição com os dados do fornecedor
function preencherModalEditar(fornecedor) {
  const modalEditar = document.getElementById("modalEditar");
  modalEditar.innerHTML = `
        <form>
            <div class="mb-3">
                <label for="nomeEditar" class="form-label">Nome</label>
                <input type="text" class="form-control" id="nomeEditar" value="${fornecedor.nome}">
                <p class="text-danger small" id="nomeErro"></p>
            </div>
            <div class="mb-3">    
                <label for="contatoEditar" class="form-label">Contato</label>
                <input type="text" class="form-control" id="contatoEditar" value="${fornecedor.contato}">
                <p class="text-danger small" id="cttErro"></p>
            </div>
            <div class="mb-3">    
                <label for="categoriaEditar" class="form-label">Categoria</label>
                <input type="text" class="form-control" id="categoriaEditar" value="${fornecedor.categoria}">
                <p class="text-danger small" id="categoriaErro"></p>
            </div>
            <div class="mb-3">    
                <label for="cnpjEditar" class="form-label">CNPJ</label>
                <input type="text" class="form-control" id="cnpjEditar" value="${fornecedor.cnpj}">
                <p class="text-danger small" id="cnpjErro"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="salvarEdicaoFornecedor(${fornecedor.id})">Salvar</button>
                <button type="button" class="d-none" id="fechaE" data-bs-dismiss="modal"></button>
            </div>
        </form>
    `;
    const contatoEditarInput = document.getElementById('contatoEditar');
    contatoEditarInput.addEventListener('input', () => formatarTelefone(contatoEditarInput));
    const cnpjEditarInput = document.getElementById('cnpjEditar');
    cnpjEditarInput.addEventListener('input', () => formatarCNPJ(cnpjEditarInput));
    const nomeEditarInput = document.getElementById('nomeEditar');
    nomeEditarInput.addEventListener('input', () => formatarNome(nomeEditarInput));
    const categoriaEditarInput = document.getElementById('categoriaEditar');
    categoriaEditarInput.addEventListener('input', () => formatarCategoria(categoriaEditarInput));
}

// Função para salvar as edições do fornecedor
async function salvarEdicaoFornecedor(id) {

  const nome = document.getElementById("nomeEditar").value;
  if(nome == "" || nome.length < 2){
    document.getElementById("nomeErro").innerText = "Digite seu nome corretamente!";
    return;
  }
  else{
    document.getElementById("nomeErro").innerText = "";
  }

  const contato = document.getElementById("contatoEditar").value;
  if(contato == "" || contato.length != 15){
    document.getElementById("cttErro").innerText = "Digite seu contato corretamente!";
    return;
  }
  else{
    document.getElementById("cttErro").innerText = "";
  }

  const categoria = document.getElementById("categoriaEditar").value;
  if(categoria == "" || categoria.length < 2){
    document.getElementById("categoriaErro").innerText = "Digite sua categoria corretamente!";
    return;
  }
  else{
    document.getElementById("categoriaErro").innerText = "";
  }

  const cnpj = document.getElementById("cnpjEditar").value;
  if(cnpj == "" || cnpj.length != 18){
    document.getElementById("cnpjErro").innerText = "Digite seu CNPJ corretamente!";
    return;
  }
  else{
    document.getElementById("cnpjErro").innerText = "";
  }

  const fornecedorAtualizado = {
    nome: nome,
    contato: contato,
    categoria: categoria,
    cnpj: cnpj,
  };

  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fornecedorAtualizado),
    });

    if (!response.ok) {
      throw new Error("Preencha todos os dados corretamente.");
    }

    // Fecha o modal de edição
    document.getElementById("fechaE").click();

    // Atualiza a lista de fornecedores na tela
    await getAllAPI();
  } catch (error) {
    alert(error);
  }
}

// Função para deletar um fornecedor
async function deletarFornecedor(id) {
  if (confirm("Tem certeza de que deseja deletar este fornecedor?")) {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o fornecedor.");
      }

      // Remove o fornecedor da tabela
      await getAllAPI();
    } catch (error) {
      console.error(error);
    }
  }
}

// Event listener para o botão de adicionar fornecedor
document.getElementById("btnAdicionarFornecedor").addEventListener("click", () => {
    // Limpa o conteúdo do modal de adicionar
    const modalAdicionar = document.getElementById("modalAdicionar");
    modalAdicionar.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="nome" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="nomeAdicionar">
                    <p class="text-danger small" id="nomeError"></p>
                </div>
                <div class="mb-3">
                    <label for="contato" class="form-label">Contato</label>
                    <input type="text" class="form-control" id="contatoAdicionar">
                    <p class="text-danger small" id="cttError"></p>
                </div>
                <div class="mb-3">
                    <label for="categoria" class="form-label">Categoria</label>
                    <input type="text" class="form-control" id="categoriaAdicionar">
                    <p class="text-danger small" id="categoriaError"></p>
                </div>
                <div class="mb-3">
                    <label for="cnpj" class="form-label">CNPJ</label>
                    <input type="text" class="form-control" id="cnpjAdicionar">
                    <p class="text-danger small" id="cnpjError"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="adicionarFornecedor()">Salvar</button>
                    <button type="button" class="d-none" id="fechaA" data-bs-dismiss="modal"></button>
                </div>
            </form>
        `;
        const contatoAdicionarInput = document.getElementById('contatoAdicionar');
        contatoAdicionarInput.addEventListener('input', () => formatarTelefone(contatoAdicionarInput));

        const cnpjAdicionarInput = document.getElementById('cnpjAdicionar');
        cnpjAdicionarInput.addEventListener('input', () => formatarCNPJ(cnpjAdicionarInput));

        const nomeAdicionarInput = document.getElementById('nomeAdicionar');
        nomeAdicionarInput.addEventListener('input', () => formatarNome(nomeAdicionarInput));
        
        const categoriaAdicionarInput = document.getElementById('categoriaAdicionar');
        categoriaAdicionarInput.addEventListener('input', () => formatarCategoria(categoriaAdicionarInput));
      
});

// Função para adicionar um novo fornecedor
async function adicionarFornecedor() {
  const nome = document.getElementById("nomeAdicionar").value;
  if(nome == "" || nome.length < 2){
    document.getElementById("nomeError").innerText = "Digite seu nome corretamente!";
    return;
  }
  else{
    document.getElementById("nomeError").innerText = "";
  }

  const contato = document.getElementById("contatoAdicionar").value;
  if(contato == "" || contato.length != 15){
    document.getElementById("cttError").innerText = "Digite seu contato corretamente!";
    return;
  }
  else{
    document.getElementById("cttError").innerText = "";
  }

  const categoria = document.getElementById("categoriaAdicionar").value;
  if(categoria == "" || categoria.length < 2){
    document.getElementById("categoriaError").innerText = "Digite sua categoria corretamente!";
    return;
  }
  else{
    document.getElementById("categoriaError").innerText = "";
  }

  const cnpj = document.getElementById("cnpjAdicionar").value;
  if(cnpj == "" || cnpj.length != 18){
    document.getElementById("cnpjError").innerText = "Digite seu CNPJ corretamente!";
    return;
  }
  else{
    document.getElementById("cnpjError").innerText = "";
  }

  const novoFornecedor = {
    nome: nome,
    contato: contato,
    categoria: categoria,
    cnpj: cnpj,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoFornecedor),
    });

    if (!response.ok) {
      throw new Error("Preencha todos os dados corretamente.");
    }

    // Fecha o modal de adicionar
    document.getElementById("fechaA").click();

    // Atualiza a lista de fornecedores na tela
    await getAllAPI();
  } catch (error) {
    alert(error);
  }
}

// Seleciona o campo de busca pelo ID
const inputBusca = document.getElementById("InputBusca");

// Adiciona um event listener para o evento 'input' no campo de busca
inputBusca.addEventListener("input", () => {
  const termoPesquisa = inputBusca.value.toLowerCase(); 

  // Verifica se nomeFornecedorSelecionado está definido. 
  // Se sim, está na tela de materiais, caso contrário, na de fornecedores.
  if (nomeFornecedorSelecionado) {
    // Busca em materiais
    const materiaisFiltrados = listaMateriais.filter(
      (material) =>
        material.nome.toLowerCase().includes(termoPesquisa) ||
        material.categoria.toLowerCase().includes(termoPesquisa) ||
        material.descricao.toLowerCase().includes(termoPesquisa) 
    );
    showMateriais(materiaisFiltrados); 
  } else {
    // Busca em fornecedores
    const fornecedoresFiltrados = listaFornecedor.filter(
      (fornecedor) =>
        fornecedor.nome.toLowerCase().includes(termoPesquisa) ||
        fornecedor.categoria.toLowerCase().includes(termoPesquisa) ||
        fornecedor.cnpj.toLowerCase().includes(termoPesquisa)
    );
    showFornecedores(fornecedoresFiltrados);
  }
});




// Funções para materiais
const urlM = "http://localhost:8080/material";
let listaMateriais = [];

// Função para buscar todos os materiais de um fornecedor
async function getAllMateriais(fornecedorId) {
  try {
    const response = await fetch(`${urlM}/fornecedor/${fornecedorId}`);
    if (!response.ok) {
      throw new Error("Erro ao obter dados da API");
    }
    const data = await response.json();
    listaMateriais = data;
    showMateriais(listaMateriais);
  } catch (error) {
    console.error(error);
  }
}

// Função para exibir os materiais na tabela
function showMateriais(materiais) {
  const tbody = document.getElementById("fornecedores"); // Reutiliza a mesma tabela
  tbody.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

  // Adiciona o cabeçalho da tabela de materiais
  tbody.innerHTML = `
    <thead>
        <th scope="col">ID</th>
        <th scope="col">Nome</th>
        <th scope="col">Quantidade</th>
        <th scope="col">Categoria</th>
        <th scope="col">Descrição</th>
        <th scope="col">Preço</th>
        <th scope="col">Editar</th>
        <th scope="col">Deletar</th>
    </thead>
  `;

  materiais.forEach((material) => {
    const row = tbody.insertRow();
    row.insertCell().textContent = material.id;
    row.insertCell().textContent = material.nome;
    row.insertCell().textContent = material.quantidade;
    row.insertCell().textContent = material.categoria;
    row.insertCell().textContent = material.descricao;
    const precoSpan = document.createElement("span");
    precoSpan.textContent = `${material.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;
    row.insertCell().appendChild(precoSpan);
    
    // Botão Editar Material
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("btn", "btn-primary");
    editButton.setAttribute("data-bs-toggle", "modal"); // Adiciona o atributo para abrir o modal
    editButton.setAttribute("data-bs-target", "#editModal"); // Define o alvo do modal
    editButton.addEventListener("click", () => {
      preencherModalEditarMaterial(material);
    });
    row.insertCell().appendChild(editButton);

    // Botão Deletar Material
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Deletar";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => {
      deletarMaterial(material.id);
    });
    row.insertCell().appendChild(deleteButton);
  });
}

// Função para preencher o modal de edição de material
function preencherModalEditarMaterial(material) {
  const modalEditar = document.getElementById("modalEditar");
  modalEditar.innerHTML = `
    <form>
        <div class="mb-3">
            <label for="nomeEditar" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nomeEditar" value="${material.nome}">
            <p class="text-danger small" id="nomeMErro"></p>
        </div>
        <div class="mb-3">
            <label for="quantidadeEditar" class="form-label">Quantidade</label>
            <input type="text" class="form-control" id="quantidadeEditar" value="${material.quantidade}">
            <p class="text-danger small" id="qtdMErro"></p>
        </div>
        <div class="mb-3">
            <label for="categoriaEditar" class="form-label">Categoria</label>
            <input type="text" class="form-control" id="categoriaEditar" value="${material.categoria}">
            <p class="text-danger small" id="categoriaMErro"></p>
        </div>
        <div class="mb-3">
            <label for="descricaoEditar" class="form-label">Descrição</label>
            <input type="text" class="form-control" id="descricaoEditar" value="${material.descricao}">
            <p class="text-danger small" id="descricaoMErro"></p>
        </div>
        <div class="mb-3">
            <label for="precoEditar" class="form-label">Preço</label>
            <input type="text" class="form-control" id="precoEditar" value="${material.preco}">
            <p class="text-danger small" id="precoMErro"></p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="salvarEdicaoMaterial(${material.id})">Salvar</button>
            <button type="button" class="d-none" id="fechaEM" data-bs-dismiss="modal"></button>
        </div>
    </form>
  `;
  $('#quantidadeEditar').mask('0000');
  $('#precoEditar').mask('000.000.000.000.000,00', { reverse: true });
}

// Função para salvar as edições do material
async function salvarEdicaoMaterial(id) {
  const nome = document.getElementById("nomeEditar").value;
  if(nome == "" || nome.length < 2){
    document.getElementById("nomeMErro").innerText = "Digite o nome corretamente!";
    return;
  }
  else{
    document.getElementById("nomeMErro").innerText = "";
  }

  const quantidade = document.getElementById("quantidadeEditar").value;
  if(quantidade == "" || quantidade.length < 1){
    document.getElementById("qtdMErro").innerText = "Digite a quantidade corretamente!";
    return;
  }
  else{
    document.getElementById("qtdMErro").innerText = "";
  }

  const categoria = document.getElementById("categoriaEditar").value;
  if(categoria == "" || categoria.length < 2){
    document.getElementById("categoriaMErro").innerText = "Digite a categoria corretamente!";
    return;
  }
  else{
    document.getElementById("categoriaMErro").innerText = "";
  }

  const descricao = document.getElementById("descricaoEditar").value;
  if(descricao == "" || descricao.length < 2){
    document.getElementById("descricaoMErro").innerText = "Digite a descrição corretamente!";
    return;
  }
  else{
    document.getElementById("descricaoMErro").innerText = "";
  }

  var preco = document.getElementById("precoEditar").value.replace(/\./g, '').replace(',', '.');
  if(preco == "" || preco.length < 1){
    document.getElementById("precoMErro").innerText = "Digite o preço corretamente!";
    return;
  }
  else{
    document.getElementById("precoMErro").innerText = "";
    preco = parseFloat(preco);
  }

  const materialAtualizado = {
    nome: nome,
    quantidade: quantidade,
    categoria: categoria,
    descricao: descricao,
    preco: preco,
  };

  try {
    const response = await fetch(`${urlM}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(materialAtualizado),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o material.");
    }

    // Fecha o modal de edição
    document.getElementById("fechaEM").click();

    // Atualiza a lista de materiais na tela
    await getAllMateriais(nomeFornecedorSelecionado); // Usa o ID do fornecedor armazenado
  } catch (error) {
    console.error(error);
  }
}

// Função para deletar um material
async function deletarMaterial(id) {
  if (confirm("Tem certeza de que deseja deletar este material?")) {
    try {
      const response = await fetch(`${urlM}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o material.");
      }

      // Remove o material da tabela
      await getAllMateriais(nomeFornecedorSelecionado); // Usa o ID do fornecedor armazenado
    } catch (error) {
      console.error(error);
    }
  }
}

// Função para criar o modal de adicionar um material
async function carregarMateriais(fornecedorId) {
  nomeFornecedorSelecionado = fornecedorId;
  await getAllMateriais(fornecedorId);

  // Troca o botão "Adicionar Fornecedor" para "Adicionar Material"
  const botaoAdicionar = document.getElementById("btnAdicionarFornecedor");
  botaoAdicionar.textContent = "Adicionar";
  botaoAdicionar.removeEventListener("click", adicionarFornecedor); // Remove o event listener antigo
  botaoAdicionar.addEventListener("click", () => {
    // Preenche o modal com o formulário de adicionar material
    const modalAdicionar = document.getElementById("modalAdicionar");
    modalAdicionar.innerHTML = `
      <form>
        <div class="mb-3">
          <label for="nome" class="form-label">Nome</label>
          <input type="text" class="form-control" id="nomeAdicionar">
          <p class="text-danger small" id="nomeMError"></p>
        </div>
        <div class="mb-3">
          <label for="quantidade" class="form-label">Quantidade</label>
          <input type="text" class="form-control" id="quantidadeAdicionar">
          <p class="text-danger small" id="qtdMError"></p>
        </div>
        <div class="mb-3">
          <label for="categoria" class="form-label">Categoria</label>
          <input type="text" class="form-control" id="categoriaAdicionar">
          <p class="text-danger small" id="categoriaMError"></p>
        </div>
        <div class="mb-3">
          <label for="descricao" class="form-label">Descrição</label>
          <input type="text" class="form-control" id="descricaoAdicionar">
          <p class="text-danger small" id="descricaoMError"></p>
        </div>
        <div class="mb-3">
          <label for="preco" class="form-label">Preço</label>
          <input type="text" class="form-control" id="precoAdicionar">
          <p class="text-danger small" id="precoMError"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" onclick="adicionarMaterial(${fornecedorId})">Salvar</button>
          <button type="button" class="d-none" id="fechaAM" data-bs-dismiss="modal"></button>
        </div>
      </form>
    `;
    $('#quantidadeAdicionar').mask('0000');
    $('#precoAdicionar').mask('000.000.000.000.000,00', { reverse: true });
  });

  // Adiciona o botão "Voltar"
  const voltarDiv = document.getElementById("voltardp");
  voltarDiv.innerHTML = `
    <button id="voltar" class="btn btn-warning" type="button">Voltar</button>
  `;
  document.getElementById("voltar").addEventListener("click", () => {
    // Volta para a lista de fornecedores
    getAllAPI();
    nomeFornecedorSelecionado = null; // Limpa o ID do fornecedor armazenado

    // Troca o botão de volta para "Adicionar Fornecedor"
    botaoAdicionar.textContent = "Adicionar";
    botaoAdicionar.removeEventListener("click", adicionarMaterial); // Remove o event listener antigo
    botaoAdicionar.addEventListener("click", () => {
      // Lógica para adicionar fornecedor (se necessário)
      const modalAdicionar = document.getElementById("modalAdicionar");
      modalAdicionar.innerHTML = `
        <form>
          <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nomeAdicionar">
          </div>
          <div class="mb-3">
            <label for="contato" class="form-label">Contato</label>
            <input type="text" class="form-control" id="contatoAdicionar">
          </div>
          <div class="mb-3">
            <label for="categoria" class="form-label">Categoria</label>
            <input type="text" class="form-control" id="categoriaAdicionar">
          </div>
          <div class="mb-3">
            <label for="cnpj" class="form-label">CNPJ</label>
            <input type="text" class="form-control" id="cnpjAdicionar">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="adicionarFornecedor()" data-bs-dismiss="modal">Salvar</button>
          </div>
        </form>
      `;
      const contatoAdicionarInput = document.getElementById('contatoAdicionar');
      contatoAdicionarInput.addEventListener('input', () => formatarTelefone(contatoAdicionarInput));
      const cnpjAdicionarInput = document.getElementById('cnpjAdicionar');
      cnpjAdicionarInput.addEventListener('input', () => formatarCNPJ(cnpjAdicionarInput));
      const nomeAdicionarInput = document.getElementById('nomeAdicionar');
      nomeAdicionarInput.addEventListener('input', () => formatarNome(nomeAdicionarInput));
      const categoriaAdicionarInput = document.getElementById('categoriaAdicionar');
      categoriaAdicionarInput.addEventListener('input', () => formatarCategoria(categoriaAdicionarInput));
    });

    // Remove o botão "Voltar"
    voltarDiv.innerHTML = "";
  });
}

// Função para adicionar um novo material
async function adicionarMaterial(fornecedorId) {
  const nome = document.getElementById("nomeAdicionar").value;
  if(nome == "" || nome.length < 2){
    document.getElementById("nomeMError").innerText = "Digite o nome corretamente!";
    return;
  }
  else{
    document.getElementById("nomeMError").innerText = "";
  }

  const quantidade = document.getElementById("quantidadeAdicionar").value;
  if(quantidade == "" || quantidade.length < 1){
    document.getElementById("qtdMError").innerText = "Digite a quantidade corretamente!";
    return;
  }
  else{
    document.getElementById("qtdMError").innerText = "";
  }

  const categoria = document.getElementById("categoriaAdicionar").value;
  if(categoria == "" || categoria.length < 2){
    document.getElementById("categoriaMError").innerText = "Digite a categoria corretamente!";
    return;
  }
  else{
    document.getElementById("categoriaMError").innerText = "";
  }

  const descricao = document.getElementById("descricaoAdicionar").value;
  if(descricao == "" || descricao.length < 2){
    document.getElementById("descricaoMError").innerText = "Digite a descrição corretamente!";
    return;
  }
  else{
    document.getElementById("descricaoMError").innerText = "";
  }

  var preco = document.getElementById("precoAdicionar").value.replace(/\./g, '').replace(',', '.');
  if(preco == "" || preco.length < 1){
    document.getElementById("precoMError").innerText = "Digite o preço corretamente!";
    return;
  }
  else{
    document.getElementById("precoMError").innerText = "";
    preco = parseFloat(preco);
  }

  const novoMaterial = {
    nome: nome,
    quantidade: quantidade,
    categoria: categoria,
    descricao: descricao,
    preco: preco,
    fornecedor: { id: fornecedorId }, // Associa o material ao fornecedor
  };

  try {
    const response = await fetch(urlM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoMaterial),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar o material.");
    }

    // Fecha o modal de adicionar
    const addModalEl = document.getElementById("exampleModal");
    const addModal = bootstrap.Modal.getInstance(addModalEl);
    addModal.hide();

    // Atualiza a lista de materiais na tela
    await getAllMateriais(fornecedorId);
  } catch (error) {
    console.error(error);
  }
}

// Inicialização da página
getAllAPI();