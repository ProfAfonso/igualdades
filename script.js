
// ==========================================
// MISSÃO: SALVAR O CIBERESPAÇO!
// Jogo de equilíbrio das igualdades
// ==========================================

const desafios = [

  // FASE 1 - APRENDENDO A EQUILIBRAR

  { esquerda:[2,3], direita:[4], alvo:"direita", resposta:1, opcoes:[1,2,3] },
  { esquerda:[5,2], direita:[4], alvo:"direita", resposta:3, opcoes:[2,3,4] },
  { esquerda:[3,3], direita:[5], alvo:"direita", resposta:1, opcoes:[1,2,3] },
  { esquerda:[6,2], direita:[5], alvo:"direita", resposta:3, opcoes:[2,3,4] },
  { esquerda:[4,4], direita:[6], alvo:"direita", resposta:2, opcoes:[1,2,3] },
  { esquerda:[5,5], direita:[7], alvo:"direita", resposta:3, opcoes:[2,3,4] },
  { esquerda:[8,3], direita:[6], alvo:"direita", resposta:5, opcoes:[3,4,5] },

  // FASE 2 - O DESAFIO DOS PESOS

  { esquerda:[7,5], direita:[8], alvo:"direita", resposta:4, opcoes:[3,4,5] },
  { esquerda:[9,4], direita:[8], alvo:"direita", resposta:5, opcoes:[4,5,6] },
  { esquerda:[6,6], direita:[9], alvo:"direita", resposta:3, opcoes:[2,3,4] },
  { esquerda:[8,7], direita:[10], alvo:"direita", resposta:5, opcoes:[4,5,6] },
  { esquerda:[12,3], direita:[10], alvo:"direita", resposta:5, opcoes:[3,4,5] },
  { esquerda:[15,5], direita:[12], alvo:"direita", resposta:8, opcoes:[6,7,8] },
  { esquerda:[10,8], direita:[12], alvo:"direita", resposta:6, opcoes:[4,5,6] },

  // FASE 3 - NÚMEROS DESCONHECIDOS

  { esquerda:[12], direita:[7], alvo:"direita", resposta:5, opcoes:[3,4,5,6] },
  { esquerda:[15], direita:[9], alvo:"direita", resposta:6, opcoes:[4,5,6,7] },
  { esquerda:[8,7], direita:[10], alvo:"direita", resposta:5, opcoes:[3,4,5,6] },
  { esquerda:[20], direita:[12], alvo:"direita", resposta:8, opcoes:[6,7,8,9] },
  { esquerda:[14,6], direita:[15], alvo:"direita", resposta:5, opcoes:[3,4,5,6] },
  { esquerda:[18,7], direita:[20], alvo:"direita", resposta:5, opcoes:[3,4,5,6] }

];


// ==========================================
// VARIÁVEIS DO JOGO
// ==========================================

let desafioAtual = 0;
let pontos = 0;
let pesoColocado = null;
let ladoColocado = null;
let pesosDisponiveis = [];
let pesoSelecionado = null;
let bloqueado = false;


// ==========================================
// ELEMENTOS DA TELA
// ==========================================

const telaInicial = document.getElementById("telaInicial");
const telaJogo = document.getElementById("telaJogo");
const telaFinal = document.getElementById("telaFinal");

const barra = document.getElementById("barraBalanca");

const pratoEsquerdo = document.getElementById("pratoEsquerdo");
const pratoDireito = document.getElementById("pratoDireito");

const pesosEsquerda = document.getElementById("pesosEsquerda");
const pesosDireita = document.getElementById("pesosDireita");

const pesosDisponiveisElemento =
  document.getElementById("pesosDisponiveis");

const valorEsquerdo =
  document.getElementById("valorEsquerdo");

const valorDireito =
  document.getElementById("valorDireito");

const feedback = document.getElementById("feedback");


// ==========================================
// BOTÕES
// ==========================================

document.getElementById("botaoIniciar")
  .addEventListener("click", iniciarJogo);

document.getElementById("botaoLimpar")
  .addEventListener("click", limparPeso);

document.getElementById("botaoConferir")
  .addEventListener("click", conferirResposta);

document.getElementById("botaoReiniciar")
  .addEventListener("click", reiniciarJogo);


// ==========================================
// INICIAR JOGO
// ==========================================

function iniciarJogo() {

  pontos = 0;
  desafioAtual = 0;

  atualizarPontos();

  telaInicial.classList.remove("ativa");
  telaFinal.classList.remove("ativa");
  telaJogo.classList.add("ativa");

  carregarDesafio();

}


