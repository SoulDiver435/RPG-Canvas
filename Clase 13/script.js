//FUNCIONES

//Funciones declarativas o declaradas
//Dependiendo de la bibliografía, se puede encontrar como FUNCIONES como PROCEDURES - MÉTODOS

function saludar(){
return "Hola, cómo estás Juanma";
}

//Invocando la funcion
let mensaje= saludar();
console.log(mensaje);

let mensaje1= saludar();
console.log(mensaje1);

//FUNCIONES PARAMETRICAS

function saludar3(nombre){
    return `Hola qué tal ${nombre}`

}

let mensaje3= saludar3("Mario");
console.log(mensaje3);

//---------------------------------------------------------------------------------
//EJERCICIO EN CLASE 1
//Crear una función que se llame sumar, la cual debe recibir dos valores y debe retornar la sumatoria de los mismos
//Debe mostrar los resultados con write en la pantalla

// let num1="";
// let num2="";
// let sumaFinal="";

// num1= Number(prompt(`Ingrese el número 1:`));
// num2= Number(prompt(`Ingrese el número 2:`));

// // function sumar(){
// // return sumaFinal= num1+ num2;
// // }

// function sumar(numero1, numero2){
//     numero1=num1;
//     numero2=num2;
//     return sumaFinal= num1+ num2;
// }

// sumar();

// document.write(`<h2>La suma de ${num1} + ${num2} = ${sumaFinal}</h2>`);

//Pedir valor 1, valor 2, y luego preguntar la operación que se debe hacer

let valor1="";
let valor2="";
let operacion="";
let resultado="";

valor1= Number(prompt(`Ingrese el número 1`));
valor2= Number(prompt(`Ingrese el número 2`));
operacion= prompt(`¿Qué operación desea realizar? *(Multiplicación) / (División) + (Suma) - (Resta)`);

function efectuarOperacion(){
    if(operacion==="*"){
        resultado= valor1*valor2;
    } else if (operacion==="/"){
        resultado=valor1/valor2;
    }else if(operacion==="+"){
        resultado=valor1+valor2;
    }else if(operacion==="-"){
        resultado=valor1-valor2;
    }else{
        alert(`La operación debe ser: + - * /`)
    }
}

efectuarOperacion();

document.write(`<h2> El resultado de ${valor1} ${operacion} ${valor2} = ${resultado} </h2>`);
