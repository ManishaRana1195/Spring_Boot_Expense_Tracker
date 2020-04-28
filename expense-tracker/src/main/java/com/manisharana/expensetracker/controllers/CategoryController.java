package com.manisharana.expensetracker.controllers;


import com.manisharana.expensetracker.models.Category;
import com.manisharana.expensetracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    private List<Category> getAllCategories() {
        return (List<Category>) categoryRepository.findAll();
    }

    @GetMapping("/category/{id}")
    private ResponseEntity<?> getCategory(@PathVariable("id") Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/category")
    private ResponseEntity<?> postCategory(@Valid @RequestBody Category category) {
        Category saved = categoryRepository.save(category);
        return ResponseEntity.created(URI.create("")).body(saved);
    }

}
