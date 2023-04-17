import React from 'react';
import './App.css';
import Todo from './Todo';
import { Paper, List, Container } from "@material-ui/core";
import AddTodo from "./AddTodo.js"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items : [],
    };
  }
  //add 함수 추가
  add= (item) => {
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length; //key를 위한 id 추가
    item.done = false; //done 초기화
    thisItems.push(item); //리스트에 아이템 추가
    this.setState({items: thisItems}); //업데이트는 반드시 this.setState로 해야 됨
    console.log("items : ", this.state.items);
  }
  //delete 함수 추가
  delete = (item) => {
    const thisItems = this.state.items;

    console.log("Before delete: ", this.state.items);
    const newItems = thisItems.filter(e => e.id!==item.id);
    this.setState({items: newItems}, () => {
      console.log("After delete: ", this.state.items);
    });
  }

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin: 16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete}/>
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
