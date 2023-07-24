package server_fullstack.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import server_fullstack.demo.model.Server;

// When we extend this class we need to give it two pieces of information
// The first piece is the domain or the class thatwe want to manage ( In this case: Server)
// The second piece is the type of the primary key (In this case: Long (th type of the ID(id)))

public interface ServerRepo extends JpaRepository<Server, Long>{
    // Find server by the ip address
    Server findByIpAddress(String ipAddress);  // They are unique so we can use ipAddress in here
}




