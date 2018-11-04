import React, {Component} from 'react';


//Line 11:access the props inside the component

class Navbar extends React.Component {
  
    render() {

        return (
        	<div>
        	<nav className="navbar" tabIndex="0">Neighbourhood Map</nav>
          </div>
        );
    }
}

export default Navbar;