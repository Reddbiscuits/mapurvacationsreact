import React from "react";
// import axios from "axios";
// import { Redirect } from "react-router-dom";
//import "mapbox-gl/dist/mapbox-gl.css";
import "bootstrap";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import PhotoGallery from "./PhotoGallery";
// import { Link } from "react-router-dom";

// let framesPerSecond = 20;
// let initialOpacity = 1;
// let opacity = initialOpacity;
let initialRadius = 4;
// let radius = initialRadius;
// let maxRadius = 15;

let speedFactor = 100; // number of frames per longitude degree
// let animation; // to store and cancel the animation

function drawLineToLoc(map, endPoint, startPoint, index) {
  // Create a GeoJSON source with an empty lineString.
  let geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      },
    ],
  };

  // Point 2
  map.addSource("point" + index, {
    type: "geojson",
    data: {
      type: "Point",
      coordinates: [endPoint[0], endPoint[1]],
    },
  });
  map.addLayer({
    id: "circle" + index,
    source: "point" + index,
    type: "circle",
    paint: {
      "circle-radius": initialRadius,
      "circle-radius-transition": {
        duration: 0,
      },
      "circle-opacity-transition": {
        duration: 0,
      },
      "circle-color": "#B70404",
    },
  });

  map.addLayer({
    id: "point" + index,
    source: "point" + index,
    type: "circle",
    paint: {
      "circle-radius": initialRadius,
      "circle-color": "#B70404",
    },
  });

  //Line
  map.addLayer({
    id: "line-animation" + index,
    type: "line",
    source: {
      type: "geojson",
      data: geojson,
    },
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#B70404",
      "line-width": 5,
    },
  });

  let diffX = endPoint[0] - startPoint[0];
  let diffY = endPoint[1] - startPoint[1];

  let sfX = diffX / speedFactor;
  //console.log("sfX", sfX);
  let sfY = diffY / speedFactor;

  let i = 0;
  let j = 0;

  let lineCoordinates = [];

  while (Math.abs(i) < Math.abs(diffX) || Math.abs(j) < Math.abs(diffY)) {
    lineCoordinates.push([startPoint[0] + i, startPoint[1] + j]);

    if (Math.abs(i) < Math.abs(diffX)) {
      i += sfX;
    }

    if (Math.abs(j) < Math.abs(diffY)) {
      j += sfY;
    }
  }

  //console.log(lineCoordinates);

  let animationCounter = 0;

  function animateLine() {
    if (animationCounter < lineCoordinates.length) {
      geojson.features[0].geometry.coordinates.push(lineCoordinates[animationCounter]);
      map.getSource("line-animation" + index).setData(geojson);

      requestAnimationFrame(animateLine);
      animationCounter++;
    } else {
      // let coord = geojson.features[0].geometry.coordinates;
      // coord.shift();
      // console.log(JSON.stringify(coord));
      // if (coord.length > 0) {
      //   geojson.features[0].geometry.coordinates = coord;
      //   map.getSource("line-animation").setData(geojson);
      //   //-------------- Point2 Animation End ---------------
      //   requestAnimationFrame(animateLine);
      // }
    }
  }

  animateLine();
}

class ProfileMap extends React.Component {
  state = {
    currentLocationID: null,
    redirect: false,
  };

