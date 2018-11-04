import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import VenueList from './components/VenueList'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
//import scriptLoader from 'react-async-script-loader'
import axios from 'axios'
import escapeRegExp from 'escape-string-regexp';
//@scriptLoader([])

class App extends Component {
	state={
			venues:[],
            markers: [],
            visibleVenues: [],
            query:'',
            hiddenMarkers: [],
            
            
		}
	
	componentDidMount(){
		this.accessVenues();
	}
    //load the google map
	loadMap = () => {
	    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBK3OCyi95_CdodbvdkHJGt_Zm8ZO7nnuI&callback=initMap')
		window.initMap=this.initMap;
	}
	
    // Use four square API to get access venues
	accessVenues=()=>{
		const endPoint=" https://api.foursquare.com/v2/venues/explore?"
		const parameters={
			client_id: "OPAAWOBVDO0ICO5JPEDRDUIOIHYKBOLCGPK3AR1M53Y0X12T",
			client_secret: "PBAOT5LG0UCDFNSZOCEE13VELTIDONP5JPTHXCNQEEOJNGOA",
			query: "food",
			near: "Kolkata",
			v:"20181028",
            limit: 8
        
		}

	axios.get(endPoint + new URLSearchParams(parameters))
	.then(response=>{
		this.setState({
			venues: response.data.response.groups[0].items,
             visibleVenues: response.data.response.groups[0].items

		},this.loadMap())
	})
	.catch(error=>{
		console.log("error: "+ error)
	})
	}

	//initializing the map L7 4
    //styling the map: https://snazzymaps.com/style/18/retro
    initMap=()=>{
         var styledMapType = new window.google.maps.StyledMapType(
            [
    {
        "featureType": "administrative",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#84afa3"
            },
            {
                "lightness": 52
            }
        ]
    },
    {
        "stylers": [
            {
                "saturation": -17
            },
            {
                "gamma": 0.36
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3f518c"
            }
        ]
    }
]

            ,
        {name: 'Styled Map'});

        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 22.5670, lng: 88.367},
          zoom: 13,
          
           mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
         } 
        })
        
        // create an info window L7 7
         var infowindow = new window.google.maps.InfoWindow({
          
        });

        this.state.venues.map(myCity => {
         var contentString =
            `<div class="infoWindow">
            <h2>${myCity.venue.name}</h2>
            <h3>Address:${myCity.venue.location.address}</h3>
            <h3>${myCity.venue.location.city}</h3>
            <h3>Pincode:${myCity.venue.location.postalCode}</h3>
        </div>`
         
         //Create a marker L7 6            
        var marker = new window.google.maps.Marker({
        position: {lat: myCity.venue.location.lat, lng: myCity.venue.location.lng},
        map: map,
        title:myCity.venue.name,
        })
        
             this.state.markers.push(marker)
         
        marker.addListener('click', function() {
          infowindow.setContent(contentString);
          infowindow.open(map, marker);

        })
          
  })
    // map styling
     map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map'); 


      }

      onHandleClick = (markers,event) => {
    const {infowindow, map} = this.state;
    //if an item is clicked

    markers.forEach(marker => {
      //stop all markers animation
     // marker.setAnimation(null)
      //if the clicked item text is equal to the marker title relate them
      if(event.target.innerHTML === marker.title) {
       // marker.setAnimation(window.google.maps.Animation.BOUNCE);
        new window.google.maps.event.trigger(marker, 'click');

        //setTimeout(marker.setAnimation(null), 0);
      }
        })
    }
    
   

         
     updateQuery=(query)=>{
        this.setState({query:query})
        this.state.markers.map(marker => marker.setVisible(true))
    let filterVenues
    let hiddenMarkers

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      filterVenues = this.state.venues.filter(myCity =>
        match.test(myCity.venue.name)
      )
      this.setState({ venues: filterVenues })
      hiddenMarkers = this.state.markers.filter(marker =>
        filterVenues.every(myCity => myCity.venue.name !== marker.title)
      )

      /* 
       * Hiding the markers for venues not included in the filtered venues
      */
      hiddenMarkers.forEach(marker => marker.setVisible(false))

      this.setState({ hiddenMarkers })
    } else {
      this.setState({ venues: this.state.visibleVenues })
      this.state.markers.forEach(marker => marker.setVisible(true))
    }
      }
  render() {
    return (
        <main>
         <Navbar/>
    <div className="container">

        <VenueList venues={this.state.venues} 
        accessVenues={this.accessVenues}
        markers={this.state.markers}
        query={this.state.query}
        updateQuery={b=>this.updateQuery(b)}
        onHandleClick={this.onHandleClick}
        />
         <div id="map" >
         </div>
         </div>
         <Footer/>
    </main>
    )
  }
}
//source is : https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
//loading the script tag for google map
function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer=true;
    ref.parentNode.insertBefore(script, ref);
}
export default App;
