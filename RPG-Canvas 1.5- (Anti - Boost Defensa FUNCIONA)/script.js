// Barras de salud
let maxSaludJugadorPrimero = 0;
let barSaludJugadorPrimero = 0;
let maxSaludRivalPrimero = 0;
let barSaludRivalPrimero = 0;
// Personajes
let pjJugadorPrimero = "";
let pjRivalPrimero = "";
// Ataques
let ataqueJugadorPrimero = "";
let ataqueJugadorSegundo = "";
let ataqueJugadorTercero = "";
let ataqueJugadorCuarto = "";

let ataqueRivalPrimero = "";
let ataqueRivalSegundo = "";
let ataqueRivalTercero = "";
let ataqueRivalCuarto = "";

let ataquesJugador = [
  "Atq Normal",
  "Firaga I",
  "Hielo I",
  "Bio",
  "Coraza",//Aumenta Defensa
  "Prisa",//Aumenta Velocidad
];

let ataquesRival = [
  "Ataque Normal",
  "Bio",
  "Lengua Venenona",
  "Aliento Mortal",
  "Rompe-escudos" //Disminuye Defensa del objetivo
];

//Tipos de Pjs
let tiposGlobal = ["Planta", "Fuego", "Normal", "Bicho", "Tierra"];
let tipoJugadorPrimero = "";
let tipoRivalPrimero = "";
//Daño y tipos de ataque
let dañoAtaqueJugador = 0;
let tipoAtaqueJugador = "";
let dañoAtaqueRival = 0;
let tipoAtaqueRival = "";
//Sprites de Pjs
let imgjugador;
let imgrival;
//Otras variables importantes
// let ventajaJugador = false;
// let ventajaRival = false;
let mensajeDiv = document.getElementById("mensajes");
let contenidoMensaje = mensajeDiv.textContent;
let botonesAtaque = document.querySelectorAll(".botonataque");
let palabrasComprobar = ["enemigo", "usó", "enemigo se debilitó"];
//Velocidad
let velocidadJugador = 30;
let velocidadRival = 20;
//Turnos
let turnoActual = velocidadJugador >= velocidadRival ? 1 : 2;
//Comprobación si los personajes ya atacaron
let jugadorYaAtaco = false;
let rivalYaAtaco = false;
//Nivel de los personajes
let nivelJugadorPrimero = 0;
let nivelRivalPrimero = 0;
//Ataque Elegido del Jugador
let ataqueJugadorElegido = 0;
//Estados y Estadísticas alteradas
// let alientoMortalActivado = false;
// let contadoralientoMortal = 0;
//-----------------------------------------------------

//ESTADÍSTICAS GENERALES
//Estadística de DEFENSA
let defJugadorBase = 15;
let defJugador = 15;
let porcentajeDefJugador = 100;

let defRivalBase = 20;
let defRival = 20;

//Estadísticas de Ataque

//COMPROBAR ESTADOS ALTERADOS
let corazaEstaActivada = false;
let contadorCoraza = 0;
let prisaEstaActivada = false;
let contadorPrisa = "";
let ataqueCriticoEstaActivado = false;

let rompeEscudosRivalEstaActivado= false;
let contadorRompeEscudosRival = 0;

//DAÑO INFLIGIDO POR RIVAL
let dañoInfligidoPorRival = "";

let numeroAleatorio = "";

//Botón de ESTADO DEL SISTEMA
let btnStatus = document.getElementById("botonStatus");
//-------------------------------------------------------------------------------------------

//FUNCIONES DEL SISTEMA---------------------------------------------------------------------------------------------------------------------------------

//FUNCION PARA ACTIVAR ROMPE ESCUDOS RIVAL
function activarRompeEscudosRival(){
  rompeEscudosRivalEstaActivado=true;
  defJugador = Math.floor(defJugador - (defJugador*10/100));
  comprobarPorcentajeDefJugador();
}

//ACTIVAR CONTADOR DE ROMPE ESCUDOS RIVAL
let indiceContadorRompeEscudos=0
function activarContadorRompeEscudosRival(){
  if(indiceContadorRompeEscudos<4){
  indiceContadorRompeEscudos++;
  contadorRompeEscudosRival= indiceContadorRompeEscudos;
  }
}

