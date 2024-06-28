let websocket = null;
const laptopButton = document.getElementById('laptop');
const qrcodeframe = document.getElementById("qrcode");
const codetext = document.getElementById("code");
const laptopui = document.querySelector('.laptopui');
const connectedlabel = document.getElementById('connectedstatus')
let connected = false;

laptopButton.addEventListener("click",function(){
    if (!websocket || websocket.readyState !== WebSocket.OPEN){
        websocket = new WebSocket("wss://pricey-butternut-pear.glitch.me");
        websocket.addEventListener("open",async function(event){
            console.log("websocket connected");
            connected = true;
            websocket.send(JSON.stringify({message: 'laptopconnect'}))
        });
        websocket.addEventListener("message",function(msg){
            const data = JSON.parse(msg.data);
            const action = data.action;
            console.log(data)
            if (action === 'connect'){
                laptopui.style.display = "flex";
                qrcodeframe.style.display = "flex";
                const url = data.url;
                const code = data.code;
                const devicecode = data.devicecode;
                createQRCode(url);
                codetext.textContent = code;
            }else{
                connectedlabel.textContent = "DEVICE: CONNECTED"
            }
        })
    }
})

function createQRCode(url){
    var options = {
        text: url,
        width: 100,
        height: 100,
    };
    qrcodeframe.innerHTML = "";
    new QRCode(qrcodeframe,options);
}