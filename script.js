
const tamanhoGrade = 15;
const tabuleiro = document.getElementById('tabuleiro');

for (let linha = 0; linha < tamanhoGrade; linha++) {
    for (let coluna = 0; coluna < tamanhoGrade; coluna++) {
        const celula = document.createElement('div');
        
        celula.classList.add('celula');
        celula.id = `celula-${linha+1}-${coluna+ 1}`;
        
        tabuleiro.appendChild(celula);
    }
}
const numBuracos = 1;

let buracos = [];

for (let i = 0; i < numBuracos; i++) {
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
	
        const id = celula.id;
	const partes = id.split('-');
        const linhaClicada = parseInt(partes[1]);
        const colunaClicada = parseInt(partes[2]);

	const buraco=buracos[0]
	
	if(linhaClicada==buraco.linha && colunaClicada==buraco.coluna){
		alert("vc achou");
		celula.textContent = "\u25EF";
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