//COMPROBAR CONTADOR ROMPE ESCUDOS RIVAL
function comprobarContadorRompeEscudosRival(){
  if (contadorRompeEscudosRival===4) {
  contadorRompeEscudosRival=0;
  }
}


//FUNCION PARA QUE ALEATORIAMENTE HAYA UN ATAQUE CRÍTICO
function obtenerResultadoAleatorio(cantidadDeNumeros) {
  numeroAleatorio = Math.random() * cantidadDeNumeros;
  return numeroAleatorio;
}

let resultadoAleatorio = obtenerResultadoAleatorio();

//FUNCION PARA ACTIVAR EL ATAQUE CRÍTICO

function comprobarAtaqueCríticoActivado() {
  obtenerResultadoAleatorio(1);
  resultadoAleatorio = numeroAleatorio;
  ataqueCriticoEstaActivado = numeroAleatorio <= 0.3;
  return ataqueCriticoEstaActivado;
}

//Funciones de movimiento PRISA

const velocidadOriginalJugador = velocidadJugador;

function activarPrisa() {
  if (prisaEstaActivada === false) {
    prisaEstaActivada = true;
    contadorPrisa = 0;
  }
  contadorPrisa++;
  velocidadJugador = Math.round(
    Math.min(velocidadOriginalJugador * 1.3 ** 4, velocidadJugador * 1.3)
  );
}

//Funciones de Movimiento Coraza
//CONTADOR CORAZA
function comprobarContadorCoraza() {
  if(corazaEstaActivada===true){
  if (contadorCoraza > 0) {
    Math.max(0, contadorCoraza--);
  }
  if (contadorCoraza === 0) {
    defJugador = Math.round(defJugador - defJugador/(5*(defJugador*1.5)));
    corazaEstaActivada = false;
  }
}
}

//INICIAR CONTADOR CORAZA
function iniciarContadorCoraza() {
  if (contadorCoraza === 0) {
    contadorCoraza = 6;
  }
}

//FUNCION PARA ACTIVAR CORAZA DEL JUGADOR
function activarCoraza() {
  if (corazaEstaActivada === false) {
    defJugador = Math.floor(defJugador * 1.5);
  }
}

//FUNCION PARA APLICAR LA REDUCCIÓN DE DAÑO POR CORAZA
function aplicarCorazaADaño() {
  if (porcentajeDefJugador === 100) {
    dañoInfligidoPorRival =
      dañoInfligidoPorRival * (porcentajeDefJugador / 100);
  } else {
    dañoInfligidoPorRival =
      dañoInfligidoPorRival -
      (dañoInfligidoPorRival * porcentajeDefJugador) / 100;
  }
}

//COMPROBAR PORCENTAJE DEFENSA JUGADOR
function comprobarPorcentajeDefJugador() {
  return (porcentajeDefJugador = Math.floor(
    (defJugador / defJugadorBase) * 100
  ));
}

//PARA ACTUALIZAR EL MENSAJE

function actualizarMsj(mensaje) {
  mensajeDiv.innerHTML = mensaje;
}

//ENTORNO JUEGO:

pjRivalPrimero = "Sapo Maligno";
pjJugadorPrimero = "Cecil";
console.log("--------------------------------------------------------------");
console.log("--SET DEL RIVAL--");

//COMPROBAR TURNOS
function comprobarTurnos() {
  if (!jugadorYaAtaco && !rivalYaAtaco) {
    if (velocidadJugador >= velocidadRival) {
      turnoActual = 1;
    } else if (velocidadJugador < velocidadRival) {
      turnoActual = 2;
      if (!jugadorYaAtaco && rivalYaAtaco) {
        turnoActual = 1;
      }
    }
  }
}

//FUNCIÓN PARA REDUCIR SALUD RIVAL

