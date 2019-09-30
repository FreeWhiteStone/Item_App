import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemConsumer from "../context"
import axios from "axios"
import {Link} from "react-router-dom"


class Item extends Component {

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

    onDeleteItemm = async (dispatch,e) => {
        const {id} = this.props;

        //Delete Request

        await axios.delete(`http://localhost:3004/items/${id}`)

        //Comsumer Dispatch
    
        dispatch({type:"DELETE_ITEM", payload:id})
    }
   
    
    render() {

        //Destructing
        const {id, name, department, salary, urun_id} = this.props;
        const {isVisible} = this.state;

        return(
            <ItemConsumer>
                {
                    value => {
                        const {dispatch} = value;

                        return (
                            <div className="col-md-8 mb-4" >
                              <div className="card" style = {isVisible ? {backgroundColor : "#12999d", color : "white"} : null}>
                                  <div className="card-header d-flex justify-content-between">
                                        <h4 className="d-inline" onClick = {this.onClickEvent}>{name}</h4>
                                        <i onClick = {this.onDeleteItemm.bind(this, dispatch)} className="fas fa-trash-alt" style={{cursor : "pointer"}} ></i>
                
                                  </div>
                
                                {
                                    isVisible ? <div className="card-body">
                                    <p className="card-text">Department: {department}</p>
                                    <p className="card-text">Price: {salary}</p>
                                    <p className="card-text">ID: {urun_id}</p>
                                    <Link to = {`edit/${id}`} className = "btn btn-dark btn-block"> Update Item</Link>
                                    
                                </div> : null
                                }
                                  
                              </div>
                            </div>
                        )


                    }
                }
            </ItemConsumer>
        )

    }
}

Item.propTypes = {

    name : PropTypes.string.isRequired,
    department : PropTypes.string.isRequired,
    salary : PropTypes.string.isRequired,
    id : PropTypes.number.isRequired,
    urun_id : PropTypes.string.isRequired,

}
Item.defaultProps = {

    name : "def",
    department : "deff",
    salary : "defff",
    urun_id : "aaa"


}
export default Item;