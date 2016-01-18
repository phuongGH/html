var webSocket = new WebSocket("ws://localhost:8080/WebSocketPro01/ServerEndpointDemo");
webSocket.onopen = function(message){
	processOpen(message);
};
webSocket.onmessage = function(message){
	processMessage(message);
};
webSocket.onclose = function(message){
	processClose(message);
};
webSocket.onerror = function(message){
	processError(message);
};
var messageTextarea = document.getElementById("messageTextarea");
function processOpen(message)
{
	messageTextarea.value += "Server connected..."+"\n";
}

function processMessage(message)
{
	messageTextarea.value += "Receive From Server : "+ message.data+"\n";
}

function sendMessage(){
	if(textMessage.value!="close"){
		webSocket.send(textMessage.value);
		messageTextarea.value += "Send to Server : "+textMessage.value+"\n";
		textMessage.value = "";
	}
	else webSocket.close();
	
}

function processClose(message)
{
	webSocket.send("client disconnetes ...");
	messageTextarea.value += "Server disconnected..."+"\n";
}

function processError(message)
{
	messageTextarea.value += "Error.."+"\n";
}

