package com.manisharana.expensetracker.controllers;

import com.manisharana.expensetracker.models.Category;
import com.manisharana.expensetracker.models.Expense;
import com.manisharana.expensetracker.models.User;
import com.manisharana.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/expenses")
    public List<Expense> getExpenses() {
        Category travel = new Category(1, "Travel");
        Category food = new Category(2, "Food");
        Category entertainment = new Category(3, "Entertainment");

        User userA = new User(101, "Manisha", "manisha@gmail.com");

        Expense expense1 = new Expense(1, 210, Instant.now(), "New York Trip", "California", travel, userA);
        Expense expense2 = new Expense(2, 300, Instant.now(), "Florida Disneyland Ticket", "Florida", entertainment, userA);
        Expense expense3 = new Expense(3, 100, Instant.now(), "Weekend Dining Out at Fadi", "Santa Monica", food, userA);
        return Arrays.asList(expense1, expense2, expense3);
    }

    @PostMapping("/expenses")
    public ResponseEntity createExpense(@Valid @RequestBody Expense expense) throws URISyntaxException {
        Expense saved = expenseRepository.save(expense);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/expense/{id}")
    public ResponseEntity deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
