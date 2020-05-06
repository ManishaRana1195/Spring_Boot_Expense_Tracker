import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";
import "./Expense.css";
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
    amount: 0,
    date: new Date(),
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
      expenses: [],
      categories: [],
      currentExpenseObject: this.newExpense
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();

    this.setState({ categories: body, isLoading: false });

    const expenseList = await fetch("/api/expenses");
    const expenseBody = await expenseList.json();

    this.setState({ expenses: expenseBody, isLoading: false });
  }

  handleFieldUpdate = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let expense = { ...this.state.currentExpenseObject };
    expense[name] = value;
    this.setState({ currentExpenseObject: expense });
  };

  handleDateChange = date => {
    let newExpenseObject = { ...this.state.currentExpenseObject };
    newExpenseObject.date = date;
    this.setState({
      currentExpenseObject: newExpenseObject
    });
  };

  async deleteExpense(id) {
    await fetch(`/api/expenses/${id}`, {
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

  async handleFormSubmit(event) {
    /*prevents auto submission*/
    event.preventDefault();
    const { expenseObject } = this.state.currentExpenseObject;
    console.log(expenseObject);
    await fetch("/api/expenses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(expenseObject)
    });

    this.props.history.push("/expenses");
  }

  render() {
    const { categories } = this.state;
    const { expenses, isLoading } = this.state;
    const expenseRows = expenses.map(expense => (
      <tr key={expense.id}>
        <td>
          <Moment format="YYYY/MM/DD">{expense.date}</Moment>{" "}
        </td>
        <td>${expense.amount}</td>
        <td>{expense.category.name}</td>
        <td>{expense.description}</td>
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
        <h2 className="expenseHeader">Add Expense</h2>
        <Form onSubmit={this.handleFormSubmit}>
          <FormGroup className="form-group col-md-6">
            <Label for="amount">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amount"
              onChange={this.handleFieldUpdate}
            ></Input>
          </FormGroup>

          <FormGroup className="form-group col-md-6">
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              onChange={this.handleFieldUpdate}
            ></Input>
          </FormGroup>

          <FormGroup className="form-group col-md-6">
            <Label for="category">Category</Label>
            <select
              name="category"
              id="category"
              onChange={this.handleFieldUpdate}
              style={{ width: "100%" }}
            >
              {categories.map(category => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup className="form-group col-md-6">
            <Label for="location">Location</Label>
            <Input
              type="text"
              name="location"
              id="location"
              onChange={this.handleFieldUpdate}
            ></Input>
          </FormGroup>

          <FormGroup className="form-group col-md-6">
            <Label for="date">Date</Label>
            <br />
            <DatePicker
              selected={this.state.currentExpenseObject.date}
              onChange={this.handleDateChange}
            />
          </FormGroup>

          <FormGroup
            className="form-group col-md-6"
            style={{ justifyContent: "center", textAlign: "center" }}
          >
            <Button color="primary" type="submit" style={{ margin: "10px" }}>
              Save
            </Button>
            <Button color="secondary" type="reset" style={{ margin: "10px" }}>
              Reset
            </Button>
          </FormGroup>
        </Form>

        <Container>
          <h3>Previous Expenses</h3>
          <Table className="expense-list">
            <thead>
              <tr>
                <th width="10%">Date</th>
                <th width="10%">Amount</th>
                <th width="10%">Category</th>
                <th width="20%">Description</th>
                <th width="10%">Location</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>{expenseRows}</tbody>
          </Table>
        </Container>
      </Container>
    );
  }
}

export default Expense;
