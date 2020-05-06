import React, { Component } from "react";
import { Container } from "reactstrap";

class Category extends Component {
  state = {
    isLoading: true,
    Categories: []
  };

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();
    this.setState({ Categories: body, isLoading: false });
  }

  render() {
    const { Categories, isLoading } = this.state;
    if (isLoading) return <div> Loading...</div>;
    return (
      <Container>
        <h2>Categories</h2>
        <ul class="list-group">
          {Categories.map(category => (
              <li class="list-group-item" key={category.id}>{category.name}</li>
          ))}
        </ul>
      </Container>
    );
  }
}

export default Category;
