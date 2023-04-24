import React from "react";
import {ListItem, ListItemText, InputBase, Checkbox, IconButton, ListItemSecondaryAction} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {item:props.item, readOnly: true};
        this.delete = props.delete;
        this.update = props.update;
    }

    deleteEventHandler = () => {
        this.delete(this.state.item)
    }

    offReadOnlyMode = () => {
        console.log("Event!", this.state.readOnly)
        this.setState({readOnly: false}, () => {
            console.log("ReadOnly?", this.state.readOnly)
        });
    }

    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item: thisItem});
    }

    enterkeyEventHandler = (e) => {
        if(e.key === "Enter") {
            this.setState({readOnly: true})
            this.update(this.state.item); //엔터를 누르면 저장
        }
    }

    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({item: thisItem});
        this.update(this.state.item); //체크박스가 변경되면 저장
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done}
                    onChange={this.checkboxEventHandler} />
                <ListItemText>
                    <InputBase
                        inputProps={{"aria-label":"naked",readOnly: this.state.readOnly,}}
                        onClick={this.offReadOnlyMode}
                        onChange={this.editEventHandler}
                        onKeyPress={this.enterkeyEventHandler}
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                    />
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton 
                        aria-label="Delete Todo"
                        onClick={this.deleteEventHandler}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
                
            </ListItem>
        );
    }
}
//다른 파일에서 사용할 수 있도록
export default Todo;