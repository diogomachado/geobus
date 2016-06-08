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

    getGeo: function() {

        navigator.geolocation.getCurrentPosition(function(position){

            // Tudo certo, vamos capturar
            var location = [position.coords.latitude, position.coords.longitude];

            // Exibição básica
            alert(location);
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