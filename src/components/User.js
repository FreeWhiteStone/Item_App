import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from "../context"
import axios from "axios"
import {Link} from "react-router-dom"


class User extends Component {

    constructor(props){

        super(props);
        this.state = {
            isVisible : false
        }

    }
    onClickEvent = (e) => {
        
        this.setState({
            isVisible : !this.state.isVisible
        });
    }

    onDeleteUser = async (dispatch,e) => {
        const {id} = this.props;

        //Delete Request

        await axios.delete(`http://localhost:3004/users/${id}`)

        //Comsumer Dispatch
    
        dispatch({type:"DELETE_USER", payload:id})
    }
   
    
    render() {

        //Destructing
        const {id, name, department, salary} = this.props;
        const {isVisible} = this.state;

        return(
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;

                        return (
                            <div className="col-md-8 mb-4" >
                              <div className="card" style = {isVisible ? {backgroundColor : "#12999d", color : "white"} : null}>
                                  <div className="card-header d-flex justify-content-between">
                                        <h4 className="d-inline" onClick = {this.onClickEvent}>{name}</h4>
                                        <i onClick = {this.onDeleteUser.bind(this, dispatch)} className="fas fa-trash-alt" style={{cursor : "pointer"}} ></i>
                
                                  </div>
                
                                {
                                    isVisible ? <div className="card-body">
                                    <p className="card-text">Department: {department}</p>
                                    <p className="card-text">Maaş: {salary}</p>
                                    <Link to = {`edit/${id}`} className = "btn btn-dark btn-block"> Update User</Link>
                                    
                                </div> : null
                                }
                                  
                              </div>
                            </div>
                        )


                    }
                }
            </UserConsumer>
        )

    }
}

User.propTypes = {

    name : PropTypes.string.isRequired,
    department : PropTypes.string.isRequired,
    salary : PropTypes.string.isRequired,
    id : PropTypes.number.isRequired

}
User.defaultProps = {

    name : "def",
    department : "deff",
    salary : "defff"


}
export default User;