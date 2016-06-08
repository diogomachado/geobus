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
    getMap: function(latitude, longitude) {

        var mapOptions = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map
        (document.getElementById("map"), mapOptions);


        var latLong = new google.maps.LatLng(latitude, longitude);

        var marker = new google.maps.Marker({
            position: latLong
        });

        marker.setMap(map);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
    },

    getGeo: function() {

        navigator.geolocation.getCurrentPosition(function(position){

            // Tudo certo, vamos capturar
            var location = [position.coords.latitude, position.coords.longitude];

            app.getMap(location[0], location[1]);
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