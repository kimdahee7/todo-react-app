import React from 'react';
import './App.css';
import Todo from './Todo';
import { Paper, List, Container } from "@material-ui/core";
import AddTodo from "./AddTodo.js"
import { call } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items : [],
    };
  }

  componentDidMount() {
    call("/todo","GET",null).then((response)=>
      this.setState({items: response.data}));
  }

  //add 함수 추가
  add= (item) => {
    call("/todo","POST",item).then((response)=>
      this.setState({items: response.data}));
  }
  //delete 함수 추가
  delete = (item) => {
    call("/todo","DELETE",item).then((response)=>
      this.setState({items: response.data}));
  }
  //update 함수 추가
  update = (item) => {
    call("/todo","PUT",item).then((response)=>
      this.setState({items: response.data})
      );
  }; 

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin: 16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo 
              item={item} 
              key={item.id} 
              delete={this.delete}
              update={this.update}/>
          ))}
        </List>
      </Paper>
    );
    return(
    <div className="App">
      <Container maxWidth="md">
        <AddTodo add={this.add}/>
        {/* <Todo> 컴포넌트 여러 개 */}
        <div className='TodoList'>{todoItems}</div>
      </Container>
      </div>
    );
  }
}

export default App;