function reducirSaludRival(cantidad) {
  // Asegurarse de que no baje de 0
  comprobarAtaqueCríticoActivado();
  if (ataqueCriticoEstaActivado === true) {
    //FUNCIÓN PARA APLICAR EL DAÑO ADICIONAL POR CRITICO
    function aplicarDañoCritico() {
      if (ataqueCriticoEstaActivado === true) {
        cantidad = cantidad * 2;
      }
    }
    //Se crean elementos con etiquetas <br> y <span>
    let br = document.createElement("br");
    let span = document.createElement("span");
    span.textContent = "¡Es un golpe crítico!";
    // Agregar el <br> y el <span> al mensajeDiv
    mensajeDiv.appendChild(br);
    mensajeDiv.appendChild(span);
    aplicarDañoCritico();
    console.log("¡Es un golpe crítico!");
  }
  barSaludRivalPrimero = Math.max(0, barSaludRivalPrimero - cantidad);
  actualizarBarraSaludRival();
  console.log("La salud del rival es: " + barSaludRivalPrimero);
}

//FUNCIÓN PARA REDUCIR SALUD JUGADOR
function reducirSaludJugador(cantidad) {
  dañoInfligidoPorRival = cantidad;
  if (porcentajeDefJugador === 100) {
    dañoInfligidoPorRival =
      dañoInfligidoPorRival * (porcentajeDefJugador / 100);
  } else {
    dañoInfligidoPorRival =
      dañoInfligidoPorRival -
      (dañoInfligidoPorRival * (porcentajeDefJugador - 100)) / 100;
  }
  barSaludJugadorPrimero = Math.floor(
    Math.max(0, barSaludJugadorPrimero - dañoInfligidoPorRival)
  );
  actualizarBarraSaludJugador();
}

//INICIALIZAR EL MSJ AL INICIAR LA BATALLA

resetTurnos();

//SET DEL RIVAL: ---------------------------------------------------------------------------------------------------------------------------------------

console.log("Personaje rival: " + pjRivalPrimero);
if (pjRivalPrimero === "Sapo Maligno") {
  // SE ESTABLECE LA BARRA DE SALUD RIVAL
  maxSaludRivalPrimero = 50;
  barSaludRivalPrimero = 50;
  console.log("Barra de Salud del Rival: " + barSaludRivalPrimero);
  // SE ESTABLECE LA IMAGEN DEL PJ RIVAL
  imgrival = document.getElementById("imgrival");
  imgrival.setAttribute("src", "./img/sapomaligno.png");
  // SE ESTABLECE EL NOMBRE DEL PJ RIVAL
  nombrerival = document.getElementById("nombrerival");
  nivelRivalPrimero = 5;
  nombrerival.innerHTML =
    `${pjRivalPrimero}` + `<span> &nbsp; </span>` + `Nv.${nivelRivalPrimero}`;
  // SE MUESTRA ESCRITA LA BARRA DE SALUD RIVAL
  litsaludrival = document.getElementById("litsaludrival");
  litsaludrival.innerText = barSaludRivalPrimero + " / " + maxSaludRivalPrimero;
  // SE ESTABLECE EL TIPO DE PJ RIVAL
  tipoRivalPrimero = tiposGlobal[0];
  console.log("El tipo del rival es: " + tipoRivalPrimero);
  // SE ESTABLECE LOS ATAQUES DEL PJ RIVAL
  ataqueRivalPrimero = ataquesRival[0];
  ataqueRivalSegundo = ataquesRival[1];
  ataqueRivalTercero = ataquesRival[2];
  ataqueRivalCuarto = ataquesRival[4];
  actualizarBarraSaludRival();
}

//FUNCIÓN PARA ACTUALIZAR BARRA DE SALUD RIVAL
function actualizarBarraSaludRival() {
  if (barSaludRivalPrimero > 0) {
    barraSaludRival = document.getElementById("barraSaludRival");
    porcentajeRival = (barSaludRivalPrimero / maxSaludRivalPrimero) * 100;
    barraSaludRival.style.width = `${porcentajeRival}%`;
    litsaludrival = document.getElementById("litsaludrival");
    litsaludrival.innerText =
      barSaludRivalPrimero + " / " + maxSaludRivalPrimero;
  } else if (barSaludRivalPrimero === 0) {
    barraSaludRival = document.getElementById("barraSaludRival");
    porcentajeRival = (barSaludRivalPrimero / maxSaludRivalPrimero) * 0;
    barraSaludRival.style.width = `${porcentajeRival}%`;
    litsaludrival = document.getElementById("litsaludrival");
    litsaludrival.innerText =
      barSaludRivalPrimero + " / " + maxSaludRivalPrimero;
  }
}

