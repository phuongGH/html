package clientapp;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;

public class ClientApp {

    public static void main(String[] args) {
        try{
            Socket socket = new Socket("localhost",2016);
            
            PrintStream printStream = new PrintStream(socket.getOutputStream());
            
            System.out.print("Input something");
            
            InputStreamReader inputStreamReader = new InputStreamReader(System.in);
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            
            String mess = bufferedReader.readLine();
            
            printStream.println(mess);
        }
        catch(Exception e)
        {
            
        }
    }
    
}
