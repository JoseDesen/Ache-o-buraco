
let tamanhoGrade = 3;

function niveis(tamanhoGrade) {
	const tabuleiro = document.getElementById('tabuleiro');
	tabuleiro.innerHTML = '';
	tabuleiro.style.gridTemplateColumns = `repeat(${tamanhoGrade}, 50px)`;

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
			coluna: colunaAleatoria
		});
		posicoesOcupadas.add(idPosicao);
	}

	if(tamanhoGrade>10){
		contadorburacos.textContent = `buracos restantes: ${buracos.length}`;
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
			contadortentativa.textContent = `tentativa restantes: ${tentativaRestantes}`;

			let buracoEncontradoIndex = -1;

			for (let i = 0; i < buracos.length; i++) {
				if (linhaClicada === buracos[i].linha && colunaClicada === buracos[i].coluna) {
					buracoEncontradoIndex = i;
					break;
				}
			}

			if (buracoEncontradoIndex !== -1) {
				celula.textContent = "\u25EF";
				buracos.splice(buracoEncontradoIndex, 1);

				if (buracos.length === 0) {
					if (qtdBuracos == 1) {
						alert("Você achou o buraco!");
					} else {
						alert("Você achou todos os buracos!");
					}
					tamanhoGrade = tamanhoGrade + 1;
					niveis(tamanhoGrade);
				} else {
					alert(`Você achou um buraco! Faltam ${buracos.length} buraco(s)`);
					contadorburacos.textContent = `buracos restantes: ${buracos.length}`;
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

					if (Math.abs(diffLinha) > Math.abs(diffColuna)) {
						// Movimento vertical é maior
						celula.textContent = diffLinha > 0 ? "\u2191" : "\u2193";
					} else if (Math.abs(diffColuna) > Math.abs(diffLinha)) {
						// Movimento horizontal é maior
						celula.textContent = diffColuna > 0 ? "\u2190" : "\u2192";
					} else {
						// A mesma distância na vertical e horizontal, escolha uma delas
						celula.textContent = diffLinha > 0 ? "\u2191" : "\u2193";
					}
				}
			}
			if (tentativaRestantes === 0 && buracos.length > 0) {
				alert("Fim de jogo! Você não encontrou todos os buracos a tempo.");
				tamanhoGrade = 3;
				niveis(tamanhoGrade);
			}
		});
	});
}

niveis(tamanhoGrade)

