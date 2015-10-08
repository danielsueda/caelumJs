var criaOpcoesDoCartao = (function(){
	"use strict";

	function opcoesDeCoresDoCartao(idDoCartao){
		var cores = [{nome: "Padrão", codigo:"#EBEF40"},
					{nome: "Importante", codigo:"#F05450"},
					{nome: "Tarefa", codigo:"#92C4EC"},
					{nome: "Inspiração", codigo:"#76EF40"}
		];

		var opcoesDeCor = $("<div>").addClass("opcoesDoCartao-cores");
		
		cores.forEach(function(cor) {
			var idInputCor = "cor" + cor.nome + "-cartao" + idDoCartao;

			var inputCor = $("<input>").attr("type", "radio")
										.attr("name", "corDoBotao" + idDoCartao)
										.val(cor.codigo)
										.attr("id", idInputCor)
										.addClass("opcoesDoCartao-radioCor");
			var labelCor = $("<label>").css("color", cor.codigo)
										.attr("for", idInputCor)
										.attr("tabindex", 0)
										.addClass('opcoesDoCartao-cor')
										.addClass('opcoesDoCartao-opcao')
										.text(cor.nome);
			opcoesDeCor.data("id",idDoCartao).append(inputCor).append(labelCor);
		});

		return opcoesDeCor;
	}

	function removeCartao(){
		var cartao = document.querySelector("#cartao_"+ this.dataset.ref);
		cartao.classList.add("cartao--some");

		setTimeout(function(){
			cartao.remove();
			$(document).trigger("precisaSincronizar");
		},400);
	}

	var ehPraEditar = false;
	function toggleEdicao(){
		var cartao = $("#cartao_" + this.dataset.ref);
		var conteudo = cartao.find(".cartao-conteudo");

		if(ehPraEditar){
			ehPraEditar = false;
			conteudo.attr("contenteditable", false);
			conteudo.blur();
		}else{
			ehPraEditar = true;
			conteudo.attr("contenteditable", true);
			conteudo.focus();
		}
	}

	return function(idNovoCartao){
		//cria botao remove
		var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
										.addClass("opcoesDoCartao-opcao")
										.attr("data-ref", idNovoCartao)
										.text("Remover")
										.click(removeCartao);
		//cria botao editar
		var botaoEdita = $("<button>").addClass("opcoesDoCartao-edita")
										.addClass("opcoesDoCartao-opcao")
										.attr("data-ref", idNovoCartao)
										.text("Editar")
										.click(toggleEdicao);
		//cria o <p class = opcoesDoCartao> e insere os botoes
		var opcoes = $("<p>").addClass("opcoesDoCartao")
							.append(botaoRemove)
							.append(botaoEdita);

		var opcoesDeCor = opcoesDeCoresDoCartao(idNovoCartao);

		return $("<div>").addClass('opcoesDoCartao')
						.append(botaoRemove)
						.append(botaoEdita)
						.append(opcoesDeCor);

		//return opcoes
	}
})();