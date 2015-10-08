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