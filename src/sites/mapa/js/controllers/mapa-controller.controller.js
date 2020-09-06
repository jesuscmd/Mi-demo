app.controller('Mapa', ['$scope', '$http', function($scope, $http) {
  var vm = this;
  
  console.log('test');

  // var vm = this;
  // $scope.carga = {
  //     proceso : "DATOS",
  //     percent : 0,
  //     loaderImg : false,
  //     full : false
  // };
  //
  // $scope.isRouteLoading = true;
  //
  // $scope.isLoading = true;
  // $scope.isSuccessful = false;
  // $scope.percentLoaded = 0;
  //
  // //DATA
  // $scope.municipios, $scope.productos;
  //
  //
  // $scope.loaderImg = [
  //   ("img/map-loader.svg?v=1&cache=" + ( new Date() ).getTime())
  // ];
  // $scope.imageLocations = [
  //   ("img/map/municipios.svg?v=1&cache=" + ( new Date() ).getTime()),
  //   ("img/map/map.svg?v=1&cache=" + ( new Date() ).getTime())//,
  // ];
  //
  // preloader.preloadImages( $scope.loaderImg ).then(
  //   function handleResolve( imageLocations ) {
  //     $scope.carga.loaderImg = true;
  //     cargarDatos();
  //   }
  // );
  //
  // cargarDatos = function(){
  //   $http({method: 'GET', url: 'partials/jalisco-municipios.json'}).success(
  //     function(data, status, headers, config) {
  //       $scope.municipios = data;
  //       $scope.carga.percent = 30;
  //       $http({method: 'GET', url: 'partials/data.json'}).success(
  //         function(data, status, headers, config) {
  //           $scope.productos = data;
  //           vm.productos = data;
  //           $scope.carga.percent = 100;
  //           $scope.loadImgs();
  //         }
  //       );
  //     }
  //   );
  // }
  // $scope.loadImgs = function() {
  //   $scope.carga.proceso = "IMÁGENES";
  //   $scope.carga.percent = 0;
  //   //agregamos las imagenes dinamicamente
  //   angular.forEach($scope.productos, function(value, key) {
  //     $scope.imageLocations.push( "img/products/" + value.img + "?v=1&cache=" + ( new Date() ).getTime() );
  //   });
  //   preloader.preloadImages( $scope.imageLocations ).then(
  //     function handleResolve( imageLocations ) {
  //       $scope.carga.full = true;
  //       $scope.isRouteLoading = false;
  //     },
  //     function handleNotify( event ) {
  //       $scope.carga.percent = event.percent;
  //     }
  //   );
  //
  // }



  //

  //primero cargamos los jsons
  //$scope.init();




  //get jsons
  // $http({method: 'GET', url: 'partials/jalisco-municipios.json'}).success(
  //   function(data, status, headers, config) {
  //     $scope.municipios = data;
  //     $scope.percentage = "30";
  //     $http({method: 'GET', url: 'partials/data.json'}).success(
  //       function(data, status, headers, config) {
  //         $scope.productos = data;
  //       }
  //     );
  //   }
  // );


  /*//selectors
  var mcps = $('.map-plane.map-municipios');
  var dc = $('.dinamic-content');

  $scope.productos = [];
  $scope.municipios = [];
  $scope.currentProduct = 'agave';


  $http({method: 'GET', url: 'partials/data.json'}).success(
    function(data, status, headers, config) {
      $scope.productos = data;
      init();
      activarMunicipios($scope.currentProduct);
    }
  );*/
  //inicalizamos el sitio
  //init = function() {
    /*angular.forEach($scope.productos, function(value, key) {
      $scope.imageLocations.push( "img/products/" + value.img + "?v=1&cache=" + ( new Date() ).getTime() );
    });*/


  //}








}]);
