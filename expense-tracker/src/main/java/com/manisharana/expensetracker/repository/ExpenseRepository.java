package com.manisharana.expensetracker.repository;

import models.Expense;
import org.springframework.data.repository.CrudRepository;

public interface ExpenseRepository  extends CrudRepository<Expense, Long> {
}
