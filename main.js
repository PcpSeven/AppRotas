function BuscaData(){
    var data = new Date();
    formatoRequerido = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()} ${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`
    return formatoRequerido
}

async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else { alert("O seu navegador não suporta Geolocalização.") }
}
locCompleta = ''
function showPosition(position) {
    loc =`Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`
    locCompleta = loc
    console.log(locCompleta)
}

function buscarDados(){
    carroInput = document.querySelector('.carroInput');
    motorista = document.querySelector('.motorista');
    inputData = document.querySelector('.inputData');
    var choices = [];
    var inputRadio = document.getElementsByName('chegadasaida');
    for (var i = 0; i < inputRadio.length; i++) {
        if (inputRadio[i].checked) {
            choices.push(inputRadio[i].value);
        }
    }
    final = {
        "carro":carroInput.value,
        'motorista':motorista.value,
        'dataHora':inputData.value,
        'chegadaSaida':choices[0],
        "loc":locCompleta
    }
    requisicao(final)
}

function requisicao(carro) {
    fetch('http://192.168.7.78:5500/', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(carro)
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

btnEnviar = document.querySelector('.btnEnviar')
btnEnviar.addEventListener('click',(e)=>{
    e.preventDefault()
    getLocation()
    buscarDados()
    
})

input = document.querySelector('.inputData')
input.value = BuscaData()


