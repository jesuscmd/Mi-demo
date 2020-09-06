var dataProducts;
var municipios;
var currentProduct = 'aguacate';

//selectores
var productImg = $('img.image-product');
var productTitle = $('.current h2');
var productText = $('.current p');
var productVTP = $('.statics .VTP');
var productRankin = $('.raking-pos, .product-municipios');
var productMunicipios = $('.municipios-data ol');
var productData = $('.product-data tbody');


$(document).ready(function() {
  $.getJSON( 'partials/data.json', function( data ) {
    dataProducts = data;
    //changeInformation('aguacate')
  });
  $.getJSON( 'partials/jalisco-municipios.json', function( data ) {
    municipios = data;
    //changeInformation('aguacate')
  });
  //Materialize select
  $('select').material_select();
  //$('.mapa-contenedor').height($('.content').height());
  //WATCH select
  $('select').on('change', function() {
    changeInformation(this.value);
  });
});

function changeInformation(product) {
  if (currentProduct != product) {

    currentProduct = product;
    $('.dinamic-content').removeClass('fadeIn');
    $('.dinamic-content').addClass('fadeOut');
    $('.map-img.product').removeClass('active');

    setTimeout(function() {
      $('.img-producto').removeClass('active');

      $('.map-img.'+ currentProduct).addClass('active');
      var current = dataProducts[product];
      productTitle.html(current.title);
      productText.html(current.text);
      productVTP.html(current.VTP);
      productImg.attr('src', 'img/products/'+ current.img);
      productRankin.html(current.LN + 'º');
      productMunicipios.html(parseMunicipios(current.municipios));
      productData.html(parseTable(current.participacion));

      $('.img-producto.'+ currentProduct).addClass('active');
      $('.dinamic-content').removeClass('fadeOut');
      $('.dinamic-content').addClass('fadeIn');

    }, 510);
  }
}
function parseMunicipios(mcps){
  var municipios = "";
  $.each(mcps, function() {
    if(this){
      municipios += '<li>' + this + '</li>';
    }
  });
  return municipios;
}
function parseTable(data){
  $.each($('tbody tr'), function(index){
    $(this).find('td:nth-child(2)').html(data[index].PET);
    $(this).find('td:nth-child(3)').html(data[index].TP);
    $(this).find('td:nth-child(4)').html(data[index].LN + 'º');
  });
}
