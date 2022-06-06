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

    if (elementoHora.value === "" || elementoHora.value === null || elementoHora.value === undefined) {
        InvalidarCampo(elementoHora)
    } else if (elementoMinuto.value === "" || elementoMinuto.value === null || elementoMinuto.value === undefined) {
        InvalidarCampo(elementoMinuto)
    } else if (elementoSegundo.value === "" || elementoSegundo.value === null || elementoSegundo.value === undefined) {
        InvalidarCampo(elementoSegundo)
    } else {
        var resultado = ConverterSexagesimalParaDecimal(parseFloat(elementoHora.value), parseFloat(elementoMinuto.value),parseFloat(elementoSegundo.value))
        document.getElementById("ResultadoDecimal").value = resultado.toFixed(4)

        RevalidarCampo(elementoHora)
        RevalidarCampo(elementoMinuto)
        RevalidarCampo(elementoSegundo)
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

function InvalidarCampoHora(campo) {
    alert("Não foi informado o valor de hora.")
    campo.style.borderColor = "red"
}

function InvalidarCampoDecimal(campo) {
    alert("Valor decimal informado está inválido.")
    campo.style.borderColor = "red"
}

function RevalidarCampo(campo) {
    campo.style.borderColor = "black"
}