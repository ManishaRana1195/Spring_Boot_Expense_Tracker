import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Table,
  Container,
  Input,
  Form,
  FormGroup,
  Button,
  Label
} from "reactstrap";

class Expense extends Component {
  newExpense = {
    expenseAmount: 0,
    expenseDate: new Date(),
    description: "",
    location: "",
    category: [1, "Travel"],
    user: [101, "Manisha", "manisha@gmail.com"]
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      isLoading: true,
      startDate: new Date(),
      expenses: [],
      categories: [],
      currentExpenseObject: this.newExpense
    };
  }

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();

    this.setState({ categories: body, isLoading: false });

    const expenseList = await fetch("/api/expenses");
    const expenseBody = await expenseList.json();

    this.setState({ expenses: expenseBody, isLoading: false });
  }

  handleTitleChange = () => {
    console.log("title is clicked");
  };

  handleCategoryChange = () => {
    console.log("title is clicked");
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  async deleteExpense(id) {
    await fetch("/api/expenses/${id}", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      let updatedExpenses = [...this.state.expenses].filter(
        expense => expense.id !== id
      );
      this.setState({ expenses: updatedExpenses });
    });
  }

  render() {
    const { categories } = this.state;
    const { expenses, isLoading } = this.state;
    const expenseRows = expenses.map(expense => (
      <tr>
        <td>{expense.expenseDate}</td>
        <td>{expense.expenseAmount}</td>
        <td>{expense.description}</td>
        <td>{expense.category.name}</td>
        <td>{expense.location}</td>
        <td>
          <button
            size="sm"
            className="btn btn-danger"
            onClick={() => this.deleteExpense(expense.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    if (isLoading) return <div>Loading Expense</div>;

    return (
      <Container>
        <h2>Add Expense</h2>
        <Form onSubmit={this.handleFormSubmit}>
          <FormGroup>
            <Label for="amount">Expense Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amount"
              onChange={this.handleTitleChange}
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              onChange={this.handleTitleChange}
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="category">Category</Label>
            <select
              name="category"
              id="category"
              onChange={this.handleCategoryChange}
            >
              {categories.map(category => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <Label for="expenseDate">Expense Date</Label>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="location">Location</Label>
            <Input
              type="text"
              name="location"
              id="location"
              onChange={this.handleCategoryChange}
            ></Input>
          </FormGroup>

          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>
          </FormGroup>
          <FormGroup>
            <Button color="secondary" type="reset">
              Reset
            </Button>
          </FormGroup>
        </Form>

        <Container>
          <h3>Expense List</h3>
          <Table className="expense-list">
            <tr>
              <th width="10%">Date</th>
              <th width="10%">Amount</th>
              <th width="20%">Description</th>
              <th width="10%">Category</th>
              <th width="10%">Location</th>
              <th width="10%">Action</th>
            </tr>
            <tbody>{expenseRows}</tbody>
          </Table>
        </Container>
      </Container>
    );
  }
}

export default Expense;
