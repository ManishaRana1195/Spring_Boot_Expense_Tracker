package com.manisharana.expensetracker.controllers;


import com.manisharana.expensetracker.models.Category;
import com.manisharana.expensetracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    private List<Category> getAllCategories() {

        /*need to add h2 database to application, till then hardcoding*/

        List<Category> categoryList = (List<Category>) categoryRepository.findAll();
        List<Category> result = Arrays.asList(new Category(1, "Travel"),
                new Category(2, "Shopping"),
                new Category(3, "Medical"),
                new Category(4, "Food"),
                new Category(5, "Entertainment")
        );
        return result;
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
