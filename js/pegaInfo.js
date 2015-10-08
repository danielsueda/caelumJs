$("#pegaInfo").click(function(){
	$.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes", 
		function(res){
			console.dir(res);

			res.instrucoes.forEach(function(instrucao) {
				adicionaCartao(instrucao.conteudo, instrucao.cor);
			});
		});
});