(function(controladorDeCartao){
	"use-strict";

	$(".novoCartao").submit(function(event){

		var campoConteudo = $(".novoCartao-conteudo");
		var conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>");
		

		if(conteudo){
			controladorDeCartao.add(conteudo, cor);
			$(document).trigger("precisaSincronizar");
		}

		campoConteudo.val("");
		event.preventDefault();
	});
})(controladorDeCartao);