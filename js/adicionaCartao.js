var controladorDeCartao = (function(){
	"use strict";
	var contador = 0;

	var module = {};
	function clickCor(event){
		var $origin = $(event.target);
		var $this = $(this);
		if($origin.hasClass('opcoesDoCartao-radioCor')){
			$this.css("background",  $origin.val());
			console.log($origin.val());
		}
	}

	module.adicionaCartao = function(conteudo, cor){
		contador++;
		//botao remove
		//var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove").attr("data-ref", contador).text("Remover").click(removeCartao);
		//Div opcoes
		//var opcoes = $("<div>").addClass("opcoesDoCartao").append(botaoRemove);
		var opcoes = criaOpcoesDoCartao(contador);

		var tipoCartao = decideTipoCartao(conteudo);

		var conteudoTag = $("<p>").addClass("cartao-conteudo").append(conteudo);
		var cartao = $("<div>");

		cartao.on("click", clickCor);

		cartao.attr("id", "cartao_"+contador)
					.attr("tabindex", 0)
					.addClass("cartao")
					.addClass(tipoCartao)
					.append(opcoes)
					.append(conteudoTag)
					.css("background-color", cor)
					.prependTo(".mural");
	}


/*	function removeCartao(conteudo){
		var cartao = document.querySelector("#cartao_"+ this.dataset.ref);
		cartao.classList.add("cartao--some");

		setTimeout(function(){
			cartao.remove();
			$(document).trigger("precisaSincronizar");
		},400);
	}*/

	function decideTipoCartao(conteudo){

		var quebras = conteudo.split("<br>").length;
		var totalDeLetras = conteudo.replace(/<br>/g, " ").length;

		var ultimoMaior = "";
		conteudo.replace(/<br>/g," ").split(' ').forEach(function(palavra){
			if(palavra.length > ultimoMaior.length){
				ultimoMaior = palavra;
			}
		});

		var tamMaior = ultimoMaior.length;
		var tipoCartao = "cartao--textoPequeno";

		if(tamMaior < 9 && quebras < 5 && totalDeLetras < 55){
			tipoCartao = "cartao--textoGrande";
		}else if(tamMaior < 12 && quebras < 6 && totalDeLetras < 75){
			tipoCartao = "cartao--textoMedio";
		}
		return tipoCartao;
	}

	return {
		add: module.adicionaCartao
	};

})();