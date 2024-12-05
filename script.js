// Função para redirecionar para a página de calculadora com o parâmetro do personagem
function redirecionar(personagemId) {
    window.location.href = `fragmentos.html?personagem=${personagemId}`;
  }
  
  // Função para calcular a quantidade de fragmentos a partir das partes do fragmento
  function calcularFragmentos() {
    const tipoFragmento = document.getElementById("fragmento").value;
    const quantidadePartes = parseInt(document.getElementById("quantidade").value);
    const personagemId = new URLSearchParams(window.location.search).get("personagem"); // Obtém o id do personagem da URL
  
    let resultado = 0;
    let nomeFragmento = "";
  
    // Verifica se a quantidade de partes é válida
    if (quantidadePartes < 0) {
      alert("Quantidade de partes não pode ser negativa.");
      return;
    }
  
    // Calcular fragmentos com base no tipo de fragmento
    if (quantidadePartes >= 2) {
      resultado = Math.floor(quantidadePartes / 2); // 2 partes do vazio = 1 fragmento
    }
  
    // Atribuir o nome correto ao fragmento
    if (tipoFragmento === "invasao") {
      nomeFragmento = "Invasão";
      // Obter quantidade salva e somar com o novo valor
      const invasaoAtual = parseInt(localStorage.getItem(`personagem-${personagemId}-invasao`)) || 0;
      const novaQuantidadeInvasao = invasaoAtual + resultado;
      document.getElementById("invasao-result").innerText = `Fragmentos: ${novaQuantidadeInvasao}`;
      // Salvar no localStorage com o ID do personagem
      localStorage.setItem(`personagem-${personagemId}-invasao`, novaQuantidadeInvasao);
      console.log(`Salvando fragmentos de Invasão para personagem ${personagemId}: ${novaQuantidadeInvasao}`);
    } else if (tipoFragmento === "contaminacao") {
      nomeFragmento = "Contaminação";
      // Obter quantidade salva e somar com o novo valor
      const contaminacaoAtual = parseInt(localStorage.getItem(`personagem-${personagemId}-contaminacao`)) || 0;
      const novaQuantidadeContaminacao = contaminacaoAtual + resultado;
      document.getElementById("contaminacao-result").innerText = `Fragmentos: ${novaQuantidadeContaminacao}`;
      // Salvar no localStorage com o ID do personagem
      localStorage.setItem(`personagem-${personagemId}-contaminacao`, novaQuantidadeContaminacao);
      console.log(`Salvando fragmentos de Contaminação para personagem ${personagemId}: ${novaQuantidadeContaminacao}`);
    } else if (tipoFragmento === "pesadelo") {
      nomeFragmento = "Pesadelo";
      // Obter quantidade salva e somar com o novo valor
      const pesadeloAtual = parseInt(localStorage.getItem(`personagem-${personagemId}-pesadelo`)) || 0;
      const novaQuantidadePesadelo = pesadeloAtual + resultado;
      document.getElementById("pesadelo-result").innerText = `Fragmentos: ${novaQuantidadePesadelo}`;
      // Salvar no localStorage com o ID do personagem
      localStorage.setItem(`personagem-${personagemId}-pesadelo`, novaQuantidadePesadelo);
      console.log(`Salvando fragmentos de Pesadelo para personagem ${personagemId}: ${novaQuantidadePesadelo}`);
    }
  
    // Exibe uma mensagem se a quantidade de fragmentos for zero
    if (resultado === 0) {
      alert(`Você não tem fragmentos suficientes para criar ${nomeFragmento}.`);
    }
  }
  
  // Função para carregar os valores salvos no localStorage ao carregar a página
  function carregarFragmentos() {
    const personagemId = new URLSearchParams(window.location.search).get("personagem");
  
    const invasao = localStorage.getItem(`personagem-${personagemId}-invasao`);
    const contaminacao = localStorage.getItem(`personagem-${personagemId}-contaminacao`);
    const pesadelo = localStorage.getItem(`personagem-${personagemId}-pesadelo`);
  
    console.log(`Carregando fragmentos para o personagem ${personagemId}:`);
    console.log(`Invasão: ${invasao}, Contaminação: ${contaminacao}, Pesadelo: ${pesadelo}`);
  
    if (invasao) {
      document.getElementById("invasao-result").innerText = `Fragmentos: ${invasao}`;
      addConsumeButton("invasao", invasao);
    }
  
    if (contaminacao) {
      document.getElementById("contaminacao-result").innerText = `Fragmentos: ${contaminacao}`;
      addConsumeButton("contaminacao", contaminacao);
    }
  
    if (pesadelo) {
      document.getElementById("pesadelo-result").innerText = `Fragmentos: ${pesadelo}`;
      addConsumeButton("pesadelo", pesadelo);
    }
  }
  
  // Função para adicionar o botão "Consumir 60" abaixo de cada fragmento
  function addConsumeButton(fragmento, quantidade) {
    const container = document.getElementById(`${fragmento}-result`);
    const button = document.createElement("button");
    button.textContent = "Consumir 60";
    button.onclick = function () {
      consumirFragmento(fragmento, quantidade);
    };
    container.appendChild(button);
  }
  
  // Função para consumir fragmentos
  function consumirFragmento(fragmento, quantidade) {
    const personagemId = new URLSearchParams(window.location.search).get("personagem");
    const quantidadeConsumida = 60;
  
    // Converter quantidade para número inteiro
    const quantidadeAtual = parseInt(quantidade);
  
    if (quantidadeAtual >= quantidadeConsumida) {
      // Subtrair 60 fragmentos
      const novaQuantidade = quantidadeAtual - quantidadeConsumida;
      localStorage.setItem(`personagem-${personagemId}-${fragmento}`, novaQuantidade);
      alert(`Fragmentos consumidos com sucesso, PARABÉNS PELO SEU VOID! Você agora tem ${novaQuantidade} fragmentos de ${fragmento}.`);
      carregarFragmentos(); // Atualiza a tela com a nova quantidade
    } else {
      alert(`Você não tem fragmentos suficientes para consumir ANTA. Quantidade atual: ${quantidadeAtual}.`);
    }
  }
  
  // Carregar os valores salvos quando a página for carregada
  window.onload = carregarFragmentos;
  
  // Função para calcular conversões avançadas de fragmentos
  function calcularFragmentosAvancado() {
    const partesInvasao = parseInt(document.getElementById("partes-invasao").value) || 0;
    const partesContaminacao = parseInt(document.getElementById("partes-contaminacao").value) || 0;
  
    // Conversão inicial: Partes para Fragmentos
    const fragmentosInvasao = Math.floor(partesInvasao / 2);
    const fragmentosContaminacao = Math.floor(partesContaminacao / 2);
  
    // Conversões para fabricar Pesadelo
    const necessarioPesadeloInvasao = 4;
    const necessarioPesadeloContaminacao = 4;
  
    const pesadeloPossivel = Math.min(
      Math.floor(fragmentosInvasao / necessarioPesadeloInvasao),
      Math.floor(fragmentosContaminacao / necessarioPesadeloContaminacao)
    );
  
    // Exibir os resultados
    document.getElementById("resultado-fragmentos").innerHTML = `
        <p>Fragmentos de Invasão: ${fragmentosInvasao}</p>
        <p>Fragmentos de Contaminação: ${fragmentosContaminacao}</p>
        <p>Pesadelos possíveis: ${pesadeloPossivel}</p>
      `;
  }
  