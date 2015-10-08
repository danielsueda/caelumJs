var usuario = "seu.email@exemplo.com";

$("#sync").click(function(){
	$(document).trigger("precisaSincronizar");
});


$.getJSON(
	"https://ceep.herokuapp.com/cartoes/carregar?callback=?", 
	{usuario:usuario},
	function(res){
		var cartoes = res.cartoes;
		console.log(cartoes.length + " carregados em "+res.usuario);
		cartoes.forEach(function(cartao) {
			controladorDeCartao.add(cartao.conteudo);
		});
	}

);


$(document).on("precisaSincronizar", function(){
	$("#sync").removeClass("botaoSync--sincronizado");
	$("#sync").addClass("botaoSync--esperando");

	var cartoes = [];

	$(".cartao").each(function(){
		var cartao = {};
		cartao.conteudo = $(this).find(".cartao-conteudo").html();
		cartoes.push(cartao);
	});

	var mural = {
		usuario: usuario,
		cartoes: cartoes
	}

	$.ajax({
		url: "https://ceep.herokuapp.com/cartoes/salvar",
		method: "POST",
		data: mural,
		success: function(res){
			console.log(res.quantidade + " cartões salvos em "+ res.usuario);
			$("#sync").addClass("botaoSync--sincronizado");
		},
		error: function(){
			console.log("Não foi possível salvar o mural");
			$("#sync").addClass("botaoSync--deuRuim");
		},
		complete: function(){
			$("#sync").removeClass("botaoSync--esperando");
		}
	});
});
