package serverapp;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;

public class ServerApp {
    
    public static void main(String[] args) {
        
        try{
            ServerSocket serverSocket = new ServerSocket(2016);
            Socket socket = serverSocket.accept();
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String mess = bufferedReader.readLine();
            System.out.print("Server Recieved : "+mess);
            
            PrintStream printStream = new PrintStream(socket.getOutputStream());
            mess = "abc test test";
            printStream.println(mess);
            
            
        }catch(Exception e)
        {
            
        }
    }
    
}
