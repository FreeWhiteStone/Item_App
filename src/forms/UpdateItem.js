import React, { Component } from 'react'
import axios from "axios"
import ItemConsumer from '../context'


class UpdateItem extends Component {

    state = {
       
        name : "",
        department : "",
        salary : "",
        urun_id : "",
        error : false
    }

    

    changeInput = (e) => {
        
        this.setState({

            [e.target.name] : e.target.value
            
        })
    }
    componentDidMount = async () => {

        const {id} = this.props.match.params;
        

        const response = await axios.get(`http://localhost:3004/items/${id}`);
        
        const {name, salary, department, urun_id} = response.data;

        this.setState({
            name,
            salary,
            department,
            urun_id
        })
        
    }

    validateForm = () => {
        const {name, salary, department, urun_id} = this.state;
        if(name === "" || salary === "" || department  === "" || urun_id  === ""){
            return false;
        }
        return true;
    }
    
    updateItem = async (dispatch, e) => {
        e.preventDefault();
        //Update Item

        const {name, salary, department, urun_id} = this.state;
        const {id} = this.props.match.params;
        

        const updatedItem = {
            name,
            salary,
            department,
            urun_id
        };


        if(!this.validateForm()){
            this.setState({
                error : true
            })
            return;
        }
      
        const response = await axios.put(`http://localhost:3004/items/${id}`,updatedItem)

        dispatch({type : "UPDATE_ITEM", payload : response.data})



         //Redirect
       this.props.history.push("/");
    }
   

    render() {
        const {name, salary,  department, urun_id, error} = this.state;

        return (<ItemConsumer>

            {
                value => {

                    const {dispatch} = value;

                    return (
                        <div className="col-md-8 mb-4">
            

                            <div className="card">
                                    <div className="card-header">
                                     <h4>Update Item Form</h4>
                                    </div>
            
                                    <div className="card-body">

                                    {
                                             
                                             error ?
                                            <div className = "alert alert-danger">

                                                 Lütfen Bilgileri Kontrol ediniz...

                                             </div>
                                             :null
                                         
                                     }
                                        <form onSubmit = {this.updateItem.bind(this,dispatch)}>
                                            
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
                                            placeholder = "Enter salary"
                                            className = "form-control"
                                            value = {urun_id}   
                                            onChange = {this.changeInput}                             
                                            />
                                        
                                        </div>
                                        <button className = "btn btn-danger btn-block" type = "submit">Update Item</button>
            
                                        </form>
                                     
                                    </div>
            
                             </div> 
                            
                        </div>
                    )

                }
            }
        </ItemConsumer>)

        
    }
}
export default UpdateItem;
