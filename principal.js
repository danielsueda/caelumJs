(function(){

document.querySelector('#mudaLayout').addEventListener("click", function(){
	var mural = document.querySelector(".mural");

	mural.classList.toggle("mural--linhas");

	if(mural.classList.contains("mural--linhas")){
		this.textContent = "Blocos";
	}else{
		this.textContent = "Linhas";
	}
});

function removeCartao(){
	var cartao = document.querySelector("#cartao_"+ this.dataset.ref);
	cartao.classList.add("cartao--some");

	setTimeout(function(){
		cartao.remove();
	},400);
}

var botoes = document.querySelectorAll(".opcoesDoCartao-remove");

for(var i = 0;i < botoes.length;i++){
	botoes[i].addEventListener("click", removeCartao);
};

var contador = $(".cartao").length;

$(".novoCartao").submit(function(event){

	var campoConteudo = $(".novoCartao-conteudo");
	var conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>");
	

	if(conteudo){
		cor = "#EBEF40";
		adicionaCartao(conteudo, cor);
	}

	campoConteudo.val("");
	event.preventDefault();
});

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

$("#busca").on("input", function(){
	var busca = $(this).val().trim();

	if(busca.length){
		$(".cartao").addClass('cartao--some').removeClass("cartao--show").filter(function(){
			return $(this).find(".cartao-conteudo").text().match(new RegExp(busca, "i"));
		}).addClass("cartao--show").removeClass('cartao--some');
	}else{
		$(".cartao").removeClass('cartao--some');

	}
});

$("#pegaInfo").click(function(){
	$.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes", 
		function(res){
			console.dir(res);

			res.instrucoes.forEach(function(instrucao) {
				adicionaCartao(instrucao.conteudo, instrucao.cor);
			});
		});
});

function adicionaCartao(conteudo, cor){
	contador++;
	//botao remove
	var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove").attr("data-ref", contador).text("Remover").click(removeCartao);
	//Div opcoes
	var opcoes = $("<div>").addClass("opcoesDoCartao").append(botaoRemove);

	var tipoCartao = decideTipoCartao(conteudo);

	var conteudoTag = $("<p>").addClass("cartao-conteudo").append(conteudo);

	$("<div>").attr("id", "cartao_"+contador)
				.addClass("cartao")
				.addClass(tipoCartao)
				.append(opcoes)
				.append(conteudoTag)
				.css("background-color", cor)
				.prependTo(".mural");
}

var usuario = "seu.email@exemplo.com";

$("#sync").click(function(){
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


$.getJSON(
	"https://ceep.herokuapp.com/cartoes/carregar?callback=?", 
	{usuario:usuario},
	function(res){
		var cartoes = res.cartoes;
		console.log(cartoes.length + " carregados em "+res.usuario);
		cartoes.forEach(function(cartao) {
			adicionaCartao(cartao.conteudo);
		});
	}

);

})()