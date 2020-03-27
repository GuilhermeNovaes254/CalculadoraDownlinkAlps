const processData = () => {
    //Entrada dos dados pelo formulário
    let aliveMovingStateTimer = document.getElementById("aliveMovingStateTimer").value;
    let aliveStaticStateTimer = document.getElementById("aliveStaticStateTimer").value;
    let downlinkFrequency = document.getElementById("downlinkFrequency").value;
    let speed = document.getElementById("speed").value;
    let broadcastCap = document.getElementById("broadcastCap").value;
    let movingStaticStateTimer = document.getElementById("movingStaticStateTimer").value;
    let distance = document.getElementById("distance").value;
    let stopDetectionWindow = document.getElementById("stopDetectionWindow").value;
    let stopDetectionThreshold = document.getElementById("stopDetectionThreshold").value;


    //Montagem dos bytes
    let byte0_1 = parseInt('5', 10).toString(16);
    let byte0_2 = parseInt('00', 10).toString(16);

    let byte1 = parseInt(aliveStaticStateTimer, 10).toString(16);
    if (byte1.length != 2) {
        byte1 = "0" + byte1
    };

    let byte2 = parseInt(downlinkFrequency, 10).toString(16);
    if (byte2.length != 2) {
        byte2 = "0" + byte2
    };

    let byte3_1 = parseInt(speed, 10).toString(16);
    let byte3_2 = parseInt(broadcastCap, 10).toString(16);

    let byte4_1 = parseInt(movingStaticStateTimer, 10).toString(16);;
    let byte4_2 = parseInt(distance, 10).toString(16);

    let byte5_1_1 = parseInt(stopDetectionWindow, 10).toString(2);
    let byte5_1_2 = parseInt(stopDetectionThreshold, 10).toString(2);

    if (byte5_1_1.length != 2) {
        byte5_1_1 = "0" + byte5_1_1
    };
    if (byte5_1_2.length != 2) {
        byte5_1_2 = "0" + byte5_1_2
    };


    let byte5_1 = (parseInt((byte5_1_1 + byte5_1_2), 2).toString(16));
    let byte5_2 = parseInt(aliveMovingStateTimer).toString(16);

    let byte6 = "00";
    let byte7 = "10";

    //Monta String
    let stringDownlink = byte0_1 + byte0_2 + byte1 + byte2 + byte3_1 + byte3_2 + byte4_1 + byte4_2 + byte5_1 + byte5_2 + byte6 + byte7;
    alert(stringDownlink);
}