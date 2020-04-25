package models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data                   // lombok provides getters and setters for all fields
@AllArgsConstructor
@NoArgsConstructor      // lombok annotation for providing no argument constructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String emailId;

    @OneToMany
    private List<Expense> expenses;


}