//ACCIONA EL ATAQUE DEL RIVAL
function ataqueRival() {
  if (barSaludRivalPrimero > 0) {
    let ataqueAleatorio = obtenerAtaqueAleatorioRival();
    ataqueAleatorio();
    rivalYaAtaco = true;
    toggleBotonesAtaque(true);
    console.log("La salud del jugador es: " + barSaludJugadorPrimero);
    tipoAtaqueRival = "";
  } else {
    console.log("¡" + pjRivalPrimero + " se debilitó!");
    toggleBotonesAtaque(true);
  }
  comprobarTurnos();
}

//FUNCION PARA ACTIVAR ATAQUE1 DEL RIVAL
function activarAtaqueRivalPrimero() {
  if (ataqueRivalPrimero === ataquesRival[0]) {
    ataqueNormal();
    mensajes = document.getElementById("mensajes");
    actualizarMsj(
      "¡" + pjRivalPrimero + " enemigo" + " usó " + ataquesRival[0] + "!"
    );
  }
}

//FUNCION PARA ACTIVAR ATAQUE2 DEL RIVAL
function activarAtaqueRivalSegundo() {
  if (ataqueRivalSegundo === ataquesRival[1]) {
    Bio();
    actualizarMsj(
      "¡" + pjRivalPrimero + " enemigo" + " usó " + ataquesRival[1] + "!"
    );
  }
}

//FUNCION PARA ACTIVAR ATAQUE3 DEL RIVAL
function activarAtaqueRivalTercero() {
  if (ataqueRivalTercero === ataquesRival[2]) {
    lenguaVenenosa();
    actualizarMsj(
      "¡" + pjRivalPrimero + " enemigo" + " usó " + ataquesRival[2] + "!"
    );
  }
}

//FUNCION PARA ACTIVAR ATAQUE4 DEL RIVAL
function activarAtaqueRivalCuarto() {
  if (ataqueRivalCuarto === ataquesRival[3]) {
    alientoMortal();
    actualizarMsj(
      "¡" + pjRivalPrimero + " enemigo" + " usó " + ataquesRival[3] + "!"
    );
  } else if (ataqueRivalCuarto === ataquesRival[4]){
    rompeEscudosRival();
    actualizarMsj(
      "¡" + pjRivalPrimero + " enemigo" + " usó " + ataquesRival[4] + "!" + "<br>" + "¡Defensa de " + pjJugadorPrimero + " disminuyó!"
    );
  }
}

//FUNCIONES DE ATAQUES INDIVIDUALES DEL RIVAL

//ACTIVA ATAQUE NORMAL DEL RIVAL
function ataqueNormal() {
  console.log("¡" + pjRivalPrimero + " usó " + ataquesRival[0] + "!");
  reducirSaludJugador(7);
  actualizarBarraSaludJugador();
}

//ACTIVA ATAQUE BIO DEL RIVAL
function Bio() {
  console.log("¡" + pjRivalPrimero + " usó " + ataquesRival[1] + "!");
  reducirSaludJugador(7);
  actualizarBarraSaludJugador();
}

//ACTIVA ATAQUE LENGUA VENENOSA DEL RIVAL
function lenguaVenenosa() {
  console.log("¡" + pjRivalPrimero + " usó " + ataquesRival[2] + "!");
  reducirSaludJugador(4);
  actualizarBarraSaludJugador();
}

//ACTIVA ATAQUE ALIENTO MORTAL DEL RIVAL
function alientoMortal() {
  console.log("¡" + pjRivalPrimero + " usó " + ataquesRival[3] + "!");
  reducirSaludJugador(5);
  actualizarBarraSaludJugador();
}

//ACTIVA ATAQUE ROMPE ESCUDOS DEL RIVAL
function rompeEscudosRival() {
  console.log("¡" + pjRivalPrimero + " usó " + ataquesRival[4] + "!");
  reducirSaludJugador(0);
  activarRompeEscudosRival();
  activarContadorRompeEscudosRival();
  actualizarBarraSaludJugador();
}

