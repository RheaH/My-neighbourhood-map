import React, {Component} from 'react';


//Line 11:access the props inside the component

class Venue extends React.Component {

	
  
    render() {

        return (
 
           <li className="view"  tabIndex="0" onHandleClick={this.props.onHandleClick} >
          	
               {this.props.venue}
               
            
        	 	
           </li> 
        );
    }
}

export default Venue;