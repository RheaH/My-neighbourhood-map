import React, {Component} from 'react';
import Venue from './Venue';
import '../App.css';

/*
        Line 17:create a list item for each venue in our array
        	         	 
        Line 18:created key prop because each child in an iterator or array should have unique key property
        	  */
class VenueList extends React.Component {


  
   
    render() {
        return (
        	<div className="venue-list">
        	<h2 className="heading">Best Food Outlets in Kolkata</h2>
        	 <input className="input-data" type="search" placeholder="Filter location"
        	 value={this.props.query}
        	

        	 onChange={event => this.props.updateQuery(event.target.value)}
        	 />
        	 <ol className="viewer">
              	 {this.props.venues.map(myCity=>(
        	  	<Venue venue={myCity.venue.name} 
        	  	key={myCity.venue.id} 
        	  	 role="button"
        	  	accessVenues={this.props.accessVenues}
        	  	
            	 onItemKeypress={event => {this.props.onHandleClick(this.props.marker,event.target.innerHTML)}}
        		

        	  	/>))}
        	 	</ol>
        	</div>
        );
    }
}

export default VenueList;