  componentDidMount() {
    mapboxgl.accessToken = "pk.eyJ1IjoicmVkZGJpc2N1aXRzIiwiYSI6ImNrc3N2NXc5aDAzYWMyeHNieml3Ym5mZHIifQ.tLy9z9H5Nhqmh4YqcEpFsQ";

    let lon = document.querySelector("#longitude").value;
    let lat = document.querySelector("#latitude").value;
    let homebaseName = document.querySelector("#homebaseName").value;
    //let llon = document.querySelector("#loc-longitude-0").value;
    //let llat = document.querySelector("#loc-latitude-0").value;

    const map = new mapboxgl.Map({
      container: "map", //container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [lon, lat], // starting position [lng, lat]
      zoom: 5, // starting zoom
    });

    const hb = document.createElement("div");
    hb.className = "marker";

    new mapboxgl.Marker(hb)
      .setLngLat([lon, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`<h3>Home Base: ${homebaseName}</h3><Link to="/">
          <a type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            View Photo Gallery
          </a>
        </Link>`)
      )
      .addTo(map);

    let startPoint = [Number(lon), Number(lat)];

    //let endPoint = [Number(llon), Number(llat)];

    console.log("startPoint", startPoint);

    const nav = new mapboxgl.NavigationControl({ visualizePitch: true });
    map.addControl(nav, "top-left");

    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: false, // Do not use the default marker style
    });

    // Add the geocoder to the map
    map.addControl(geocoder);
    // After the map style has loaded on the page,
    // add a source layer and default styling for a single point
    map.on("load", () => {
      // Point 1
      map.addSource("single-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
          coordinates: [startPoint[0], startPoint[1]],
        },
      });

      map.addLayer({
        id: "circle1",
        source: "single-point",
        type: "circle",
        paint: {
          "circle-radius": initialRadius,
          "circle-radius-transition": {
            duration: 0,
          },
          "circle-opacity-transition": {
            duration: 0,
          },
          "circle-color": "#B70404",
        },
      });

      map.addLayer({
        id: "single-point",
        source: "single-point",
        type: "circle",
        paint: {
          "circle-radius": 20,
          "circle-color": "#B70404",
        },
      });

      let boundingBoxPoints = [];
      //let markers = [];
      for (let index = 0; index < 200; index++) {
        let lidEl = document.querySelector("#loc-id-" + index);
        let lnameEl = document.querySelector("#loc-name-" + index);
        let llonEl = document.querySelector("#loc-longitude-" + index);
        let llatEl = document.querySelector("#loc-latitude-" + index);
        if (llonEl && llatEl) {
          const lid = lidEl.value;
          const lname = lnameEl.value;
          const llon = llonEl.value;
          const llat = llatEl.value;
          const marker = new mapboxgl.Marker()
            .setLngLat([llon, llat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<h3>${lname.split(",")[0]}</h3><Link to="/">
              <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-backdrop="false" data-bs-target="#galleryModal" style="font-family: Papyrus; font-size: medium; font-weight: 600; padding-bottom: 3px;">
                View Photo Gallery
              </button>
            </Link>
            <br></br>
            <input type="text" class="lidField" value="${lid}" id="currentlySelectedLoc" style="display: none;"/>
            <Link to="/">
              <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#galleryUpload" style="font-family: Papyrus; font-size: medium; font-weight: 600; padding-bottom: 3px;">
                Upload Photos
              </button>
            </Link>`)
            )
            .addTo(map);
          marker.getElement().addEventListener("click", () => {
            this.setState({ currentLocationID: lid });
          });

          //markers.push(marker);
          boundingBoxPoints.push([Number(llon), Number(llat)]);
          drawLineToLoc(map, [Number(llon), Number(llat)], startPoint, index + 2);
        }
      }

      boundingBoxPoints.push(startPoint);

      let bounds = new mapboxgl.LngLatBounds();

      boundingBoxPoints.forEach(function (point) {
        bounds.extend(point);
      });
      if (boundingBoxPoints.length === 1) {
        map.fitBounds(bounds, { padding: 500 });
      } else {
        map.fitBounds(bounds, { padding: 100 });
      }

      // this whole block is for storing a newly selected location into the DOM form -> and into the database from there
      // Listen for the `result` event from the Geocoder
      // `result` event is triggered when a user makes a selection
      //  Add a marker at the result's coordinates
      geocoder.on("result", ({ result }) => {
        console.log("result from mapbox", result);
        map.getSource("single-point").setData(result.geometry);
        //document.querySelector(".locationField").innerText = result.geometry;
        console.log("result.geometry", result.geometry);
        document.querySelector("#newname").value = result.place_name;
        // document.querySelector("#longitude").value = result.geometry.coordinates[0];
        // document.querySelector("#latitude").value = result.geometry.coordinates[1];
        document.querySelector("#newlongitude").value = result.geometry.coordinates[0];
        document.querySelector("#newlatitude").value = result.geometry.coordinates[1];
      });
    });
  }

  render() {
    return (
      <div className="ProfileMap">
        {this.state.currentLocationID && <PhotoGallery key={this.state.currentLocationID} locationID={this.state.currentLocationID}></PhotoGallery>}
        <div id="map" style={{ height: "500px", width: "1000px" }}></div>
      </div>
    );
  }
}

export default ProfileMap;
