

function translateDetection(value){

    let data = parseInt(value, 2)
    switch(data){

        case 0:
            return 'Mais Baixo/ Mais Curto';
        case 1: 
            return 'Normal' 
        case 2:
            return 'Mais alto/Mais Longo';
        case 3: 
            return 'Mais Alto possível/Mais Longo Possível' 
    }

}

function translateBroadcastCap(value){

    let data = parseInt(value, 2)

    switch(data){
        case 0:
            return 'Sem Limite';
        case 1:
            return 1;
        default:
            return (data - 1) * 3;
    }

}

function translateDownlinkFrequency(value){

    let data  = parseInt(value, 2)

    if(data == 0){
        return '6 horas';
    }else{
        return `${data} dias`;
    }

}

function transcode() {
    const entry = document.getElementById("myInput").value;
   // '5008078004540010' default
    let data = entry.split('');

    let bin = []
    data.forEach(element => {
    
        let raw = parseInt(element, 16).toString(2)
        while(raw.length < 4) {
            raw = '0' + raw;
        }
    
        bin.push(raw)
    })
    
    let reserved = bin[1];
    
    let aliveStaticStateTimer = bin[2] + bin[3];
    let downlinkFrequency = bin[4] + bin[5];
    
    let speed = bin[6];
    let broadcastCap = bin[7];
    
    let movingStaticStateTimer = bin[8]; 
    let distance = bin[9];
    
    let stopDetectionWindow = bin[10].substr(0,2);
    let stopDetectionThreshold = bin[10].substr(2,2);
    let aliveMovingStateTimer = bin[11];
    
    reserved = bin[15];

    let converted = {
        'speed': parseInt(speed, 2)*5,
        'distance': parseInt(distance, 2)*0.5,
        'stopDetectionThreshold': translateDetection(stopDetectionThreshold),
        'stopDetectionWindow': translateDetection(stopDetectionWindow),
        'movingStaticStateTimer': parseInt(movingStaticStateTimer, 2)*7.5,
        'aliveMovingStateTimer': parseInt(aliveMovingStateTimer, 2),
        'downlinkFrequency': translateDownlinkFrequency(downlinkFrequency),
        'aliveStaticStateTimer' :  parseInt(aliveStaticStateTimer, 2)*3,
        'broadcastCap': translateBroadcastCap(broadcastCap)        
    }

    console.log(converted)   
    document.getElementById("output").innerHTML = `
    <table border="1">
    <tr>
        <td>Index</td>
        <td>Caracterísitica</td>
        <td>Valor</td>
    </tr>
    <tr>
        <td>A</td>
        <td>Velocidade</td>
        <td>${converted.speed}</td>
    </tr>
    <tr>
        <td>B</td>
        <td>Distância</td>
        <td>${converted.distance}</td>
    </tr>
    <tr>
        <td>C</td>
        <td>Limite de Detecção de Parada</td>
        <td>${converted.stopDetectionThreshold}</td>
    </tr>
    <tr>
        <td>D</td>
        <td>Janela de Detecção de Parada</td>
        <td>${converted.stopDetectionWindow}</td>
    </tr>
    <tr>
        <td>E</td>
        <td>Moving to Static State timer</td>
        <td>${converted.movingStaticStateTimer}</td>
    </tr>
    <tr>
        <td>F</td>
        <td>Alive Moving State timer</td>
        <td>${converted.aliveMovingStateTimer}</td>
    </tr>
    <tr>
        <td>G</td>
        <td>Frequência de Downlink em dias</td>
        <td>${converted.downlinkFrequency}</td>
    </tr>
    <tr>
        <td>H</td>
        <td>Alive Static State Timer</td>
        <td>${converted.aliveStaticStateTimer}</td>
    </tr>
    <tr>
        <td>I</td>
        <td>Distância</td>
        <td>${converted.broadcastCap}</td>
    </tr>
    </table>`
    
}

