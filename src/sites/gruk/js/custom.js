// Detect IE
var browserIE = false;
if(whichBrs() == 'Internet Explorer') browserIE = true;

// Detect Mobile
var browserMobile = jQuery.browser.mobile;

// Elements
// var $wrapper = $('#wrapper'),
// 	$btnHeader = $('#header_btn-menu'),
// 	$header = $('#header'),
// 	$section = $('#section'),
// 	$footer = $('#footer'),
// 	$valign = $('.valign'),
// 	$fullHeight = $('.full-height'),
// 	$imgFit = $('.img-fit'),
// 	$toLoad = $('.to-load'),
// 	$parallax = $('.parallax'),
// 	$parallaxIcon = $('.parallax-icon');
var $fullHeight = $('.full-height');

//global vars

var pageHeight	= $(window).height();
	


$(window).load(function(){

	/* ////////////////////////////////////////
	//
	// Init
	//
	/////////////////////////////////////// */
	
	positionContent();
	$('#loading-mask').fadeOut(1750, function(){

		setTimeout(function(){
			$('#inicio .container').addClass('loaded');
		}, 100);
	});

});

/* ////////////////////////////////////////////////////////////////////////////
//
// Position Content
//
/////////////////////////////////////////////////////////////////////////// */

function positionContent(){
	// Full Height
	$fullHeight.height($(window).height());
};

/* ////////////////////////////////////////////////////////////////////////////
//
// Animaciones menú
//
/////////////////////////////////////////////////////////////////////////// */

var icon = document.getElementById("mainMenu"),

    animationToCheck = document.getElementById("animation-to-check"),
    animationToStar = document.getElementById("animation-to-star"),
    animationToCheck2 = document.getElementById("animation-to-check2"),
    animationToStar2 = document.getElementById("animation-to-star2"),
    animationToCheck3 = document.getElementById("animation-to-check3"),
    animationToStar3 = document.getElementById("animation-to-star3")

button.addEventListener('click', function() {
  if (button.classList.contains("abierto")) {
  	cerrarMenu();
  } else {
    abrirMenu();
  }
}, false);


$(".menuOver a").on('click', function(){
	cerrarMenu($(this).data('anchor'));
    //cerramos el menu y mostramos el contenido y hacemos un fadeOut
})

var cerrarMenu = function(anchor){
	$('.container').css('opacity', 1);
    button.classList.remove("abierto");
	$('.menuOver').css('display', 'none');
	$('.menuOver .container').css('opacity', '0');
    animationToStar.beginElement();
    animationToStar2.beginElement();
    animationToStar3.beginElement();
    if(anchor){
    	scrollToAnchor(anchor);
    }
};
var abrirMenu = function(){
	button.classList.add("abierto");
    $('.menuOver').css('display', 'block');
    $('.container').css('opacity', 0);
    $('.menuOver .container').transition({ 'opacity': 1, delay:100}, 500, 'ease');
    animationToCheck.beginElement();
    animationToCheck2.beginElement();
    animationToCheck3.beginElement();
};

var scrollToAnchor = function(anchor){
    var aTag = $("#"+ anchor);
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

/* ////////////////////////////////////////////////////////////////////////////
//
// Second section
//
/////////////////////////////////////////////////////////////////////////// */
var controller = new ScrollMagic.Controller();
// build scene
new ScrollMagic.Scene({
		triggerElement: ".title2",
		//duration: pageHeight*1.2,
		offset: pageHeight/3,
		triggerHook: 1
	})
	.setClassToggle("#archemy .container > div ", "loaded")
	//.setTween("#imagenBack", 0.5, {opacity: "0"}) // trigger a TweenMax.to tween
	//.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

new ScrollMagic.Scene({
		triggerElement: ".alquimia h2",
		offset: pageHeight/3,
		triggerHook: 1
	})
	.setClassToggle(".alquimia h2", "loaded") // add class toggle
	//.addIndicators() // add indicators (requires plugin)
	.addTo(controller)
;

/* ////////////////////////////////////////////////////////////////////////////
//
// back to top
//
/////////////////////////////////////////////////////////////////////////// */

jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('#topScroller');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});
	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

});

/* ////////////////////////////////////////////////////////////////////////////
//
// mailing
//
/////////////////////////////////////////////////////////////////////////// */

var setAnswerTemplate = function (msg, error) {
    var stageMessage;
    if (error) {
        stageMessage = 'error';
        currentImage = 'errorArrow';
    } else {
        currentImage = 'okArrow';
    }
    return '<div class="col-md-3 col-sm-3 col-xs-3">' +
      '<h4>' +
        '<object class="img-responsive okArrow" data="img/' + currentImage + '.svg" type="image/svg+xml">' +
           '<img class="img-responsive okArrow" src="img/' + currentImage + '.png" />' +
        '</object>'+
      '</h4>'+
    '</div>'+
    '<div class="col-md-9 col sm-9 col-xs-9">' +
      '<h4 class="' + stageMessage + '"">' + msg + '</h4>' +
    '</div>';
}
var contacto_msg = "";

