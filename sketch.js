
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
  let espacamentoY = 39;
  let inicioX = 75;
  let inicioY = 170;

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
  background('#E8DDC8');

  // Título
  noStroke();
  fill('#29231F');
  textSize(38);
  text('Cartografia de uma presença', 60, 65);

  // Subtítulo
  fill('#75685B');
  textSize(15);
  text('Uma cartografia visual de Cartas a uma negra', 60, 95);

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

  fill('#A34F35');
  circle(68, 586, 9);

  fill('#75685B');
  textSize(13);
  text('Páginas com ocorrências', 82, 590);

  fill('#C9BBA5');
  circle(288, 586, 9);

  fill('#75685B');
  text('Páginas sem ocorrências', 302, 590);

  // Totalizadores
  fill('#29231F');
  textSize(17);
  text('293 páginas analisadas', 60, 640);
  text('165 ocorrências de Carolina', 60, 670);

  // Página selecionada
  if (selecionado !== null) {
    let movimentoSelecionado = sin(
      frameCount * 0.035 + selecionado.x * 0.025
    ) * 8;

    noStroke();
    fill('#29231F');
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
