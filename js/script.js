const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: 'Escolha uma classe',
    options: [
      {
        text: 'Mago',
        setState: {classeMago: true},
        nextText: 2,
      },
      {
        text: 'Arqueiro',
        setState: {classeArqueiro: true},
        nextText: 2,
      },
      {
        text: 'Guerreiro',
        setState: {classeGuerreiro: true},
        nextText: 2,
      },
      {
        text: 'Escudeiro',
        setState: {classeEscudeiro: true},
        nextText: 2,
      }
    ]
  },
  {
    id: 2,
    text: 'Você acorda sozinho em uma floresta, sem saber seu nome',
    options: [
      {
        text: 'Continuar',
        nextText: 3,
      }
    ]
  },
  {
    id: 3,
    text: 'Ao seu lado tem uma bolsa com moedas',
    options: [
      {
        text: 'Pegar a bolsa e sair',
        setState: {bolsaDeMoedas: true},
        nextText: 4
      },
      {
        text: 'Sair sem a bolsa',
        nextText: 4,
      }
    ]
  },
  {
    id: 4,
    text: 'Você anda sozinho pela floresta em busca de respostas e esbarra com um comerciante',
    options: [
      {
        text: 'Trocar a bolsa de moedas por um cajado',
        requiredState: (currentState) => currentState.classeMago,
        requiredState: (currentState) => currentState.bolsaDeMoedas,
        setState: {bolsaDeMoedas: false, cajado: true},
        nextText: 5
      },
      {
        text: 'Trocar a bolsa de moedas por um arco',
        requiredState: (currentState) => currentState.classeArqueiro,
        requiredState: (currentState) => currentState.bolsaDeMoedas,
        setState: {bolsaDeMoedas: false, arco: true},
        nextText: 5
      },
      {
        text: 'Trocar a bolsa de moedas por uma espada',
        requiredState: (currentState) => currentState.classeGuerreiro,
        requiredState: (currentState) => currentState.bolsaDeMoedas,
        setState: {bolsaDeMoedas: false, espada: true},
        nextText: 5
      },
      {
        text: 'Trocar a bolsa de moedas por um escudo',
        requiredState: (currentState) => currentState.classeEscudeiro,
        requiredState: (currentState) => currentState.bolsaDeMoedas,
        setState: {bolsaDeMoedas: false, escudeiro: true},
        nextText: 5
      },
      {
        text: 'Ignorar o comerciante',
        nextText: 5
      },
    ]
  }
  
];

startGame();

// requiredState: (currentState) => currentState.jarroVermelho,
// setState: { jarroVermelho: false, espada: true },