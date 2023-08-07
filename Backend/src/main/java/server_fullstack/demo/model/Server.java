package server_fullstack.demo.model;

import server_fullstack.demo.enumeration.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;

 
import static jakarta.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Server {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    @Column(unique = true) // constraint on this ip address so we can't have more than one ip address of the same number.
    @NotEmpty(message = "IP Address cannot be empty or null")
    private String ipAddr;
    private String name;
    private String memory;
    private String type;
    private String imageUrl;
    private Status status;
}

