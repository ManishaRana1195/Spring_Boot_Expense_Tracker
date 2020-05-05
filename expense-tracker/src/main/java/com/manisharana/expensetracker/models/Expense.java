package com.manisharana.expensetracker.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "expenses")
@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    private long expenseAmount;

    @NonNull
    private Instant expenseDate;
    private String description;
    private String location;

    @ManyToOne
    @NonNull
    private Category category;

    @ManyToOne
    @NonNull
    @JsonIgnore
    private User user;

}