var check_min_length = function(value, minLength) {
    if(value >= minLength ){
        return false;
    } else {
        return true;
    }
}
$("#iSolicitaTel, #iCarreraTel").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
         // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
         // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
         // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});
var timerHideMsg;
var showAnswer = function(targetForm, message){
    contacto_msg = message;
};
launchMessage = function(val, s){
    var selector = s.find('#contact_results');
    var output = setAnswerTemplate(contacto_msg, !val);//message error

    if (selector.html()=='') {
        selector.html(output).slideDown();
    } else {
        if(selector.css('display') == 'block') {
            selector.fadeOut(function(){
                selector.html();
                selector.html(output).fadeIn();
            });
        } else {
            selector.html();
            selector.html(output).slideDown();
        }
    }


}
var watchElement = function(event){
    var minLenght = event.data.minLenght;
    if ($(this).data('oldVal') != $(this).val()) {
        $(this).data('oldVal', $(this).val());
        if($(this).val().length >= minLenght){
            $(this).parent().parent().removeClass('has-error');
        } else {
            $(this).parent().parent().addClass('has-error');
        }
    }
};
var watchMail = function(event){
    if(email_reg.test($.trim($(this).val()))){
        $(this).parent().parent().removeClass('has-error');
    } else {
        $(this).parent().parent().addClass('has-error');
    }
};
var watchMessage = function(event){
    var minLenght = event.data.minLenght;
    if($(this).val().length >= minLenght){
        $(this).parent().parent().removeClass('has-error');
     } else {
        $(this).parent().parent().addClass('has-error');
    }
};
var chechName = function (s) {
    selector = s.find('.innomb');
    if (check_min_length(selector.val().length, 3 ) ){
        contacto_msg = "El nombre requiere al menos tres caracteres.";
        selector.parent().parent().addClass('has-error', true);
        selector.bind("propertychange change click keyup input paste", { minLenght: 3}, watchElement);
        return false;
    } else {
        selector.removeClass('has-error');
        selector.unbind("propertychange change click keyup input paste", watchElement);
        return true;
    }
}
var chechTel = function (s) {
    selector = s.find('.intel');
    if (check_min_length(selector.val().length, 5 ) ){
        contacto_msg = "El teléfono requiere al menos cinco caracteres.";
        selector.parent().parent().addClass('has-error', true);
        selector.bind("propertychange change click keyup input paste", { minLenght: 5}, watchElement);
        return false;
    } else {
        selector.removeClass('has-error');
        selector.unbind("propertychange change click keyup input paste", watchElement);
        return true;
    }
}
var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
var chechMail = function (s) {
    selector = s.find('.inMail');
    if(!email_reg.test($.trim(selector.val())) || selector.val() == ''){
        contacto_msg = "Ingrese un e-mail válido."
        selector.parent().parent().addClass('has-error', true);
        selector.bind("propertychange change click keyup input paste", { minLenght: 3}, watchMail);
        return false;
    } else {
        selector.removeClass('has-error');
        selector.unbind("propertychange change click keyup input paste", watchMail);
        return true;
    }
}
var chechMessage = function (s) {
    selector = s.find('.inpMess');
    if (check_min_length(selector.val().length, 6 ) ){
        contacto_msg = "El mensaje requiere al menos seis caracteres.";
        selector.parent().parent().addClass('has-error', true);
        selector.bind("propertychange change click keyup input paste", { minLenght: 6}, watchMessage);
        return false;
    } else {
        selector.removeClass('has-error');
        selector.unbind("propertychange change click keyup input paste", watchMessage);
        return true;
    }
}


