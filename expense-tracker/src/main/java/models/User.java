package models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


@Data                   // lombok provides getters and setters for all fields
@AllArgsConstructor
@NoArgsConstructor      // lombok annotation for providing no argument constructor
@Table(name = "users")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String emailId;

    @OneToMany
    private List<Expense> expenses;


}