// ==========================================
// CARREGAR DESAFIO
// ==========================================

function carregarDesafio() {

  bloqueado = false;
  pesoColocado = null;
  ladoColocado = null;
  pesoSelecionado = null;

  const desafio = desafios[desafioAtual];

  pesosDisponiveis = [...desafio.opcoes];

  const numero = desafioAtual + 1;

  let fase = 1;

  if (numero > 7 && numero <= 14) {
    fase = 2;
  }

  if (numero > 14) {
    fase = 3;
  }

  document.getElementById("numeroFase").textContent = fase;

  document.getElementById("numeroDesafio").textContent = numero;

  document.getElementById("tituloDesafio").textContent =
    fase === 1 ? "Vamos aprender a equilibrar!" :
    fase === 2 ? "O desafio dos pesos!" :
    "Descubra o número escondido!";

  const ladoTexto =
    desafio.alvo === "direita" ? "direito" : "esquerdo";

  document.getElementById("instrucao").textContent =
    `Arraste o peso correto para o prato ${ladoTexto} da balança.`;

  feedback.textContent = "Observe os valores e encontre o peso que falta!";
  feedback.className = "feedback";

  renderizarPesosFixos();

  renderizarOpcoes();

  atualizarBalanca();

}


// ==========================================
// MOSTRAR PESOS FIXOS
// ==========================================

function renderizarPesosFixos() {

  const desafio = desafios[desafioAtual];

  pesosEsquerda.innerHTML = "";
  pesosDireita.innerHTML = "";

  desafio.esquerda.forEach(numero => {

    const peso = criarPeso(numero);

    pesosEsquerda.appendChild(peso);

  });

  desafio.direita.forEach(numero => {

    const peso = criarPeso(numero);

    pesosDireita.appendChild(peso);

  });

}


// ==========================================
// CRIAR PESO VISUAL
// ==========================================

function criarPeso(numero) {

  const elemento = document.createElement("div");

  elemento.className = "peso";
  elemento.textContent = numero;

  return elemento;

}


// ==========================================
// MOSTRAR PESOS DISPONÍVEIS
// ==========================================

function renderizarOpcoes() {

  pesosDisponiveisElemento.innerHTML = "";

  pesosDisponiveis.forEach((numero, indice) => {

    const peso = document.createElement("div");

    peso.className = "peso disponivel";
    peso.textContent = numero;

    peso.draggable = true;

    peso.dataset.valor = numero;
    peso.dataset.indice = indice;

    // ARRASTAR COM O MOUSE

    peso.addEventListener("dragstart", function(event) {

      if (bloqueado || pesoColocado !== null) {
        event.preventDefault();
        return;
      }

      pesoSelecionado = Number(this.dataset.valor);

      event.dataTransfer.setData(
        "text/plain",
        String(this.dataset.indice)
      );

      this.classList.add("arrastando");

    });

    peso.addEventListener("dragend", function() {
      this.classList.remove("arrastando");
    });

    // SELECIONAR COM CLIQUE

    peso.addEventListener("click", function() {

      if (bloqueado || pesoColocado !== null) return;

      pesoSelecionado = Number(this.dataset.valor);

      document.querySelectorAll(".peso.disponivel")
        .forEach(p => p.style.outline = "none");

      this.style.outline = "4px solid #ffd45a";

      feedback.textContent =
        `Peso ${pesoSelecionado} selecionado! Agora clique no prato indicado.`;

    });

    pesosDisponiveisElemento.appendChild(peso);

  });

}


// ==========================================
// RECEBER PESOS NOS PRATOS
// ==========================================

[pratoEsquerdo, pratoDireito].forEach(prato => {

  prato.addEventListener("dragover", function(event) {

    event.preventDefault();

  });

  prato.addEventListener("drop", function(event) {

    event.preventDefault();

    const indice = Number(
      event.dataTransfer.getData("text/plain")
    );

    colocarPeso(indice, this);

  });

  prato.addEventListener("click", function() {

    if (pesoSelecionado === null) return;

    const indice = pesosDisponiveis.indexOf(pesoSelecionado);

    colocarPeso(indice, this);

  });

});


// ==========================================
// COLOCAR PESO NA BALANÇA
// ==========================================

