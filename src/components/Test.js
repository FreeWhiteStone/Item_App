import React, { Component } from 'react'

class Test extends Component {

    constructor(props) {
        super(props);
        console.log("Constructor")

        this.state = {
            a : 10,
        }
    
      }

      componentDidMount() {
          console.log("ComponentDidMount")
          //API istekleri
          this.setState ({
              a : 20
          })
      }
      componentDidUpdate(prevProps, prevState) {
          console.log("ComponentDidUpdate")
      }

      shouldComponentUpdate(nextProps, nextState) {
          console.log("shouldComponentUpdate??")
          return false
      }
      
      

    render() {
        console.log("Render")
        return (
            <div>
                
            </div>
        )
    }
}
export default Test;