//OBTENER UN ATAQUE ALEATORIO EL RIVAL
let funcionesDeAtaques = [
  activarAtaqueRivalPrimero,
  // activarAtaqueRivalSegundo,
  // activarAtaqueRivalTercero,
  activarAtaqueRivalCuarto,
];
function obtenerAtaqueAleatorioRival() {
  let indiceAleatorio = Math.floor(Math.random() * funcionesDeAtaques.length);
  return funcionesDeAtaques[indiceAleatorio];
}

//SET DEL JUGADOR:---------------------------------------------------------------------------------------------------------------------------------------

console.log("-------------------------------------------------------------");
console.log("--SET DEL JUGADOR--");
console.log("Pj del Jugador: " + pjJugadorPrimero);

if (pjJugadorPrimero === "Cecil") {
  // SE ESTABLECE LA BARRA DE SALUD JUGADOR
  maxSaludJugadorPrimero = 65;
  barSaludJugadorPrimero = 65;
  console.log("Barra de Salud del Jugador: " + barSaludJugadorPrimero);
  // SE ESTABLECE LA IMAGEN DEL PJ JUGADOR
  imgjugador = document.getElementById("imgjugador");
  imgjugador.setAttribute("src", "./img/cecil.png");
  // SE ESTABLECE EL NOMBRE DEL PJ JUGADOR
  nombrejugador = document.getElementById("nombrejugador");
  nivelJugadorPrimero = 6;
  nombrejugador.innerHTML =
    `${pjJugadorPrimero}` +
    `<span> &nbsp; </span>` +
    `Nv.${nivelJugadorPrimero}`;
  // SE MUESTRA ESCRITA LA BARRA DE SALUD JUGADOR
  litsaludjugador = document.getElementById("litsaludjugador");
  litsaludjugador.innerText =
    barSaludJugadorPrimero + " / " + maxSaludJugadorPrimero;
  // SE ESTABLECE EL TIPO DE POKE JUGADOR
  tipoJugadorPrimero = tiposGlobal[1];
  console.log("El tipo del jugador es: " + tipoJugadorPrimero);
  // SE ESTABLECE LOS ATAQUES DEL PJ JUGADOR
  ataqueJugadorPrimero = ataquesJugador[0];
  ataqueJugadorSegundo = ataquesJugador[1];
  ataqueJugadorTercero = ataquesJugador[4];
  ataqueJugadorCuarto = ataquesJugador[5];
  actualizarBarraSaludJugador();
}
console.log("-------------------------------------------------------------");
//HP------------------------------------------------------------------------
//ACTUALIZA BARRA DE SALUD DEL JUGADOR

function actualizarBarraSaludJugador() {
  if (barSaludJugadorPrimero > 0) {
    barraSaludJugador = document.getElementById("barraSaludJugador");
    porcentajeJugador = (barSaludJugadorPrimero / maxSaludJugadorPrimero) * 100;
    barraSaludJugador.style.width = `${porcentajeJugador}%`;
    litsaludjugador = document.getElementById("litsaludjugador");
    litsaludjugador.innerText =
      barSaludJugadorPrimero + " / " + maxSaludJugadorPrimero;
  } else if (barSaludJugadorPrimero <= 0) {
    barraSaludJugador = document.getElementById("barraSaludJugador");
    porcentajeJugador = (barSaludJugadorPrimero / maxSaludJugadorPrimero) * 0;
    barraSaludJugador.style.width = `${porcentajeJugador}%`;
    litsaludjugador = document.getElementById("litsaludjugador");
    litsaludjugador.innerText =
      barSaludJugadorPrimero + " / " + maxSaludJugadorPrimero;
  }
}

//FUNCIONES DE ACTIVACIÓN DE ATAQUES-----------------------------------------

//ESTABLECE EL ATAQUE1 DEL JUGADOR EN UN BOTÓN (ESCRITO)
if (ataqueJugadorPrimero === ataquesJugador[0]) {
  ataqueprimerobtn = document.getElementById("ataqueprimerobtn");
  ataqueprimerobtn.innerHTML = ataquesJugador[0];
}

//ESTABLECE EL ATAQUE2 DEL JUGADOR EN UN BOTÓN (ESCRITO)
if (ataqueJugadorSegundo === ataquesJugador[1]) {
  ataquesegundobtn = document.getElementById("ataquesegundobtn");
  ataquesegundobtn.innerHTML = ataquesJugador[1];
}