function colocarPeso(indice, prato) {

  if (bloqueado || pesoColocado !== null) return;

  if (indice < 0 || indice >= pesosDisponiveis.length) return;

  const desafio = desafios[desafioAtual];

  const lado = prato.id === "pratoEsquerdo"
    ? "esquerda"
    : "direita";

  if (lado !== desafio.alvo) {

    feedback.textContent =
      "Observe a orientação! Coloque o peso no outro prato.";

    feedback.className = "feedback erro";

    return;
  }

  const numero = pesosDisponiveis[indice];

  pesoColocado = numero;
  ladoColocado = lado;

  pesosDisponiveis.splice(indice, 1);

  const novoPeso = criarPeso(numero);

  novoPeso.classList.add("peso-colocado");

  novoPeso.title = "Clique para retirar este peso";

  novoPeso.addEventListener("click", retirarPeso);

  if (lado === "esquerda") {
    pesosEsquerda.appendChild(novoPeso);
  } else {
    pesosDireita.appendChild(novoPeso);
  }

  renderizarOpcoes();

  atualizarBalanca();

  feedback.textContent =
    "Muito bem! Agora clique em CONFERIR para verificar.";

  feedback.className = "feedback";

}


// ==========================================
// RETIRAR PESO COLOCADO
// ==========================================

function retirarPeso() {

  if (bloqueado) return;

  if (pesoColocado === null) return;

  pesosDisponiveis.push(pesoColocado);

  pesoColocado = null;
  ladoColocado = null;

  renderizarPesosFixos();

  renderizarOpcoes();

  atualizarBalanca();

  feedback.textContent =
    "Peso retirado! Você pode tentar novamente.";

  feedback.className = "feedback";

}


// ==========================================
// CALCULAR OS VALORES
// ==========================================

function calcularValores() {

  const desafio = desafios[desafioAtual];

  let esquerda = desafio.esquerda.reduce(
    (total, numero) => total + numero, 0
  );

  let direita = desafio.direita.reduce(
    (total, numero) => total + numero, 0
  );

  if (pesoColocado !== null) {

    if (ladoColocado === "esquerda") {
      esquerda += pesoColocado;
    }

    if (ladoColocado === "direita") {
      direita += pesoColocado;
    }

  }

  return { esquerda, direita };

}


// ==========================================
// ATUALIZAR BALANÇA
// ==========================================

function atualizarBalanca() {

  const valores = calcularValores();

  valorEsquerdo.textContent = valores.esquerda;
  valorDireito.textContent = valores.direita;

  const diferenca = valores.direita - valores.esquerda;

  // Inclinação da balança

  let inclinacao = diferenca * 2.5;

  inclinacao = Math.max(-18, Math.min(18, inclinacao));

  barra.style.transform =
    `translateX(-50%) rotate(${inclinacao}deg)`;

}


// ==========================================
// CONFERIR RESPOSTA
// ==========================================

function conferirResposta() {

  if (bloqueado) return;

  if (pesoColocado === null) {

    feedback.textContent =
      "Primeiro coloque um peso na balança!";

    feedback.className = "feedback erro";

    return;

  }

  const valores = calcularValores();

  if (valores.esquerda === valores.direita) {

    bloqueado = true;

    pontos += 10;

    atualizarPontos();

    feedback.textContent =
      "🎉 Muito bem! A balança está equilibrada! +10 pontos!";

    feedback.className = "feedback sucesso";

    document.getElementById("botaoConferir").disabled = true;

    setTimeout(avancarDesafio, 1800);

  } else {

    feedback.textContent =
      `Ainda não está equilibrada! ${valores.esquerda} não é igual a ${valores.direita}. Tente novamente!`;

    feedback.className = "feedback erro";

  }

}


// ==========================================
// AVANÇAR DESAFIO
// ==========================================

function avancarDesafio() {

  desafioAtual++;

  document.getElementById("botaoConferir").disabled = false;

  if (desafioAtual < desafios.length) {

    carregarDesafio();

  } else {

    finalizarJogo();

  }

}


// ==========================================
// LIMPAR PESO
// ==========================================

function limparPeso() {

  if (bloqueado) return;

  if (pesoColocado === null) return;

  retirarPeso();

}


// ==========================================
// ATUALIZAR PONTUAÇÃO
// ==========================================

function atualizarPontos() {

  document.getElementById("pontos").textContent = pontos;

}


// ==========================================
// FINALIZAR JOGO
// ==========================================

function finalizarJogo() {

  telaJogo.classList.remove("ativa");
  telaFinal.classList.add("ativa");

  document.getElementById("pontuacaoFinal").textContent =
    pontos;

}


// ==========================================
// REINICIAR JOGO
// ==========================================

function reiniciarJogo() {

  telaFinal.classList.remove("ativa");
  telaInicial.classList.add("ativa");

  pontos = 0;
  desafioAtual = 0;

  atualizarPontos();

}
