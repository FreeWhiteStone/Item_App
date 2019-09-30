import React, { Component } from 'react'
import posed from 'react-pose';
import ItemConsumer from "../context"
import axios from "axios"


const Animation = posed.div({
    visible : {
        opacity : 1,
        applyAtStart : {
            display : "block"
        }
    },
    hidden : {
        opacity : 0,
        applyAtEnd : {
            display : "none"
        }
    }

});

class AddItem extends Component {

    state = {
        visible : false,
        name : "",
        department : "",
        salary : "",
        urun_id : "",
        error : false
    }

    changeVisibility = (e) => {
        this.setState({
            visible : !this.state.visible
        })
    }

    validateForm = () => {
        const {name, salary, department, urun_id} = this.state;
        if(name === "" || salary === "" || department  === "" || urun_id  === ""){
            return false;
        }
        return true;
    }

    changeInput = (e) => {
        
        this.setState({

            [e.target.name] : e.target.value
            
        })
    }
    addItem = async (dispatch, e) => {

        e.preventDefault();
        const {name, department, salary, urun_id} = this.state;

        const newItem = {
            
            name : name,
            salary : salary,
            department : department,
            urun_id : urun_id,
        }

        if(!this.validateForm()){
            this.setState({
                error : true
            })
            return;
        }

        const response = await axios.post("http://localhost:3004/items", newItem)
       dispatch({type:"ADD_ITEM", payload : response.data})

       //Redirect
       this.props.history.push("/");
    }
   

    render() {
        const {visible, name, salary,  department, urun_id, error} = this.state;

        return (<ItemConsumer>

            {
                value => {

                    const {dispatch} = value;
                    console.log(value)

                    return (
                        <div className="col-md-8 mb-4">
            
                            <button onClick = {this.changeVisibility} className = "btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>
                            <Animation pose={this.state.visible ? "visible" : "hidden"}>
                            <div className="card">
                                    <div className="card-header">
                                     <h4>Add Item Form</h4>
                                    </div>
            
                                    <div className="card-body">

                                        {
                                             
                                                error ?
                                               <div className = "alert alert-danger">

                                                    Lütfen Bilgileri Kontrol ediniz...

                                                </div>
                                                :null
                                            
                                        }
                                       
                                        <form onSubmit = {this.addItem.bind(this,dispatch)}>
                                            
                                        <div className="form-group">
            
                                            <label htmlFor = "name">Name</label>
                                            <input
                                            
                                            type = "text"
                                            name = "name"
                                            id = "id"
                                            placeholder = "Enter Name"
                                            className = "form-control"
                                            value = {name}
                                            onChange = {this.changeInput}
                                            
                                            />
                                        
                                        </div>
            
                                        <div className="form-group">
            
                                            <label htmlFor = "department">Department</label>
                                            <input
                                            
                                            type = "text"
                                            name = "department"
                                            id = "department"
                                            placeholder = "Enter Department"
                                            className = "form-control"
                                            value = {department}
                                            onChange = {this.changeInput}
                                            />
                                        
                                        </div>
            
                                        <div className="form-group">
            
                                            <label htmlFor = "salary">Price</label>
                                            <input
                                            
                                            type = "text"
                                            name = "salary"
                                            id = "salary"
                                            placeholder = "Enter salary"
                                            className = "form-control"
                                            value = {salary}   
                                            onChange = {this.changeInput}                             
                                            />
                                        
                                        </div>
                                        <div className="form-group">
            
                                            <label htmlFor = "urun_id">ID</label>
                                            <input
                                            
                                            type = "text"
                                            name = "urun_id"
                                            id = "urun_id"
                                            placeholder = "Enter ürün id"
                                            className = "form-control"
                                            value = {urun_id}   
                                            onChange = {this.changeInput}                             
                                            />
                                        
                                        </div>
                                        <button className = "btn btn-danger btn-block" type = "submit">Add Item</button>
            
                                        </form>
                                     
                                    </div>
            
                             </div> 
                             </Animation>
                        </div>
                    )

                }
            }
        </ItemConsumer>)

        
    }
}
export default AddItem;
