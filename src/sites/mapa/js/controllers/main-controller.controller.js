app.controller('MainController', ['$scope', '$http', 'preloader', function($scope, $http, preloader) {

  $scope.isLoading = true;
  $scope.isSuccessful = false;
  $scope.percentLoaded = 0;
  $scope.imageLocations = [
    ( "img/map/municipios.svg?v=1&cache=" + ( new Date() ).getTime() ),
    ( "img/map/map.svg?v=1&cache=" + ( new Date() ).getTime() )//,
  ];
  //selectors
  var mcps = $('.map-plane.map-municipios');
  var dc = $('.dinamic-content');

  $scope.productos = [];
  $scope.municipios = [];
  $scope.currentProduct = 'agave';

  //get jsons
  $http({method: 'GET', url: 'partials/jalisco-municipios.json'}).success(
    function(data, status, headers, config) {
      $scope.municipios = data;
    }
  );
  $http({method: 'GET', url: 'partials/data.json'}).success(
    function(data, status, headers, config) {
      $scope.productos = data;
      init();
      activarMunicipios($scope.currentProduct);
    }
  );
  //inicalizamos el sitio
  init = function() {
    angular.forEach($scope.productos, function(value, key) {
      $scope.imageLocations.push( "img/products/" + value.img + "?v=1&cache=" + ( new Date() ).getTime() );
    });
    preloader.preloadImages( $scope.imageLocations ).then(
      function handleResolve( imageLocations ) {
        // Loading was successful.
        $scope.isLoading = false;
        $scope.isSuccessful = true;
        //console.info( "Preload Successful" );

        $('.loader').addClass('loaded');

        $(setTimeout(function () {
          $('.loader').addClass('hidden');
        }, 1010))
      },
      function handleReject( imageLocation ) {
        // Loading failed on at least one image.
        $scope.isLoading = false;
        $scope.isSuccessful = false;
        console.error( "Image Failed", imageLocation );
        console.info( "Preload Failure" );
      },
      function handleNotify( event ) {
        $scope.percentLoaded = event.percent;
        console.info( "Percent loaded:", event.percent );
      }
    );

  }

  $('select').material_select();


  $scope.activarMunicipio = function(id,event) {
    if ($(event.target).hasClass('active')) {
      apagarMunicipiosSeleccionados();
    } else {
      apagarMunicipiosSeleccionados();

      $(event.target).addClass('active');
      mncp = $('#municipios #' + id);
      mncp.attr('class','most');
    }
  }
  function apagarMunicipiosSeleccionados() {
    $('.my-btn').removeClass('active');
    $('#municipios > g').attr('class','');
  }
  $('select').on('change', function() {
    var val = $(this).val();

    if (val != $scope.currentProduct) {
      $scope.currentProduct = this.value;
      dc.addClass('escondido');

      $(setTimeout(function () {
        apagarMunicipiosSeleccionados();
        $(window).scrollTop(0);
        $('.municipios-data').scrollTop(0);

        $('#municipios-shadows path').attr('class','');
        $(setTimeout(function () {
          mcps.addClass('escondida');
          $(setTimeout(function () {
            $('#municipios path').attr('class','');
            mcps.removeClass('active');
            $(setTimeout(function () {
              mcps.removeClass('escondida');
              mcps.addClass('active');
              activarMunicipios(val);
              $(setTimeout(function () {
                $scope.$apply();
                $(setTimeout(function () {
                  dc.removeClass('escondido');
                },10));
              },310));
            },310));
          },10));
        },10));
      }, 310));
    }
  });

  function activarMunicipios(producto) {
    var mS = $scope.productos[producto].municipios;
    $.each(mS, function(index, value){
      $('#municipios #' + value + " path").attr('class','active');
      $('#municipios-shadows #' + value + " path").attr('class','active');
    });
  }







}]);
