import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state = {
    pizzaArray: [],
    pizza: {}
  }


  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
    .then(resp => resp.json())
    .then(pizzaData => {
      this.setState({
        pizzaArray: pizzaData
      })
    })
  }

  editHandler = (obj) => {
    this.setState({
      pizza: obj
    })
  }

  submitHandler = (obj, id) => {
    fetch(`http://localhost:3000/pizzas/${id}`, {
      method: "PATCH",
      headers: {
        'accepts': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        topping: obj.topping,
        size: obj.size,
        vegetarian: obj.vegetarian
      })
    })
    .then(resp => resp.json())
    // .then(pizzaObj => console.log(pizzaObj))
    .then(pizzaObj => {this.editPizzas(pizzaObj)

    })
  }

  editPizzas = (pizzaObj) => {
   let index = Number(pizzaObj.id) - 1
   this.state.pizzaArray.splice(index, 1, pizzaObj)
   this.setState({
     pizzaArray: this.state.pizzaArray
   })
  }


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.pizza} submitHandler={this.submitHandler}/>
        <PizzaList pizzas={this.state.pizzaArray} editHandler={this.editHandler}/>
      </Fragment>
    );
  }
}

export default App;
