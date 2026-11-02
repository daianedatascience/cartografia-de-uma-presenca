
let dados = [];
let pontos = [];
let selecionado = null;

async function setup() {
  createCanvas(1000, 700);

  let linhas = await loadStrings('ocorrencias_carolina.csv');

  linhas = linhas
    .map(linha => linha.trim())
    .filter(linha => linha.length > 0);

  for (let i = 1; i < linhas.length; i++) {
    let colunas = linhas[i].split(',');

    dados.push({
      pagina: Number(colunas[0]),
      ocorrencias: Number(colunas[1])
    });
  }

  // Guarda a posição original de cada página
  let colunas = 30;
  let espacamentoX = 29;
  let espacamentoY = 34;
  let inicioX = 75;
 let inicioY = 210;

  for (let i = 0; i < dados.length; i++) {
    let linha = Math.floor(i / colunas);
    let coluna = i % colunas;

    let x = inicioX + coluna * espacamentoX;
    let y = inicioY + linha * espacamentoY;

    y += sin(coluna * 0.35 + linha * 0.8) * 5;
    x += sin(linha * 0.6 + coluna * 0.15) * 3;

    pontos.push({
      x: x,
      y: y,
      pagina: dados[i].pagina,
      ocorrencias: dados[i].ocorrencias
    });
  }
}

function draw() {
 background('#302923');

     // Título
  noStroke();
  fill('#E8DDC8');
  textFont('Georgia');
  textStyle(NORMAL);
  textSize(36);
  text('Cartografia de uma presença', 60, 75);

    // Subtítulo
  fill('#75685B');
  textFont('Arial');
  textStyle(NORMAL);
  textSize(16);
  text('Uma leitura visual de Cartas a uma negra, de Françoise Ega.', 60, 108);
   
  // Pontos animados
  for (let ponto of pontos) {
    let movimento = sin(
      frameCount * 0.035 + ponto.x * 0.025
    ) * 8;

    let tamanho = ponto.ocorrencias > 0
      ? 7 + ponto.ocorrencias * 2
      : 4;

    noStroke();

    if (ponto.ocorrencias > 0) {
      fill('#A34F35');
    } else {
      fill('#C9BBA5');
    }

    circle(
      ponto.x,
      ponto.y + movimento,
      tamanho
    );
  }

    // Legenda
  noStroke();

  // Páginas com ocorrências
  fill('#C97859');
  circle(68, 580, 10);

  fill('#E8DDC8');
  textFont('Arial');
  textSize(13);
  textStyle(NORMAL);
  text('Páginas em que o nome Carolina foi identificado.', 85, 584);

  // Páginas sem ocorrências
  fill('#A99B88');
  circle(68, 610, 10);

  fill('#E8DDC8');
  text('Páginas sem ocorrências identificadas.', 85, 614);

  // Explicação do tamanho dos pontos
  fill('#C9BBA5');
  textSize(12);
  text('O tamanho dos pontos varia conforme a quantidade de ocorrências em cada página.', 60, 640);

  

  // Página selecionada
  if (selecionado !== null) {
    let movimentoSelecionado = sin(
      frameCount * 0.035 + selecionado.x * 0.025
    ) * 8;

    noStroke();
    fill('#E8DDC8');
    textSize(17);

    text(
      'Página ' + selecionado.pagina +
      ' · ' + selecionado.ocorrencias +
      (selecionado.ocorrencias === 1
        ? ' ocorrência'
        : ' ocorrências'),
      650, 640
    );

    noFill();
    stroke('#29231F');
    strokeWeight(1.5);

    circle(
      selecionado.x,
      selecionado.y + movimentoSelecionado,
      23
    );
  }

  // Orientação de interação
  noStroke();
  fill('#C9BBA5');
  textFont('Arial');
  textSize(12);
  text('Clique em um ponto para consultar a página e a quantidade de ocorrências identificadas.', 60, 665);

  // Assinatura
  fill('#A99B88');
  textSize(12);
  text('Daiane Menezes · 2026', 60, 690);

}


function mousePressed() {
  let maisProximo = null;
  let menorDistancia = 18;

  for (let ponto of pontos) {
    let movimento = sin(
  frameCount * 0.04 - ponto.x * 0.035
) * 10;

    let distancia = dist(
      mouseX,
      mouseY,
      ponto.x,
      ponto.y + movimento
    );

    if (distancia < menorDistancia) {
      menorDistancia = distancia;
      maisProximo = ponto;
    }
  }

  if (maisProximo !== null) {
    selecionado = maisProximo;
  }
}

