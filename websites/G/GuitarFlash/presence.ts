const presence = new Presence({
  clientId: "833810720373080125"
});

presence.on("UpdateData", async () => {

	const buttons = await presence.getSetting("buttons");

	const presenceData: PresenceData = {
		largeImageKey: "2"
	};

	const browsingStamp: number = Math.floor(Date.now() / 1000);

	if(document.querySelector('.menuE') && document.querySelector('.menuE').textContent === "Jogar"){

		if(document.querySelector('#colunaMeio > #menuMusicas > p.tagH2') && document.querySelector('#colunaMeio > #menuMusicas > p.tagH2').textContent === "Lista de Músicas"){
			presenceData.details = "Escolhendo música";
		}else if(document.querySelector('div#divJogo > #jogoTitulo > #jogoTituloMusica')){

			let music: string = document.querySelector('div#divJogo > #jogoTitulo > #jogoTituloMusica').textContent;
			presenceData.details = music;
			presenceData.startTimestamp = browsingStamp;

		}else{
			presenceData.details = "Jogando";
		}

	}else if(document.querySelector('.menuE') && document.querySelector('.menuE').textContent === "Multiplayer"){

		presenceData.details = "Multiplayer";

		if(document.querySelector('#fsChat > div > input')){
			if(buttons){
				let value: string = document.querySelector('#fsChat > div > input').getAttribute('value');
				presenceData.buttons = [
					{
						label: value ? value : "Jogar",
						url: 'http://guitarflash.com/'
					}
				];
				presenceData.state = "Aguardando jogadores";

			}

			if(document.querySelector('div#divJogo > #jogoTitulo > #jogoTituloMusica')){

				let music: string = document.querySelector('div#divJogo > #jogoTitulo > #jogoTituloMusica').textContent;
				presenceData.details = music;
				delete presenceData.state;
				presenceData.startTimestamp = browsingStamp;

			}else if(document.querySelector('.fsBot > .fsBotD')){
				presenceData.state = `Jogadores: ${
					document.querySelectorAll('#fsJogCt > .fsJogNm').length ?
					document.querySelectorAll('#fsJogCt > .fsJogNm').length :
					1
				}`;
			}else if(document.querySelector('#fsVotE')){
				presenceData.details = "Multiplayer";
				presenceData.state = "Escolhendo música";
			}
		}

	}else{
		presenceData.details = document.querySelector('.menuE').textContent ? document.querySelector('.menuE').textContent : "Menu";
	}

	presence.setActivity(presenceData);

});