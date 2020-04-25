package models;

import lombok.Data;

import javax.persistence.*;
import java.time.Instant;

@Data
@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Instant expenseDate;
    private String desciption;

    @ManyToOne
    private Category category;

    @ManyToOne
    private User user;


}