$(document).ready(function() {
    $("#submit_contacto").click(function() { 
        var currentForm = $(".formaSolicita");
        var proceed = true;
        if(chechName(currentForm) < proceed){
            proceed = false;
        }
        if(chechTel(currentForm) < proceed){
            proceed = false;
        }
        if(chechMail(currentForm) < proceed){
            proceed = false;
        } 
        if(chechMessage(currentForm) < proceed){
            proceed = false;
        } 
        if(proceed == true) {
            post_data = {
                'user_name'     : $('input#iSolicitaNombre').val(), 
                'user_email'    : $('input#iSolicitaEmail').val(), 
                'phone_number'  : $('input#iSolicitaTel').val(), 
                'msg'           : $('textarea#iSolicitaSolicitud').val()
            };
            $.post('partials/contact_us.php', post_data, function(response){  
                if(response.type == 'error'){ //load json data from server and output message 
                    contacto_msg = 'Ha ocurrido un error, inténtelo más tarde.';
                    proceed = false;
                    launchMessage(proceed, currentForm); 
                } else {
                    contacto_msg = 'Tu solicitud ha sido enviada con éxito ¿Deseas enviar otra solucitud?';
                    $("#iSolicitaNombre, #iSolicitaEmail, #iSolicitaTel, #iSolicitaSolicitud").val(''); 
                    launchMessage(proceed, currentForm);
                }
            }, 'json');
        } else {
            launchMessage(proceed, currentForm);
        }
    });

    $("#submit_carrera").click(function() {

        var currentForm = $(".formaCarreras"); 
        var proceed = true;

        if(chechName(currentForm) < proceed){
            proceed = false;
        }
        if(chechTel(currentForm) < proceed){
            proceed = false;
        }
        if(chechMail(currentForm) < proceed){
            proceed = false;
        }


        

        // if($('#iCarreraFileName').val()){

        //     //subir archivo, al confirmar, lanzar lo demás
        // } 

        if(proceed == true) {
            post_data = {
                'user_name'     : $('input#iCarreraNombre').val(), 
                'user_email'    : $('input#iCarreraEmail').val(), 
                'phone_number'  : $('input#iCarreraTel').val() 
                //'msg'           : $('textarea#iSolicitaSolicitud').val()
            };
            if (arrayFiles.length){
                post_data.files = {};

                $.each(arrayFiles, function(index, value){
                    post_data.files[index] = value;
                });

                //post_data.push({'files' : arrayFiles });
            };
            $.post('partials/carreras.php', post_data, function(response){ 

                if(response.type == 'error'){ //load json data from server and output message 
                    contacto_msg = 'Ha ocurrido un error, inténtelo más tarde.';
                    proceed = false;
                    launchMessage(proceed, currentForm); 
                } else {
                    console.log(response); 
                    $('#iCarreraFileName').val("");
                    $('#files').fadeOut(function(){
                        $('#files').empty();
                    });
                    $('#progress .progress-bar').animate({width: 0}, function(){
                        $('#progress').animate({opacity:0});
                    });
                    contacto_msg = 'Tu mensaje ha sido enviada con éxito ¿Deseas enviar otra mensaje?';
                    $("#iCarreraNombre, #iCarreraTel, #iCarreraEmail, #iCarreraCV").val(''); 
                    launchMessage(proceed, currentForm);
                }
            }, 'json');
        } else {
            launchMessage(proceed, currentForm);
        }
    });
});

/* ////////////////////////////////////////////////////////////////////////////
//
// uploader
//
/////////////////////////////////////////////////////////////////////////// */

var arrayFiles = [];

$('#iCarreraCV').change(function(e){
    
});

    // When the server is ready...
$(function () {
    'use strict';
    
    // Define the url to send the image data to
    var url = 'partials/file.php';
    var currentForm = $(".formaCarreras"); 

    // Call the fileupload widget and set some parameters
    $('#iCarreraCV').fileupload({
        add: function(e, data) {
            var uploadErrors = [];
            var acceptFileTypes = /(\.|\/)(jpe?g|png|docx|doc|pdf)$/i;
            if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
                contacto_msg = 'Únicamente puedes subir archivos jpg, png, doc, docx y pdf.';
                launchMessage(false, currentForm);
                uploadErrors.push('Not an accepted file type');
            }
            if(data.originalFiles[0]['size'] > 5*1024*1024) {
                contacto_msg = 'El archivo es demasiado grande, el límite es de 5M.';
                launchMessage(false, currentForm);
                uploadErrors.push('Too big');
            }
            if(uploadErrors.length == 0) {
                $('#iCarreraFileName').val($(this).val().split('\\').pop());
                if($('#progress .progress-bar').css('width') != '0px'){
                    $('#progress .progress-bar').css('width', 0);
                }
                $('#progress').animate({opacity:1}, function(){
                    data.submit();
                });
            }
        },
        url: url,
        dataType: 'json',
        done: function (e, data) {
            // Add each uploaded file name to the #files list
            $.each(data.result.files, function (index, file) {
                $('<h4/>').text(file.name + " subido").appendTo('#files');
                arrayFiles.push(file.name);
                currentForm.find('#iCarreraFileName').val('');
                
            });
        },
        progressall: function (e, data) {
            // Update the progress bar while files are being uploaded
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    });
});





/* ////////////////////////////////////////////////////////////////////////////
//
// slider
//
/////////////////////////////////////////////////////////////////////////// */


$('.infography-slider').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 4,
        initialSlide:1,
        centerMode: true
      }
    }
    , {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true
      }
    }


    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});



/* ////////////////////////////////////////////////////////////////////////////
//
// resize
//
/////////////////////////////////////////////////////////////////////////// */

$(window).resize(function(){
	positionContent();
});

					

/* ////////////////////////////////////////////////////////////////////////////
//
// Get Browser
//
/////////////////////////////////////////////////////////////////////////// */

function whichBrs() {
	var agt=navigator.userAgent.toLowerCase();
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox';
	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("msie") != -1) return 'Internet Explorer';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if (agt.indexOf('\/') != -1) {
		if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
			return navigator.userAgent.substr(0,agt.indexOf('\/'));
		} else return 'Netscape';
	} else if (agt.indexOf(' ') != -1)
		return navigator.userAgent.substr(0,agt.indexOf(' '));
	else return navigator.userAgent;
}