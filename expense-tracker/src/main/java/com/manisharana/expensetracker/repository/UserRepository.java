package com.manisharana.expensetracker.repository;

import models.Expense;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<Expense, Long> {
}
