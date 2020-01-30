import React, { Component } from 'react';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

import './App.css';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      monsters: [],
      searchField: ''
    };
    
    // verbose way to bind <this> if not using ES6 arrow functions
    //this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
      //.then(users => console.log(users ));
  }
  
  // ES6 arrow functions automatically bind <this> to the place where the arrow function was defined (lexical scoping)
  // if you were to implement using a regular function, would have to explicitly bind <this> within the function to <this> in App component 
  handleChange = e => {
    console.log(e.target.value);
    this.setState({ searchField: e.target.value }, () => console.log(this.state));
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className='App'>
        <h1> Monsters Rolodex </h1>
        <SearchBox
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