//ESTABLECE EL ATAQUE3 DEL JUGADOR EN UN BOTÓN (ESCRITO)
if (ataqueJugadorTercero === ataquesJugador[2]) {
  ataquetercerobtn = document.getElementById("ataquetercerobtn");
  ataquetercerobtn.innerHTML = ataquesJugador[2];
} else if(ataqueJugadorTercero === ataquesJugador[4]){
  ataquetercerobtn.innerHTML = ataquesJugador[4];
}

//ESTABLECE EL ATAQUE4 DEL JUGADOR EN UN BOTÓN (ESCRITO)
if (ataqueJugadorCuarto === ataquesJugador[4]) {
  ataquecuartobtn = document.getElementById("ataquecuartobtn");
  ataquecuartobtn.innerHTML = ataquesJugador[4];
} else if (ataqueJugadorCuarto === ataquesJugador[5]) {
  ataquecuartobtn = document.getElementById("ataquecuartobtn");
  ataquecuartobtn.innerHTML = ataquesJugador[5];
}

//------------------------------------------------------------------------

//ACTIVA EL ATAQUE 1 DEL JUGADOR DESDE EL BOTÓN
function ataqueJugador1() {
  if (barSaludRivalPrimero > 0 && barSaludJugadorPrimero > 0) {
    if (barSaludRivalPrimero > 0) {
      if (ataqueJugadorPrimero === ataquesJugador[0]) {
        ataqueNormalJugador();
        jugadorYaAtaco = true;
        toggleBotonesAtaque(true);
      }
    }
  }
}

//ACTIVA EL ATAQUE 2 DEL JUGADOR DESDE EL BOTÓN

function ataqueJugador2() {
  if (barSaludRivalPrimero > 0 && barSaludJugadorPrimero > 0) {
    if (barSaludRivalPrimero > 0) {
      if (ataqueJugadorSegundo === ataquesJugador[1]) {
        firagaJugador();
        jugadorYaAtaco = true;
        toggleBotonesAtaque(true);
      }
    }
  }
}

//ACTIVA EL ATAQUE 3 DEL JUGADOR DESDE EL BOTÓN

function ataqueJugador3() {
  if (barSaludRivalPrimero > 0 && barSaludJugadorPrimero > 0) {
    if (barSaludRivalPrimero > 0) {
      if (ataqueJugadorTercero === ataquesJugador[2]) {
        hieloJugador();
        jugadorYaAtaco = true;
        toggleBotonesAtaque(true);
      } else if(ataqueJugadorTercero === ataquesJugador[4]){
        corazaJugador();
        jugadorYaAtaco=true;
        toggleBotonesAtaque(true);
      }
    }
  }
}

//ACTIVA EL ATAQUE 4 DEL JUGADOR DESDE EL BOTÓN

function ataqueJugador4() {
  if (barSaludRivalPrimero > 0 && barSaludJugadorPrimero > 0) {
    if (barSaludRivalPrimero > 0) {
      if (ataqueJugadorCuarto === ataquesJugador[5]) {
        prisaJugador();
        jugadorYaAtaco = true;
        toggleBotonesAtaque(true);
      }
    }
  }
}

//FUNCIONES DE ATAQUES INDIVIDUALES DEL JUGADOR-------------------------------------------------

//ACCIONA ATAQUE NORMAL DEL JUGADOR

function ataqueNormalJugador() {
  console.log("¡" + pjJugadorPrimero + " usó " + ataquesJugador[0] + "!");
  tipoAtaqueJugador = tiposGlobal[2];
  actualizarMsj("¡" + pjJugadorPrimero + " usó " + ataquesJugador[0] + "!");
  reducirSaludRival(7);
  actualizarBarraSaludRival();
}

//ACCIONA ATAQUE FIRAGA DEL JUGADOR
function firagaJugador() {
  console.log("¡" + pjJugadorPrimero + " usó " + ataquesJugador[1] + "!");
  tipoAtaqueJugador = tiposGlobal[1];
  actualizarMsj("¡" + pjJugadorPrimero + " usó " + ataquesJugador[1] + "!");
  reducirSaludRival(15);
  actualizarBarraSaludRival();
}

