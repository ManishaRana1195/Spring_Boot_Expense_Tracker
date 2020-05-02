package com.manisharana.expensetracker.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.List;

@Table(name = "categories")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    private String name;

    @OneToMany
    private List<Expense> expenses;

    public Category(int _id, String _name) {
        id = _id;
        name = _name;
    }
}
