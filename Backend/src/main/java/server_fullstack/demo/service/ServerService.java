package server_fullstack.demo.service;

import java.io.IOException;
import java.util.Collection;

import server_fullstack.demo.model.Server;

// Define all the different functionalities or features that we want to application have
public interface ServerService {
    // This is gonna create the server and save it in the database
    Server create(Server server);
    // returns the server that we are pinging
    Server ping(String ipAddr) throws IOException;
    // List all the servers
    Collection<Server> list(int limit); // it returns the collection of servers
    // Takes the id of the server that we want to find
    Server get(Long id);
    // Takes the server with the updated information and save it in the db.
    Server update(Server server);
    // Deletes a server by id (since its unique)
    Boolean delete(Long id);
}
 
// This is an interface so we're not really implementing anything,
// This is just functionalities that we are laying down, that we want to have in the application.
