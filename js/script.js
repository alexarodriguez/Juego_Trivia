$(function()
{
	preguntas = [];
	var contCorrectas = 0;
	var numPregunta=0;
	var contCorrectas=0;
	var cuentaTiempo=0;/// tiempo limite 
	var tiempo =0;
	swal({title:"Bienvenido", text:"Prueba tu conocimineto", imageUrl:"./img/inicio.png"});
	//cargar json de las preguntas
	var cargarJson = function()
	{
		$.getJSON( "js/preguntas.json", function(data)
		{
			preguntas = data;
			cargarPregunta();
		});
	}();


	//Para carga la pregunta...
	var cargarPregunta = function()
	{	
		//para validar el tiempo 
		cuentaTiempo=25;
		tiempo = setInterval(function(){
									cuentaTiempo--;
									//para reiniciar el juego cuando el tiempo ha finalizado
									if (cuentaTiempo=== 0) {
										console.log("ha perdido");
										clearInterval(tiempo);
										swal({title : "Perdio", text : "Ha excedido el limite de tiempo",imageUrl:"./img/final.jpg"},
											function(){
												location.reload();
											});

									};
								$("#tiempo").html("Tiempo: " + cuentaTiempo);
							}, 1000);
		//para imprimir la pregunta en el html
		$("#pregunta").html(preguntas[numPregunta].pregunta);
		//Para cargar las opciones de respuesta... validar botones
		for(var i = 1; i <= preguntas[numPregunta].opciones.length; i++)
		{
			$("#opcion_" + i).html(preguntas[numPregunta].opciones[i - 1])
			.click(function(event) {
				var ind = Number(this.id.split("_")[1]);
				console.log(ind);
				validarRespuesta(ind);

			});

		}
	};
	//para validar la respuesta
	var validarRespuesta = function(ind)
	{
		if(preguntas[numPregunta].correcta === ind)
		{
			console.log("es correcto");
			clearInterval(tiempo);
			swal({title : "Es correcto", 
				text : "La respuesta es: "+ preguntas[numPregunta].opciones[(preguntas[numPregunta].correcta)-1],imageUrl:"./img/correcto.jpg"},
			function(){
				nuevaPregunta();
        		});
						
		}
		else
		{
			console.log(" error");
			clearInterval(tiempo);
			swal({title : "Error,Total Aciertos:"+contCorrectas, text : "La respuesta correcta era:"+ preguntas[numPregunta].opciones[(preguntas[numPregunta].correcta)-1],imageUrl:"./img/error.jpg"},
			function(){
				location.reload();
		});
		}
		
	}


	//Paracargar una nueva pregunta aumenta el contador..............
	var nuevaPregunta = function ()
	{
		if(numPregunta + 1 <= preguntas.length)
        {
            numPregunta++;
            cargarPregunta();
            contCorrectas ++;
			$("#titulo").html("Número de Aciertos:" +contCorrectas);
        }
        // prueba limite de limite de preguntas
        else(numPregunta + 1 > preguntas.length)
        {
        	swal({title : "Felicitaciones", text : "Ha ganado",imageUrl:"./img/correcto.jpg"},
			function(){
				location.reload();
			});
        };	

	};
});
