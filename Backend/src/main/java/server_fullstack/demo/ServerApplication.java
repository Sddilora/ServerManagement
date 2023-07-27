package server_fullstack.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import server_fullstack.demo.enumeration.Status;
import server_fullstack.demo.model.Server;
import server_fullstack.demo.repo.ServerRepo;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ServerRepo serverRepo) {
		return args -> {
			serverRepo.save(new Server(null, "192.168.1.155", "Kali Linux", "16 GB", "Personal PC", "http://localhost:8080/server/image/server1.png", Status.SERVER_DOWN));
			serverRepo.save(new Server(null, "192.168.1.154", "Ubuntu Linux", "8 GB", "Dell Tower", "http://localhost:8080/server/image/server2.png", Status.SERVER_DOWN));
			serverRepo.save(new Server(null, "192.168.1.153", "Red Hat Enterprise Linux", "16 GB", "Web Server", "http://localhost:8080/server/image/server3.png", Status.SERVER_DOWN));
			serverRepo.save(new Server(null, "192.168.1.152", "Sdd Linux", "32 GB", "Ultra PC", "http://localhost:8080/server/image/server4.png", Status.SERVER_UP));
		};
	}
}

// The CommandLineRunner() method is annotated with @Bean, which means that Spring will manage the instance returned by this method as a bean.