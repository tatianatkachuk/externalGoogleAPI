
let map;
let markers = [];
let prev_window =false;

const setListener=()=>{
    document.querySelectorAll(".location__individualNames").forEach((locationName, index)=>{
        locationName.addEventListener("click", ()=>{
            google.maps.event.trigger(markers[index], "click")
        })
    })


}

const displayLocationList=()=>{
    let locationHTML="";
    locations.forEach(location=>{
        locationHTML += '<h4 class="location__individualNames">' + location.name + '</h4>'
    })
    document.getElementById("location__names").innerHTML = locationHTML;
}

const createMarker = (coord,name, address) =>{
    const marker = new google.maps.Marker({
        position: coord,
        map:map,
        icon:"./icons/pin.png"

    })

    const contentString = '<div class="window"> <h3>'+name +'</h3> <div class ="address"><h3><i class="fas fa-map-marker-alt"></i>'+address+'</h3></div></div>' ;

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

    marker.addListener("click", () => {
        if(prev_window){
            prev_window.close();
        }
        prev_window = infowindow;

        infowindow.open({
          anchor: marker,
          map: map,
          shouldFocus: false,
        });
      });
    markers.push(marker)
}

const createLocationMarkers = () => {
    locations.forEach(location=> {
        let coord = new google.maps.LatLng(location.lat, location.lng)
        let name = location.name;
        let address = location.address;
        createMarker(coord,name, address);
    })
}


function initMap() {
    
    let campus = {lat: 41.27427, lng: 1.98311}
    map = new google.maps.Map(document.getElementById('map'), {
        center: campus,
        zoom: 16,
        mapId: "20723eb3245c3d9b"
    })
    
    createLocationMarkers();
  
    displayLocationList();

    setListener();
}