import React, { Component } from 'react';
import NavBar from './Navbar';
import Flights from './Flights'

export default class App extends Component {
  render() {
    return(
      <div>
      <NavBar leftItems={leftItems} rightItems={rightItems} />
      <Flights />
      </div>
    )
  }
}

const leftItems = [
  { as: "a", content: "Flights", key: "flights" }
];
const rightItems = [
  { as: "a", content: "Login", key: "login" },
  { as: "a", content: "Register", key: "register" }
];