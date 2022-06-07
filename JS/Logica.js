var mensagem = ""

//#region Eventos

function AoClicarConverterParaHora() {
    var elementoDecimal = document.getElementById("InfoDecimal")
    var valorDecimal = parseFloat(elementoDecimal.value.replace(',', '.'))

    if (VerificarNumeroInvalido(valorDecimal)){
        mensagem += "Valor decimal inválido!"
        InvalidarCampo(elementoDecimal)
        LimparCampo(elementoDecimal)
    }

    if (VerificarTemMensagem()) {
        MostrarMensagem()
        return
    }

    var valorHora = ConverterDecimalParaSexagesimal(valorDecimal)
    document.getElementById("ResultadoSexagesimal").value = valorHora
    RevalidarCampo(elementoDecimal)
}

function AoClicarConverterParaDecimal() {
    var elementoHora = document.getElementById("Hora")
    var elementoMinuto = document.getElementById("Minuto")
    var elementoSegundo = document.getElementById("Segundo")
    
    if (!ExecutarValidacaoCampoHora(elementoHora)) {
        InvalidarCampo(elementoHora)
        LimparCampo(elementoHora)
    }

    if (!ExecutarValidacaoCampoMinutoESegundo(elementoMinuto)) {
        InvalidarCampo(elementoMinuto)
        LimparCampo(elementoMinuto)
    }
    
    if(!ExecutarValidacaoCampoMinutoESegundo(elementoSegundo)) {
        InvalidarCampo(elementoSegundo)
        LimparCampo(elementoSegundo)
    }
 
    if (VerificarTemMensagem()) {
        MostrarMensagem()
        return
    }

    var resultado = ConverterSexagesimalParaDecimal(parseFloat(elementoHora.value), parseFloat(elementoMinuto.value),parseFloat(elementoSegundo.value))
    document.getElementById("ResultadoDecimal").value = resultado.toFixed(4)

    RevalidarCampo(elementoHora)
    RevalidarCampo(elementoMinuto)
    RevalidarCampo(elementoSegundo)
}

// function AoDigitarCaractere(evento) {
//     const keyCode = (evento.keyCode ? evento.keyCode : evento.wich)

//     if (keyCode < 47 && keyCode > 58) {
//         return false
//     }
// }

function AoDeixarCampo(campo) {
    if (campo.value === "") {
        return
    }

    if (campo.id.toLowerCase() === "InfoDecimal" ) {
        if (VerificarNumeroInvalido(parseFloat(campo.value))){
            mensagem += "Valor decimal inválido!"
        } else {
            RevalidarCampo(campo)
        }
    } else if (campo.id.toLowerCase() === "hora") {
        if (ExecutarValidacaoCampoHora(campo)) {
            RevalidarCampo(campo)
            return
        }
    } else {
        if (ExecutarValidacaoCampoMinutoESegundo(campo)) {
            RevalidarCampo(campo)
            return
        }
    }
 
    if (VerificarTemMensagem()) {
        MostrarMensagem()
        InvalidarCampo(campo)
        LimparCampo(campo)
    }
}

//#endregion Eventos

//#region Validações

function ExecutarValidacaoCampoHora(campo) {
    if (VerificarNumeroInvalido(parseInt(campo.value))) {
        mensagem += "Valor de hora inválido!"
        return false
    } else if (parseInt(campo.value) < 0) {
        mensagem += "Valor de hora não pode ser menor que 0!"
        return false
    }

    return true
}

function ExecutarValidacaoCampoMinutoESegundo(campo) {
    if(VerificarNumeroInvalido(parseInt(campo.value))) {
        mensagem += "Valor de " + campo.id.toLowerCase() + " inválido!"
        return false
    } else if(parseInt(campo.value) < 0) {
        mensagem += "Valor de " + campo.id.toLowerCase() + " não pode ser menor que 0!"
        return false
    } else if(parseInt(campo.value) > 59) {
        mensagem += "Valor de " + campo.id.toLowerCase() + " não pode ser maior que 59!"
        return false
    }

    return true
}

//#endregion Validações

//#region Verificações

function VerificarTemMensagem() {
    return mensagem !== ""
}

function VerificarNumeroInvalido(numero) {
    return Number.isNaN(numero) || (numero === "") || (numero === null) || (numero === undefined)
}

//#endregion Verificações

function ConverterSexagesimalParaDecimal(hora, minuto, segundo) {
    var minutoDecimal = minuto / 60
    var segundoDecimal = segundo / 3600

    return hora + minutoDecimal + segundoDecimal
}

function ConverterDecimalParaSexagesimal(valorDecimal) {
    var horaSexagesimal = parseInt(valorDecimal)
    var diferencaHora =  valorDecimal - horaSexagesimal
    var minutoSexagesimal = parseInt(diferencaHora * 60)
    var diferencaMinuto = diferencaHora * 60 - minutoSexagesimal
    var segundoSexagesimal = diferencaMinuto * 60

    return (horaSexagesimal < 10 ? "0" + horaSexagesimal : horaSexagesimal) + ":" + 
            (minutoSexagesimal < 10 ? "0" + minutoSexagesimal : minutoSexagesimal) + ":" + 
            (segundoSexagesimal < 10 ? "0" + Math.round(segundoSexagesimal) : Math.round(segundoSexagesimal)) 
}

function InvalidarCampo(campo) {
    campo.style.borderColor = "red"
}

function RevalidarCampo(campo) {
    campo.style.borderColor = "black"
}

function MostrarMensagem() {
    alert(mensagem)
    mensagem = ""
}

function LimparCampo(campo) {
    campo.value = ""
}