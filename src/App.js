import React from 'react';
import './App.css';
import Todo from './Todo';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography, } from "@material-ui/core";
import AddTodo from "./AddTodo.js"
import { call, signout } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items : [],
      loading: true,
    };
  }

  componentDidMount() {
    call("/todo","GET",null).then((response)=>
      this.setState({items: response.data, loading: false}));
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

    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
    /* 로딩 중이 아닐 때 렌더링할 부분 */
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
        <AddTodo add={this.add}/>
        <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    )
    /* 로딩 중일 때 렌더링할 부분 */
    var loadingPage = <h1>로딩중.. </h1>;

    var content = loadingPage;
    if(!this.state.loading) {
      content = todoListPage;
    }
    return <div className="App">{content}</div>;
  }
}

export default App;
