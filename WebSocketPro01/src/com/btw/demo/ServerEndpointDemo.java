package com.btw.demo;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/ServerEndpointDemo")
public class ServerEndpointDemo {
	
	@OnOpen
	public void handleOpen(){
		System.out.println("client conneted ....");
	}
	
	@OnMessage
	public String handleMessage(String message){
		System.out.println("receive from client : " + message);
		String replyMessage	= "echo " + message;
		System.out.println("Send to client : " + replyMessage);
		return replyMessage;
	}
	
	@OnClose
	public void handleClose(){
		System.out.println("client disconneted ...");
	}
	
	@OnError
	public void handleError(Throwable t){
		t.printStackTrace();
	}

}
