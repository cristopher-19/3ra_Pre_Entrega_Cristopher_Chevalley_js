//Inicializacion de variables
let tarjetasDestapadas =0;
let tarjeta1= null;
let tarjeta2= null;
let primerResultado = null;
let segundoResultado = null;
let numeros= [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let movimientos= null;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId= null;
//apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');


numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros)

//Funcion principal
//llamamo funcion de destapar para que al hacer click en las cartas el contador valla sumando

function contarTiempo (){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0 ){
        clearInterval(tiempoRegresivoId);
        bloquearTarjetas();
    }
    }, 1000)
    
}

function bloquearTarjetas(){
    for(let i = 0; i <=15; i++){
        let tarjetaBloqueada = document.getElementById(i)
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id){

    if (temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas)

    //Mostramos dento de las tarjetas el numero generado aleatoriamente
    if(tarjetasDestapadas == 1 ){
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = primerResultado;
        //Deshabilito la primera tarjeta
        tarjeta1.disabled =true;

    }else if(tarjetasDestapadas ==2 ){
        //mostramos el segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id]
        tarjeta2.innerHTML = segundoResultado

        //deshabilitamos la segunda tarjeta
        tarjeta2.disabled = true;
        

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

       if(primerResultado == segundoResultado){
        //encerar contador tarjetas destapadas
        tarjetasDestapadas = 0;
        // aumentar aciertos
        aciertos++;
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
        if(aciertos == 8) {
            clearInterval(tiempoRegresivoId);
            mostrarAciertos.innerHTML = `Aciertos : ${aciertos}😎`;
            mostrarTiempo.innerHTML = `Buena mastar 🎉 solo tardaste ${timerInicial - timer} Segundos`
            mostrarMovimientos.innerHTML = `Movimientos : ${movimientos}✨`
        }
       }else{
        //mostrar momentaneamente el valor y volver a tapar
        setTimeout(()=>{
            tarjeta1.innerHTML = ' ';
            tarjeta2.innerHTML = ' ';
            tarjeta1.disabled = false;
            tarjeta2.disabled = false
            tarjetasDestapadas = 0;
        },800);
       }
    }
}