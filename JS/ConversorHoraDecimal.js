var mensagem = ""
var mensagemResultado = ""

var horasDecimais = 0
var minutosDecimais = 0
var segundosDecimais = 0
var horaConvertida = ""

var horas = 0
var minutos = 0
var segundos = 0
var valorDecimal = 0.0

var campoHoras = document.getElementById("Hora")
var campoMinutos = document.getElementById("Minuto")
var campoSegundos = document.getElementById("Segundo")
var campoValorDecimal = document.getElementById("ValorDecimal")

//#region Eventos

function AoDeixarCampo() {  
    horas = (VerificarNumeroInvalido(parseInt(campoHoras.value)) ? 0 : parseInt(campoHoras.value))
    campoHoras.value = horas
    horasDecimais = horas

    minutos = (VerificarNumeroInvalido(parseInt(campoMinutos.value)) || (horas > 0 && parseInt(campoMinutos.value) > 59) ? 0 : parseInt(campoMinutos.value))
    campoMinutos.value = minutos
    minutosDecimais = ConverterMinutoParaDecimal(minutos)

    segundos = (VerificarNumeroInvalido(parseInt(campoSegundos.value)) || parseInt(campoSegundos.value) > 59 ? 0 : parseInt(campoSegundos.value))
    campoSegundos.value = segundos
    segundosDecimais = ConverterSegundosParaDecimal(parseInt(segundos))

    valorDecimal = (VerificarNumeroInvalido(parseFloat(campoValorDecimal.value.replace(",", "."))) ? 0 : parseFloat(campoValorDecimal.value.replace(",", ".")))
    campoValorDecimal.value = valorDecimal.toString().replace(".", ",")
    horaConvertida = ConverterDecimalParaSexagesimal(valorDecimal)

    document.getElementById("HorasDecimais").children.item(2).innerText = (horasDecimais + minutosDecimais + segundosDecimais).toFixed(4)
    document.getElementById("MinutosDecimais").children.item(2).innerText = ((horasDecimais + minutosDecimais + segundosDecimais) * 60).toFixed(4)
    document.getElementById("SegundosDecimais").children.item(2).innerText = ((horasDecimais + minutosDecimais + segundosDecimais) * 3600).toFixed(4)
    document.getElementById("HoraConvertida").children.item(2).innerText = horaConvertida
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

function ConverterMinutoParaDecimal(minuto) {
    minuto = minuto === 0 ? 0 : minuto
    return minuto / 60
}

function ConverterSegundosParaDecimal(segundos) {
    segundos = segundos === 0 ? 0 : segundos 
    return segundos / 3600
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