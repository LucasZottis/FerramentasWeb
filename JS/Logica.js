var mensagem = ""

//#region Eventos

function AoClicarConverterParaSexagesimal() {
    var elementoDecimal = document.getElementById("InfoDecimal")

    if (Number.isNaN(parseFloat(elementoDecimal.value))) {
        InvalidarCampoDecimal(elementoDecimal)
    } else {
        var valorHora = ConverterDecimalParaSexagesimal(parseFloat(elementoDecimal.value))
        document.getElementById("ResultadoSexagesimal").value = valorHora
        RevalidarCampo(elementoDecimal)
    }
}

function AoClicarConverterParaDecimal() {
    if (!ExecutarValidacaoCampoHorario(elementoHora.id.toLowerCase(), parseInt(elementoHora.value)) ) {
        InvalidarCampoHorario(elementoHora)
    }

    if (!ExecutarValidacaoCampoHorario(elementoMinuto.id.toLowerCase(), parseInt(elementoMinuto.value)) ) {
        InvalidarCampoHorario(elementoMinuto)
    }

    if (!ExecutarValidacaoCampoHorario(elementoSegundo.id.toLowerCase(), parseInt(elementoSegundo.value)) ) {
        InvalidarCampoHorario(elementoSegundo)
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

function AoDigitarCaractere(evento) {
    const keyCode = (evento.keyCode ? evento.keyCode : evento.wich)

    if (keyCode < 47 && keyCode > 58) {
        return false
    }
}

function AoDeixarCampo(campo) {
    if (campo.value !== "" && ExecutarValidacaoCampoHorario(campo)) {
        InvalidarCampoHorario(campo)
        campo.value = ""
        return
    }
}

//#endregion Eventos

function ExecutarValidacaoCampoHorario(campo) {
    if (campo.id.toLowerCase() === "hora") {
        ExecutarValidacaoCampoHora(campo)
    } else {
        ExecutarValidacaoCampoMinutoESegundo(campo)
    }

    return !VerificarTemMensagem()
}

function ExecutarValidacaoCampoHora(campo) {
    if (VerificarNumeroInvalido(parseInt(campo.value))) {
        mensagem += "Valor de hora inválido!"
    } else if (parseInt(campo.value) < 0) {
        mensagem += "Valor de hora não pode ser menor que 0!"
    }

    if (VerificarTemMensagem()) {
        campo.value = ""
        MostrarMensagem()
    }
}

function ExecutarValidacaoCampoMinutoESegundo(campo) {
    if(VerificarNumeroInvalido(parseInt(campo.value))) {
        mensagem += "Valor de " + campo.id.toLowerCase() + "inválido!"
    } else if(parseInt(campo.value) < 0) {
        mensagem += "Valor de " + campo.id.toLowerCase() + " não pode ser menor que 0!"
    } else if(parseInt(campo.value) > 59) {
        mensagem += "Valor de " + campo.id.toLowerCase() + " não pode ser maior que 59!"
    }

    if (VerificarTemMensagem()) {
        campo.value = ""
        MostrarMensagem()
    }
}

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

function InvalidarCampoHorario(campo) {
    campo.style.borderColor = "red"
}

function InvalidarCampoDecimal(campo) {
    alert("Valor decimal informado está inválido.")
    campo.style.borderColor = "red"
}

function RevalidarCampo(campo) {
    campo.style.borderColor = "black"
}

function MostrarMensagem() {
    alert(mensagem)
    mensagem = ""
}

function VerificarTemMensagem() {
    return mensagem !== ""
}

function VerificarNumeroInvalido(numero) {
    return Number.isNaN(numero) || (numero === "") || (numero === null) || (numero === undefined)
}