//ACCIONA ATAQUE HIELO DEL JUGADOR
function hieloJugador() {
  console.log("¡" + pjJugadorPrimero + " usó " + ataquesJugador[2] + "!");
  tipoAtaqueJugador = tiposGlobal[3];
  actualizarMsj("¡" + pjJugadorPrimero + " usó " + ataquesJugador[2] + "!");
  reducirSaludRival(10);
  actualizarBarraSaludRival();
}

//ACCIONA ATAQUE BIO DEL JUGADOR
function bioJugador() {
  console.log("¡" + pjJugadorPrimero + " usó " + ataquesJugador[3] + "!");
  tipoAtaqueJugador = tiposGlobal[2];
  actualizarMsj("¡" + pjJugadorPrimero + " usó " + ataquesJugador[3] + "!");
  reducirSaludRival(5);
  actualizarBarraSaludRival();
}

//ACCIONA EL MOVIMIENTO CORAZA

function corazaJugador() {
  console.log("¡" + pjJugadorPrimero + " usó " + ataquesJugador[4] + "!");
  actualizarMsj("¡" + pjJugadorPrimero + " usó " + ataquesJugador[4] + "!");
  activarCoraza();
  iniciarContadorCoraza();
  corazaEstaActivada = true;
  comprobarPorcentajeDefJugador();
}

//ACCIONA EL MOVIMIENTO PRISA
function prisaJugador() {
  console.log("¡" + pjJugadorPrimero + " usó " + ataquesJugador[5] + "!");
  actualizarMsj(
    "¡" +
      pjJugadorPrimero +
      " usó " +
      ataquesJugador[5] +
      "!" +
      "<br>" +
      "¡Velocidad subió!"
  );
  activarPrisa();
} //--------------------------------------------------------------------------------------------------------------------------------------

//RESETEAR LOS TURNOS

function resetTurnos() {
  actualizarMsj("¿Qué deseas hacer?");
  jugadorYaAtaco = false;
  rivalYaAtaco = false;
  ataqueJugadorElegido = 0;
  toggleBotonesAtaque(false);
  comprobarContadorCoraza();
  // comprobarContadorRompeEscudosRival();
  comprobarTurnos();
}

//ACTIVAR/DESACTIVAR BOTONES

function toggleBotonesAtaque(disable) {
  botonesAtaque.forEach((button) => {
    button.disabled = disable;
  });
}

//DESACTIVAR MENSAJE
function desactivarMensaje() {
  mensajeDiv.style.pointerEvents = "none";
}

//CONTROLA EL MENSAJE AL HACER CLICK
function manejarClickMensaje() {
  comprobarTurnos();
  let contenidoMensaje = mensajeDiv.textContent;
  if (
    !rivalYaAtaco &&
    jugadorYaAtaco &&
    turnoActual === 1 &&
    barSaludJugadorPrimero > 0 &&
    barSaludRivalPrimero > 0
  ) {
    ataqueRival();
    turnoActual = 2;
  } else if (
    contenidoMensaje.includes(palabrasComprobar[0]) &&
    contenidoMensaje.includes(palabrasComprobar[1]) &&
    rivalYaAtaco &&
    jugadorYaAtaco &&
    turnoActual === 2 &&
    barSaludJugadorPrimero > 0 &&
    barSaludRivalPrimero > 0
  ) {
    resetTurnos();
  } else if (barSaludRivalPrimero <= 0) {
    actualizarMsj("¡" + pjRivalPrimero + " enemigo se debilitó!");
    console.log("¡" + pjRivalPrimero + " se debilitó!");
    toggleBotonesAtaque(true);
    if (contenidoMensaje.includes(palabrasComprobar[2])) {
      actualizarMsj("¡Has ganado la batalla!");
      toggleBotonesAtaque(true);
      desactivarMensaje();
    }
  } else if (barSaludJugadorPrimero <= 0) {
    actualizarMsj("¡" + pjJugadorPrimero + " se ha debilitado!");
    toggleBotonesAtaque(true);
    if (contenidoMensaje.includes(" se ha debilitado!")) {
      actualizarMsj("Has perdido la batalla.");
      toggleBotonesAtaque(true);
      desactivarMensaje();
    }
  } else if (
    barSaludJugadorPrimero > 0 &&
    barSaludRivalPrimero > 0 &&
    turnoActual === 2 &&
    rivalYaAtaco &&
    !jugadorYaAtaco
  ) {
    if (ataqueJugadorElegido === 1) {
      turnoActual = 1;
      ataqueJugador1();
    } else if (ataqueJugadorElegido === 2) {
      turnoActual = 1;
      ataqueJugador2();
    } else if (ataqueJugadorElegido === 3) {
      turnoActual = 1;
      ataqueJugador3();
    } else if (ataqueJugadorElegido === 4) {
      turnoActual = 1;
      ataqueJugador4();
    }
  } else if (
    barSaludJugadorPrimero > 0 &&
    barSaludRivalPrimero > 0 &&
    jugadorYaAtaco &&
    rivalYaAtaco &&
    turnoActual === 1
  ) {
    resetTurnos();
  }
}

