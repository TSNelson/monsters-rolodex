import { Component } from 'react';
import './App.css';
import { SearchBox } from './components/search-box/search-box.component';
import { CardList } from './components/card-list/card-list.component';
import { fileURLToPath } from 'url';

class App extends Component {

  constructor() {
    super();
    
    this.state = {
      searchValue: '',
      monsters: []
    }
  }
  
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(userData => this.setState({ monsters: userData }))
      .catch(err => console.log(err));
  }

  handleChange = event => {
       // updates state whenever the value of the search field changes
       this.setState({ searchValue: event.target.value }, 
        () => console.log(this.state.searchValue)
        // although you could modify this.state.searchValue directly, you use the setState function to modify state in React applications. This signals state changes to React, triggering the application to update in response to state changes according to your application's logic. The setState method is asynchronous, and you can pass in a callback function as the second argument, which will be executed once after setStates completes the requested changes.
        )
  };


  render() {
    return (
      <div className="App">

        <h1>Monsters Rolodex</h1> 

        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />

        <CardList monsters={this.state.monsters.filter(monster => {
          return monster.name.toLowerCase().includes(this.state.searchValue.toLowerCase());
        })} />

        <footer>
          <a className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >reactjs.org</a>
        </footer>
      </div>
    )
  }
}

export default App;
