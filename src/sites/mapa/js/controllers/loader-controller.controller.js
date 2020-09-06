app.controller('MainController', ['$scope', '$http', 'preloader','$document','$timeout', function($scope, $http, preloader,$document,$timeout) {
  $scope.carga = {
      proceso : "DATOS",
      percent : 0,
      loaderImg : false,
      full : false,
      completed : false
  };
  //SELECTORES
  var mapContainer,     // $('.map') el contenedor de todo el mapa
      select,           // $('selector') select
      dc,               // $('.dinamic-content')
      mcps,             // $('.map-plane.map-municipios') layer de municipios
      btns,             // $('.my-btn')  todos los botones
      municipios,       // $('#municipios')
      municipiosShadows, // $('#municipios-shadows')
      municipiosG,      // $('#municipios > g')  todos los contenedores de municipios
      municipiosS,      // $('#municipios-shadows') todos los contenedores de sombras de los municipios
      municipiosMap;    // $('.map-plane.map-municipios')
  //MUESTRA O NO LA VIEW PRINCIPAL
  $scope.isRouteLoading = true;
  //DATOS DONDE GUARDAMOS LOS JSONS
  $scope.municipios;
  $scope.productos;
  //PRODUCTO ACTIVO
  $scope.currentProduct;
  //municipios visibles
  $scope.limiteMunicipios = 5;
  //alto del header
  var headerHeight;

  $scope.loaderImg = [
    ("img/map-loader.svg?v=1&cache=" + ( new Date() ).getTime())
  ];

  $scope.imageLocations = [
    // ("img/map/municipios.svg?v=1&cache=" + ( new Date() ).getTime()),
    // ("img/map/map.svg?v=1&cache=" + ( new Date() ).getTime())//,
  ];

  preloader.preloadImages( $scope.loaderImg ).then(
    function handleResolve( imageLocations ) {
      $scope.carga.loaderImg = true;
      cargarDatos();
    }
  );
  cargarDatos = function(){
    $http({method: 'GET', url: 'partials/jalisco-municipios.json'}).success(
      function(data, status, headers, config) {
        $scope.municipios = data.data;
        $scope.carga.percent = 30;
        $http({method: 'GET', url: 'partials/data.json'}).success(
          function(data, status, headers, config) {
            $scope.productos = data;
            $scope.carga.percent = 100;
            loadImgs();
          }
        );
      }
    );
  }

  loadImgs = function() {
    $scope.carga.proceso = "CARGANDO";
    $scope.carga.percent = 0;
    //agregamos las imagenes dinamicamente
    angular.forEach($scope.productos, function(value, key) {
      $scope.imageLocations.push( "img/products/" + value.img + "?v=1&cache=" + ( new Date() ).getTime() );
    });
    preloader.preloadImages( $scope.imageLocations ).then(
      function handleResolve( imageLocations ) {
        $scope.carga.percent = 100;
        $scope.isRouteLoading = false;
      },
      function handleReject( imageLocation ) {
        console.error( "Image Failed", imageLocation );
        console.info( "Preload Failure" );
      },
      function handleNotify( event ) {
        $scope.carga.percent = event.percent;
      }
    );
  }

  $scope.$on('$viewContentLoaded', function(){
    //cargamos FB
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.5&appId=1737787513108899";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    !function(d,s,id){
      var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
      if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js,fjs);}
    }(document, 'script', 'twitter-wjs');



    $scope.currentProduct = 'agave';
    $timeout(function() {
        $scope.carga.full = true;
        //CREAMOS LOS SELECTORES DINÁMICOS
        selectContainer = $document.find('.selector');
        select =          $document.find('select');
        mapContainer =    $document.find('.map');
        dc =              $document.find('.dinamic-content');
        mcps =            $document.find('.map-plane.map-municipios');
        btns =            $document.find('.my-btn');
        municipios =      $document.find('#municipios');
        municipiosShadows = $document.find('#municipios-shadows');
        municipiosG =     $document.find('#municipios > g');
        municipiosS =     $document.find('#municipios-shadows > g');
        municipiosMap =   $document.find('.map-plane.map-municipios');
        //activamos select
        select.material_select();
        activarMunicipios($scope.currentProduct);
        $timeout(function() {
          $scope.carga.completed = true;
        },1010);
        $document.find('select').on('change', function(event) {
          changeCurrentItem(event.target.value);
        });
    }, 500);

    //mostramos todos los municipios
    $scope.removeLimits = function(){
      $scope.limiteMunicipios = $scope.productos[$scope.currentProduct].municipios.length;
    }
    function changeCurrentItem(val){
      if (val != $scope.currentProduct) {
        apagarMunicipiosSeleccionados();
        $(setTimeout(function () {
          dc.addClass('escondido');
          //$(window).scrollTop(0);
          $('.municipios-data').scrollTop(0);
          deseleccionarMunicipios();
          $(setTimeout(function () {
            $('#municipios path').attr('class','');
            mcps.removeClass('active');
            $(setTimeout(function () {
              $scope.currentProduct = val;
              $scope.mostrarMunicipios = false;
              $scope.$apply();
              mcps.removeClass('escondida');
              mcps.addClass('active');
              activarMunicipios(val);
              $(setTimeout(function () {
                dc.removeClass('escondido');
              },310));
            },310));
          },10));
        }, 100));
      }
    }
    function activarMunicipios(producto) {
      var mS = $scope.productos[producto].municipios;
      $.each(mS, function(index, value){
        municipios.find('#' + value + " path").attr('class','active');
        municipiosShadows.find('#' + value + " path").attr('class','active');
      });
    }
    function apagarMunicipiosSeleccionados() {
      municipiosMap.addClass('escondida');
      municipiosS.find('path').attr('class','');
    }
    function deseleccionarMunicipios() {
      municipiosG.attr('class','');
      $document.find('.my-btn').removeClass('active');
    }
    $scope.seleccionarMunicipio = function(id,event) {
      deseleccionarMunicipios();
      if ($(event.target).hasClass('active')) {
      } else {
        $(event.target).addClass('active');
        mncp = $('#municipios #' + id);
        mncp.attr('class','most');
      }
    }
    function cazarAltoHeader(){
      headerHeight = $document.find('header').height();
    }
    $scope.showMunicipios = function() {
      $scope.mostrarMunicipios = true;

      if($document.width() < 992){
        $timeout(function() {
          $('body').stop().animate({scrollTop:$('.main-content').height()}, '1000', 'swing');
        },100);
      }
    }
    $( window ).resize(function() {
      cazarAltoHeader()
    });
    //CAZAR SCROLL
    $(window).scroll(function() {
      //if I scroll more than 15px...
      if($(window).scrollTop() >= headerHeight) {
        if (!selectContainer.hasClass('mobile-fixed')){
          selectContainer.addClass('mobile-fixed');
        }
      } else {
        if (selectContainer.hasClass('mobile-fixed')) {
          selectContainer.removeClass('mobile-fixed');
        }
      }
    });
    cazarAltoHeader();
  });
}]);
