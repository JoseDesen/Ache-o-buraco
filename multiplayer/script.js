const tamanhoGrade = 20;
const tabuleiro = document.getElementById('tabuleiro');
const statusJogo = document.getElementById('status-jogo');


const nomeJogador1Input = document.getElementById('nome-jogador1');
const nomeJogador2Input = document.getElementById('nome-jogador2');
const botaoIniciar = document.getElementById('iniciar-jogo');
const areaNomes = document.getElementById('nomes-jogadores');


const botaoReiniciar = document.getElementById('reiniciar-jogo');

const placar = document.getElementById('placar');

let placarJogador1 = 0;
let placarJogador2 = 0;

let direcaoDoTurno= (Math.random() < 0.5) ? "vertical" : "horizontal";
		
let jogadorAtual = 1;

let nomeJogador1 = "Jogador 1";
let nomeJogador2 = "Jogador 2";

botaoIniciar.addEventListener('click', () => {

    nomeJogador1 = nomeJogador1Input.value || "Jogador 1";
    nomeJogador2 = nomeJogador2Input.value || "Jogador 2";

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
    placar.textContent = `${nomeJogador1}: ${placarJogador1} vitórias | ${nomeJogador2}: ${placarJogador2} vitórias`;
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
        statusJogo.textContent = `É a vez de ${nomeDoTurno}`;
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

                jogadorAtual = (jogadorAtual === 1) ? 2 : 1;
                direcaoDoTurno = (Math.random() < 0.5) ? "vertical" : "horizontal";
                atualizarStatus();
            }
        });
    });
}