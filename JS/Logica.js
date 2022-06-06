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
    var elementoHora = document.getElementById("Hora")
    var elementoMinuto = document.getElementById("Minuto")
    var elementoSegundo = document.getElementById("Segundo")

    if (ExecutarValidacaoCampoHora(parseInt(elementoHora.value))) {
        InvalidarCampoHorario(elementoHora)
    } else if (ExecutarValidacaoCampoMinuto(parseInt(elementoMinuto.value))) {
        InvalidarCampoHorario(elementoMinuto)
    } else if (ExecutarValidacaoCampoSegundo(parseInt(elementoSegundo.value))) {
        InvalidarCampoHorario(elementoSegundo)
    } else {
        var resultado = ConverterSexagesimalParaDecimal(parseFloat(elementoHora.value), parseFloat(elementoMinuto.value),parseFloat(elementoSegundo.value))
        document.getElementById("ResultadoDecimal").value = resultado.toFixed(4)

        RevalidarCampo(elementoHora)
        RevalidarCampo(elementoMinuto)
        RevalidarCampo(elementoSegundo)
    }
}

function ExecutarValidacaoCampoHora(hora) {
    if (Number.isNaN(hora) || hora === "" || hora === null || hora === undefined) {
        alert("Valor de hora inválido!")
        return false
    } else if(hora < 0) {
        alert("Valor de hora não pode ser menor que 0!")
        return false
    }
}

function ExecutarValidacaoCampoMinuto(minuto) {
    if (Number.isNaN(minuto) || minuto === "" || minuto === null || minuto === undefined) {
        alert("Valor de minuto inválido!")
        return false
    } else if(minuto < 0) {
        alert("Valor de minuto não pode ser menor que 0!")
        return false
    } else if(minuto > 59) {
        alert("Valor de minuto não pode ser maior que 59!")
        return false
    }

    return true
}

function ExecutarValidacaoCampoSegundo(segundo) {
    if (Number.isNaN(segundo) || segundo === "" || segundo === null || segundo === undefined) {
        alert("Valor de segundo inválido!")
        return false
    } else if(segundo < 0) {
        alert("Valor de segundo não pode ser menor que 0!")
        return false
    } else if(segundo > 59) {
        alert("Valor de segundo não pode ser maior que 59!")
        return false
    }

    return true
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
    switch(campo.id) {
        case "Hora": {
            alert("Não foi informado o valor de hora.")
            break
        }

        case "Minuto": {
            alert("Não foi informado o valor de minuto.")
            break
        }

        case "Segundo": {
            alert("Não foi informado o valor de segundo.")
            break
        }
    }

    campo.style.borderColor = "red"
}

function InvalidarCampoDecimal(campo) {
    alert("Valor decimal informado está inválido.")
    campo.style.borderColor = "red"
}

function RevalidarCampo(campo) {
    campo.style.borderColor = "black"
}