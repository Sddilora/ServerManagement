package server_fullstack.demo.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

import static java.time.LocalDateTime.now;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;


import lombok.RequiredArgsConstructor;
import server_fullstack.demo.enumeration.Status;
import server_fullstack.demo.model.Response;
import server_fullstack.demo.model.Server;
import server_fullstack.demo.service.implementation.ServerServiceImpl;

@RestController
@RequestMapping("/server")
@RequiredArgsConstructor
public class ServerResource {
    private final ServerServiceImpl serverService;

    @GetMapping("/list")
    public ResponseEntity<Response> getServers() {
        return ResponseEntity.ok(
            Response.builder()
                    .timeStamp(now())
                    .data(Map.of("servers", serverService.list(30)))
                    .message("Servers retrieved")
                    .status(OK)
                    .statusCode(OK.value())
                    .build()
        );
    }

    @GetMapping("/ping/{ipAddress}")
    public ResponseEntity<Response> pingServer(@PathVariable("ipAddress") String ipAddress) throws IOException {
        Server server = serverService.ping(ipAddress);
        return ResponseEntity.ok(
            Response.builder()
                    .timeStamp(now())
                    .data(Map.of("server", server))
                    .message(server.getStatus() == Status.SERVER_UP ? "Ping Success" : "Ping Failed")
                    .status(OK)
                    .statusCode(OK.value())
                    .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<Response> pingServer(@RequestBody @Valid Server server) {
        return ResponseEntity.ok(
            Response.builder()
                    .timeStamp(now())
                    .data(Map.of("server", serverService.create(server)))
                    .message("Server Created")
                    .status(CREATED)
                    .statusCode(CREATED.value())
                    .build()
        );
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getServer(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
            Response.builder()
                    .timeStamp(now())
                    .data(Map.of("server", serverService.get(id)))
                    .message("Server retrieved")
                    .status(OK)
                    .statusCode(OK.value())
                    .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteServer(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
            Response.builder()
                    .timeStamp(now())
                    .data(Map.of("deleted", serverService.delete(id)))
                    .message("Server deleted")
                    .status(OK)
                    .statusCode(OK.value())
                    .build()
        );
    }

    // we are indicating what will be produced in here because the default is json but we need png.
    @GetMapping(path = "/image/{fileName}", produces = IMAGE_PNG_VALUE ) // since I use more than one parameter I indicate the parameters key.
    public byte[] getServerImage(@PathVariable("fileName") String fileName) throws IOException{
        return Files.readAllBytes(Paths.get("images/" + fileName));
    }
}
// @Valid checks the annotation in the Server class ( this one: @NotEmpty(message = "IP Address cannot be empty or null") private String ipAddress;) )