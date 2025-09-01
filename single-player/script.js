
let tamanhoGrade = 3;

function niveis(tamanhoGrade) {
	const tabuleiro = document.getElementById('tabuleiro');
	tabuleiro.innerHTML = '';
	tabuleiro.style.gridTemplateColumns = `repeat(${tamanhoGrade}, 50px)`;
	tabuleiro.style.pointerEvents = "auto"; 

	const mensagemFimJogo = document.getElementById("mensagem-fim-jogo");
	mensagemFimJogo.style.display = "none";

	let tentativaRestantes = tamanhoGrade * 2; 

	const contadortentativa = document.getElementById('contador-tentativa');
	contadortentativa.textContent = `Tentativas restantes: ${tentativaRestantes}`;

	const contadorburacos = document.getElementById('contador-buracos');

	let largura_altura = 50 * tamanhoGrade; // Ajuste para 50px de largura da celula
	tabuleiro.style.width = `${largura_altura}px`;
	tabuleiro.style.height = `${largura_altura}px`;
	
	for (let linha = 0; linha < tamanhoGrade; linha++) {
		for (let coluna = 0; coluna < tamanhoGrade; coluna++) {
			const celula = document.createElement('div');
			
			celula.classList.add('celula');
			celula.id = `celula-${linha + 1}-${coluna + 1}`;
			
			tabuleiro.appendChild(celula);
		}
	}
	
	let qtdBuracos;
	
	if (tamanhoGrade > 10 && tamanhoGrade <= 16) {
		qtdBuracos = 2;
	} else if (tamanhoGrade > 16 && tamanhoGrade <= 22) {
		qtdBuracos = 3;
	} else if (tamanhoGrade > 22 && tamanhoGrade <= 28) {
		qtdBuracos = 4;
	} else if (tamanhoGrade > 28 && tamanhoGrade <= 34) {
		qtdBuracos = 5;
	} else if (tamanhoGrade > 34 && tamanhoGrade <= 40) {
		qtdBuracos = 6;
	} else if (tamanhoGrade > 40) {
		qtdBuracos = 7;
	} else {
		qtdBuracos = 1;
	}
	
	let buracos = [];
	let posicoesOcupadas = new Set();
	
	for (let i = 0; i < qtdBuracos; i++) {
		let linhaAleatoria, colunaAleatoria, idPosicao;

		do {
			linhaAleatoria = Math.floor(Math.random() * tamanhoGrade) + 1;
			colunaAleatoria = Math.floor(Math.random() * tamanhoGrade) + 1;
			idPosicao = `${linhaAleatoria}-${colunaAleatoria}`;
		} while (posicoesOcupadas.has(idPosicao));

		buracos.push({
			linha: linhaAleatoria,
			coluna: colunaAleatoria,
			encontrado:false
		});
		posicoesOcupadas.add(idPosicao);
	}

	if(tamanhoGrade>10){
		contadorburacos.textContent = `buracos restantes: ${buracos.filter(b => !b.encontrado).length}`;
	}else{
		contadorburacos.textContent = ``;
	}

	const celulas = document.querySelectorAll('.celula');

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

			tentativaRestantes--;
			contadortentativa.textContent = `Tentativa restantes: ${tentativaRestantes}`;

			let buracoEncontrado = buracos.find(b => b.linha === linhaClicada && b.coluna === colunaClicada);

			if (buracoEncontrado) {
				buracoEncontrado.encontrado = true;
				celula.textContent = "\u25EF";

				const buracosRestantes = buracos.filter(b => !b.encontrado)

				if (buracosRestantes.length === 0) {
					if (qtdBuracos == 1) {
						alert("Você achou o buraco!");
					} else {
						alert("Você achou todos os buracos!");
					}
					tamanhoGrade = tamanhoGrade + 1;
					niveis(tamanhoGrade);
				} else {
					alert(`Você achou um buraco! Faltam ${buracosRestantes.length} buraco(s)`);
					contadorburacos.textContent = `buracos restantes: ${buracosRestantes.length}`;
				}
			} else {
				// Lógica para encontrar o buraco mais próximo
				let distanciaMinima = Infinity;
				let buracoMaisProximo = null;

				buracos.forEach(buraco => {
					const distancia = Math.abs(linhaClicada - buraco.linha) + Math.abs(colunaClicada - buraco.coluna);
					if (distancia < distanciaMinima) {
						distanciaMinima = distancia;
						buracoMaisProximo = buraco;
					}
				});

				if (buracoMaisProximo) {
					// Determinar a direção para o buraco mais próximo
					const diffLinha = linhaClicada - buracoMaisProximo.linha;
					const diffColuna = colunaClicada - buracoMaisProximo.coluna;

					if(linhaClicada === buracoMaisProximo.linha){
						celula.textContent = diffColuna > 0 ? "\u2190" : "\u2192";
					}else if(colunaClicada === buracoMaisProximo.coluna){
						celula.textContent = diffLinha > 0 ? "\u2191" : "\u2193";
					}else{
						const escolhaAleatorio = Math.random();
						if (escolhaAleatorio<0.5) {
							celula.textContent = diffLinha > 0 ? "\u2191" : "\u2193";
						} else {
							celula.textContent = diffColuna > 0 ? "\u2190" : "\u2192";
						}
					}
				}
			}
			if (tentativaRestantes === 0 && buracos.length > 0) {
				const buracosNãoEncontrados = buracos.filter(b => !b.encontrado)
				buracosNãoEncontrados.forEach(buraco => {
					const celulaBuraco = document.getElementById(`celula-${buraco.linha}-${buraco.coluna}`)
					if(celulaBuraco){
						celulaBuraco.style.backgroundColor= 'green'
						celulaBuraco.textContent = "\u25EF"
					}

				})
				tabuleiro.style.pointerEvents = "none"; 

				mensagemFimJogo.style.display = "block";
			}
		});
	});
}
const botaoReiniciar = document.getElementById("botao-fim-jogo-reiniciar")
botaoReiniciar.addEventListener('click', () => {
	tamanhoGrade = 3;
	niveis(tamanhoGrade);
})
niveis(tamanhoGrade)

