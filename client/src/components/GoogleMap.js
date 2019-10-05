import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { googleMapsJSKey } from '../config/keys';

const Marker = ({ text }) => <div style={{ color: 'red' }}>{text}</div>;

class SimpleMap extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapsJSKey }}
          defaultCenter={this.props.coords.center}
          defaultZoom={this.props.coords.center.zoom}
        >
          <Marker
            lat={this.props.coords.cpp.lat}
            lng={this.props.coords.cpp.lng}
            text='Custom marker here!'
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
