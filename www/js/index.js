var marker1, marker2;
var poly, geodesicPoly;

var app = {


    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.getGeo();
    },

    // Get map by using coordinates
   initMap: function(latitude, longitude) {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {lat: latitude, lng: longitude}
      });

      map.controls[google.maps.ControlPosition.TOP_CENTER].push(
          document.getElementById('info'));

      marker1 = new google.maps.Marker({
        map: map,
        draggable: true,
        position: {lat: latitude, lng: longitude}
      });

      marker2 = new google.maps.Marker({
        map: map,
        draggable: true,
        position: {lat: 48.857, lng: 2.352}
      });

      var bounds = new google.maps.LatLngBounds(
          marker1.getPosition(), marker2.getPosition());
      map.fitBounds(bounds);

      google.maps.event.addListener(marker1, 'position_changed', app.update);
      google.maps.event.addListener(marker2, 'position_changed', app.update);

      poly = new google.maps.Polyline({
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map: map,
      });

      geodesicPoly = new google.maps.Polyline({
        strokeColor: '#CC0099',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        geodesic: true,
        map: map
      });

      app.update();
    },

    update: function() {
      var path = [marker1.getPosition(), marker2.getPosition()];
      poly.setPath(path);
      geodesicPoly.setPath(path);
      var heading = google.maps.geometry.spherical.computeHeading(path[0], path[1]);
      document.getElementById('heading').value = heading;
      document.getElementById('origin').value = path[0].toString();
      document.getElementById('destination').value = path[1].toString();
    },

    getGeo: function() {

        navigator.geolocation.getCurrentPosition(function(position){

            // Tudo certo, vamos capturar
            var location = [position.coords.latitude, position.coords.longitude];

            app.initMap(location[0], location[1]);
        },
        function(error){
            // Erro ao buscar GPS coordenadas
            alert('code: ' + error.code + ' with message: ' + error.message + '\n');
        },
        {
            // Usa métodos mais apurados, como uma posição de satélite
            enableHighAccuracy: true,

            // Tempo máximo de cache
            maximumAge: 3000,

            // Tempo máximo para esperar o sucesso na captura
            timeout: 5000
        });
    }
};

app.initialize();