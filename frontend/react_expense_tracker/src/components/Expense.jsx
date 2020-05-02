import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Input, Form, FormGroup, Button, Label } from "reactstrap";

class Expense extends Component {
  state = {
    title: "",
    isLoading: true,
    startDate: new Date(),
    expenses: [],
    categories: []
  };

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();

    this.setState({ categories: body, isLoading: false });
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

  render() {
    const { categories, isLoading } = this.state;

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
            <Button color="seceondary" type="reset">
              Reset
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default Expense;