//AGREGA EVENT LISTENERS A LOS BOTONES DE ATAQUE

//FUNCION QUE DETECTA QUE ATAQUE DE JUGADOR SE HA ELEGIDO
function detectarAtaqueJugador(numeroDeAtaqueElegido) {
  return (ataqueJugadorElegido = numeroDeAtaqueElegido);
}

//EL PRIMER BOTON DE ATAQUE
document.getElementById("ataqueprimerobtn").addEventListener("click", () => {
  detectarAtaqueJugador(1);
  if (turnoActual === 1 && !jugadorYaAtaco) {
    ataqueJugador1();
  } else if (turnoActual === 2 && !rivalYaAtaco) {
    ataqueRival();
  }
});

//EL SEGUNDO BOTON DE ATAQUE
document.getElementById("ataquesegundobtn").addEventListener("click", () => {
  detectarAtaqueJugador(2);
  if (turnoActual === 1 && !jugadorYaAtaco) {
    ataqueJugador2();
  } else if (turnoActual === 2 && !rivalYaAtaco) {
    ataqueRival();
  }
});

//EL TERCER BOTON DE ATAQUE
document.getElementById("ataquetercerobtn").addEventListener("click", () => {
  detectarAtaqueJugador(3);
  if (turnoActual === 1 && !jugadorYaAtaco) {
    ataqueJugador3();
  } else if (turnoActual === 2 && !rivalYaAtaco) {
    ataqueRival();
  }
});

//EL CUARTO BOTON DE ATAQUE
document.getElementById("ataquecuartobtn").addEventListener("click", () => {
  detectarAtaqueJugador(4);
  if (turnoActual === 1 && !jugadorYaAtaco) {
    ataqueJugador4();
  } else if (turnoActual === 2 && !rivalYaAtaco) {
    ataqueRival();
  }
});

//AGREGAR EVENT LISTENER AL MENSAJE
mensajeDiv.addEventListener("click", manejarClickMensaje);

//EVENTLISTENER PARA EL BOTON STATUS

btnStatus.addEventListener("click", () => {
  console.log("------Estado:-------");
  console.log("Salud Jugador: " + barSaludJugadorPrimero);
  console.log("Salud Rival: " + barSaludRivalPrimero);
  // console.log("¿Jugador ya atacó?: " + jugadorYaAtaco);
  // console.log("Rival ya atacó?: " + rivalYaAtaco);
  // console.log("Turno actual: " + turnoActual);
  // console.log("Ataque Jugador Elegido: " + ataqueJugadorElegido);
  console.log(`Defensa del Jugador: ${defJugador}`);
  console.log(`Porcentaje Def Jugador: ${porcentajeDefJugador}`);
  console.log(`Coraza está activada: ${corazaEstaActivada}`);
  console.log(`Contador de Coraza: ${contadorCoraza}`);
  console.log(`Daño infligido por Rival: ${dañoInfligidoPorRival}`);
  console.log(`Velocidad del Jugador: ${velocidadJugador}`);
  console.log(`Velocidad del Rival: ${velocidadRival}`);
  console.log(`Contador de Rompe Escudos: ${contadorRompeEscudosRival}`);
  console.log(`Rompe Escudos está activado: ${rompeEscudosRivalEstaActivado}`);
  console.log("------Estado:-------");
});
