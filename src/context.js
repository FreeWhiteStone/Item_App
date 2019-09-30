import React, {Component} from "react";
import axios from "axios"

const ItemContext = React.createContext();
//Provider, Consumer

const reducer = (state, action) => {
    
    switch(action.type){
        case "DELETE_ITEM":
            return{
                ...state, //spread operator
                items : state.items.filter(item => action.payload !== item.id)
                
            }

        case "ADD_ITEM":
            return {
                ...state,
                items : [...state.items, action.payload]
            }
        case "UPDATE_ITEM":
                return {
                    ...state,
                   items : state.items.map(item => item.id === action.payload.id ? action.payload : item)
                }
        default:
            return state
    }

}

export class ItemProvider extends Component {


    state = {

        items : [],
        dispatch : action => {
            this.setState(state => reducer(state,action))
            //consumer'lardan gelen action, eski state ile değiştirilmek üzere dispatch yardımıyla reducer'a gönderilir.
        }
    
    
      }

      //async ne işe yarıyor anlamadım ama asenkron çalışma olabilir
      componentDidMount = async () => {
          //async yaparak ve await diyerek response diyene kadar burada bekledik

       const response = await axios.get("http://localhost:3004/items")
       
       this.setState({
           items : response.data
       })
          console.log(typeof(response.data))
          
      }
      


    render() {
        return (
            <ItemContext.Provider value = {this.state}>
                {this.props.children}
            </ItemContext.Provider>
        )
    }
}

const ItemConsumer = ItemContext.Consumer;
export default ItemConsumer;