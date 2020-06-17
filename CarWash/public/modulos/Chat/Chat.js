var Socket = io.connect('http://localhost:6677', {'forceNew':true} );

Socket.on('messages', function (data) {
    console.log(JSON.stringify(data));
    render(data);
    $.notification(data[data.length - 1].nickname,data[data.length - 1].text, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Red_triangle_alert_icon.png/200px-Red_triangle_alert_icon.png');
});

function render(data) {
    
    var html = data.map(function (message, index) {
        if (message.nickname == sessionStorage.getItem('nombre')) {
            if (message.text) {
                return (`
                <div class="message mio">
                    <strong>${message.nickname}</strong>
                    <p>${message.text}</p>
                </div>
            `);
            }
            else{
                return (`
                <div class="message mio">
                    <strong>${message.nickname}</strong>
                    <br>
                    <img src="${message.img}" width="150px">
                </div>
            `);
            }
        } else {
            if (message.text) {
                return (`
                <div class="message">
                    <strong>${message.nickname}</strong>
                    <p>${message.text}</p>
                </div>
            `);
            }
            else{
                return (`
                <div class="message">
                    <strong>${message.nickname}</strong>
                    <br>
                    <img src="${message.img}" width="150px">
                </div>
            `);
            }
        }
    }).join('   ');
    var div_msg = document.getElementById("messages");
    div_msg.innerHTML = html;
    div_msg.scrollTop - div_msg.scrollHeight;
}

function addMessage(e) {
    var message = {
        nickname: sessionStorage.getItem('nombre'),
        text: document.getElementById('text').value
    };

    Socket.emit('add-message', message);
    return false;
}

var archivo = $("#btn_enviar")
$(archivo).change(function () {
    var fReader = new FileReader()
    fReader.readAsDataURL($(archivo).prop("files")[0])
    fReader.onloadend = function (event) {
        var message = {
            nickname: sessionStorage.getItem('nombre'),
            img: event.target.result
        };
    
        Socket.emit('add-message', message);
        
    }
})