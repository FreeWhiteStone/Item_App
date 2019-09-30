import React, { Component } from 'react'
import Item from "./Item"
import ItemConsumer from '../context'



class Items extends Component {
    
    render() {

        return(
            <ItemConsumer>
              {
                value => {
                  const {items} = value;
                  
                  console.log(value)
                  return (
                    <div>
                       {
                         
                           items.map(item =>{
                                return(
                                    <Item
                                            key = {item.id}
                                            name = {item.name}
                                            department = {item.department}
                                            salary = {item.salary}
                                            urun_id = {item.urun_id}
                                            id = {item.id}
        
                                    />
                                )
        
        
                           })
                       }
                    </div>
                )
                }
              }
            </ItemConsumer>
          )
       
    }
}

export default Items;