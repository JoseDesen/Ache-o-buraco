
let tamanhoGrade = 3;

function niveis(tamanhoGrade){
	
	const tabuleiro = document.getElementById('tabuleiro');
	tabuleiro.style.gridTemplateColumns = `repeat(${tamanhoGrade}, 1fr)`;
	
	let largura_altura=tamanhoGrade*10;
	tabuleiro.style.width = `${largura_altura}px`;
	tabuleiro.style.height = `${largura_altura}px`;
	
	for (let linha = 0; linha < tamanhoGrade; linha++) {
	    for (let coluna = 0; coluna < tamanhoGrade; coluna++) {
	        const celula = document.createElement('div');
	        
	        celula.classList.add('celula');
	        celula.id = `celula-${linha+1}-${coluna+ 1}`;
	        
	        tabuleiro.appendChild(celula);
	    }
	}
	const qtdBuracos = 1;
	let buracos = [];
	
	for (let i = 0; i < qtdBuracos; i++) {
	    const linhaAleatoria = Math.floor(Math.random() * tamanhoGrade)+ 1;
	    const colunaAleatoria = Math.floor(Math.random() * tamanhoGrade)+ 1;
	    
	    buracos.push({
	        linha: linhaAleatoria,
	        coluna: colunaAleatoria
	    });
	}
	
	const celulas = document.querySelectorAll('.celula');
	let turno="vertical"
	
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
	
		const buraco=buracos[0]
		
		if(linhaClicada==buraco.linha && colunaClicada==buraco.coluna){
	
			celula.textContent = "\u25EF";
	
			alert("vc achou");
	
			tabuleiro.innerHTML = '';
	
			tamanhoGrade=tamanhoGrade+1;
			niveis(tamanhoGrade)
	
		}else{
			if(turno=="vertical"){		
				if(linhaClicada==buraco.linha){
					if(colunaClicada>buraco.coluna){
						celula.textContent = "\u2190";		
					}else{
						celula.textContent = "\u2192";				
					}		
				}else if(linhaClicada>buraco.linha){
					celula.textContent = "\u2191";		
				}else{
					celula.textContent = "\u2193";				
				}
			}
			if(turno=="horizontal"){		
				if(colunaClicada==buraco.coluna){
					if(linhaClicada>buraco.linha){
						celula.textContent = "\u2191";		
					}else{
						celula.textContent = "\u2193";				
					}	
				}else if(colunaClicada>buraco.coluna){
					celula.textContent = "\u2190";		
				}else{
					celula.textContent = "\u2192";				
				}
			}	
		}
	
		turno=(turno=="vertical")?"horizontal":"vertical"
	    });
	});
}

niveis(tamanhoGrade)

