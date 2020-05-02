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

    public Expense() {
    }

    public Expense(long id, long expenseAmount, Instant expenseDate, String description, String location, Category category, User user) {
        this.id = id;
        this.expenseAmount = expenseAmount;
        this.expenseDate = expenseDate;
        this.description = description;
        this.location = location;
        this.category = category;
        this.user = user;
    }
}
