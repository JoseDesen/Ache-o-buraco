const tamanhoGrade = 20;
const tabuleiro = document.getElementById('tabuleiro');
const statusJogo = document.getElementById('status-jogo');


const nomeJogador1Input = document.getElementById('nome-jogador1');
const nomeJogador2Input = document.getElementById('nome-jogador2');
const corJogador1Input = document.getElementById('cor-jogador1');
const corJogador2Input = document.getElementById('cor-jogador2');
const botaoIniciar = document.getElementById('iniciar-jogo');
const areaNomes = document.getElementById('nomes-jogadores');


const botaoReiniciar = document.getElementById('reiniciar-jogo');

const placar = document.getElementById('placar');

let placarJogador1 = 0;
let placarJogador2 = 0;

let direcaoDoTurno = (Math.random() < 0.5) ? "vertical" : "horizontal";

let jogadorAtual = 1;

let nomeJogador1 = "Jogador 1";
let nomeJogador2 = "Jogador 2";
let corJogador1 = "#007bff";
let corJogador2 = "#28a745";

botaoIniciar.addEventListener('click', () => {

    nomeJogador1 = nomeJogador1Input.value || "Jogador 1";
    nomeJogador2 = nomeJogador2Input.value || "Jogador 2";
    corJogador1 = corJogador1Input.value;
    corJogador2 = corJogador2Input.value;
    
    // Converte a cor hexadecimal para RGB
    function hexToRgb(hex) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b };
    }
    
    // Calcula a "distância" entre duas cores no espaço RGB
    function distanciaCores(cor1, cor2) {
        const rgb1 = hexToRgb(cor1);
        const rgb2 = hexToRgb(cor2);
        
        const dr = rgb1.r - rgb2.r;
        const dg = rgb1.g - rgb2.g;
        const db = rgb1.b - rgb2.b;

        return Math.sqrt(dr * dr + dg * dg + db * db);
    }
    
    // Define a tolerância para cores parecidas (um valor menor significa mais estrito)
    const tolerancia = 100;

    if (distanciaCores(corJogador1, corJogador2) < tolerancia) {
        alert("As cores dos jogadores não podem ser muito parecidas. Por favor, escolha cores mais distintas.");
        return; 
    }
    // Verifica se a cor é similar ao vermelho
    function isCorSimilarAoVermelho(cor) {
        const { r, g, b } = hexToRgb(cor);
        // Regra: o componente vermelho deve ser alto e os outros dois, baixos.
        // A proporção de R deve ser maior que 65% (165/255) e G+B deve ser menor que 30% (76.5*2)
        return r > 165 && g < 76 && b < 76;
    }

    if (isCorSimilarAoVermelho(corJogador1) || isCorSimilarAoVermelho(corJogador2)) {
        alert("A cor escolhida é muito parecida com vermelho. Por favor, escolha outra cor.");
        return;
    }

    areaNomes.style.display = 'none';
    tabuleiro.style.display = 'grid';

    iniciarJogo();
});


tabuleiro.style.display = 'none';
botaoReiniciar.style.display = 'none';

botaoReiniciar.addEventListener('click', () => {
    reiniciarJogo();
    botaoReiniciar.style.display = 'none';
});

function atualizarPlacar() {
     placar.innerHTML = `
        <span style="color: ${corJogador1};">${nomeJogador1}: ${placarJogador1} vitórias</span> | 
        <span style="color: ${corJogador2};">${nomeJogador2}: ${placarJogador2} vitórias</span>
    `;
}

function reiniciarJogo() {
    tabuleiro.innerHTML = '';

    buracos = [];
    direcaoDoTurno = (Math.random() < 0.5) ? "vertical" : "horizontal";
    jogadorAtual = 1;
    atualizarPlacar();
    iniciarJogo();
}

function iniciarJogo() {
    for (let linha = 0; linha < tamanhoGrade; linha++) {
        for (let coluna = 0; coluna < tamanhoGrade; coluna++) {
            const celula = document.createElement('div');
            celula.classList.add('celula');
            celula.id = `celula-${linha + 1}-${coluna + 1}`;
            tabuleiro.appendChild(celula);
        }
    }

    const numBuracos = 1;
    let buracos = [];

    for (let i = 0; i < numBuracos; i++) {
        const linhaAleatoria = Math.floor(Math.random() * tamanhoGrade) + 1;
        const colunaAleatoria = Math.floor(Math.random() * tamanhoGrade) + 1;
        buracos.push({
            linha: linhaAleatoria,
            coluna: colunaAleatoria
        });
    }

    const celulas = document.querySelectorAll('.celula');

    function atualizarStatus() {
        const nomeDoTurno = (jogadorAtual === 1) ? nomeJogador1 : nomeJogador2;
        const corDoTurno = (jogadorAtual === 1) ? corJogador1 : corJogador2;
        const nomeEl = document.createElement('span');
        nomeEl.textContent = nomeDoTurno;
        nomeEl.style.color = corDoTurno;

        statusJogo.innerHTML = `É a vez de `;
        statusJogo.appendChild(nomeEl);
    }

    atualizarStatus();

    celulas.forEach(celula => {
        celula.addEventListener('click', () => {
            if (celula.classList.contains('celula-desativada')) {
                return;
            }

            celula.classList.add('celula-desativada');
            celula.style.backgroundColor = 'red';

            const id = celula.id;
            const partes = id.split('-');
            const linhaClicada = parseInt(partes[1]);
            const colunaClicada = parseInt(partes[2]);
            const buraco = buracos[0];
            const nomeDoTurno = (jogadorAtual === 1) ? nomeJogador1 : nomeJogador2;
            const corJogador = (jogadorAtual === 1) ? corJogador1 : corJogador2;
            if (linhaClicada === buraco.linha && colunaClicada === buraco.coluna) {
                alert(`Parabéns, ${nomeDoTurno}! Você achou o buraco!`);
                celula.textContent = "\u25EF";
                celulas.forEach(c => c.classList.add('celula-desativada'));

                if (jogadorAtual === 1) {
                    placarJogador1++;
                } else {
                    placarJogador2++;
                }
                botaoReiniciar.style.display = 'block';
                atualizarPlacar();
            } else {
                if (direcaoDoTurno === "vertical") {
                    if (linhaClicada === buraco.linha) {
                        if (colunaClicada > buraco.coluna) {
                            celula.textContent = "\u2190";
                        } else {
                            celula.textContent = "\u2192";
                        }
                    } else if (linhaClicada > buraco.linha) {
                        celula.textContent = "\u2191";
                    } else {
                        celula.textContent = "\u2193";
                    }
                }
                if (direcaoDoTurno === "horizontal") {
                    if (colunaClicada === buraco.coluna) {
                        if (linhaClicada > buraco.linha) {
                            celula.textContent = "\u2191";
                        } else {
                            celula.textContent = "\u2193";
                        }
                    } else if (colunaClicada > buraco.coluna) {
                        celula.textContent = "\u2190";
                    } else {
                        celula.textContent = "\u2192";
                    }
                }
                celula.style.backgroundColor=corJogador;
                jogadorAtual = (jogadorAtual === 1) ? 2 : 1;
                direcaoDoTurno = (Math.random() < 0.5) ? "vertical" : "horizontal";
                atualizarStatus();
            }
        });
    });
}