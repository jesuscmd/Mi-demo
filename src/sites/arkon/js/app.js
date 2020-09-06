const $body = $("body");
const $mainMenu = $("#arkon-menu");
const $mainMenuLinks = $(".nav-link");
const $nav = $("nav");

const $menuMobile = $(".menu-mobile-content a");

const parallaxScene = document.getElementById("tryArkonBg");
const parallaxInstance = new Parallax(parallaxScene);

const $toggleViewMore = $(".solution-toggle");

const $formContainer = $(".arkon-form");
const $form = $formContainer.find("#arkon-form");
const $next = $(".problems-next");
const $before = $(".problems-before");
const $buttons = $(".problems-buttons");
let $currentProblem = 1;

const $problems = $("#problems");
const $problemsTextsContainer = $problems.find(".problems-texts");
const $problemsTexts = $problemsTextsContainer.find(".problems-text");

//MENU INTERACTIONS
$mainMenu.click(function() {
  $body.toggleClass("cross");
});

$mainMenuLinks.on("click", function(e) {
  $mainMenuLinks.removeClass("active");
  $(e.target).addClass("active");
});

// CREATE COPIES OF LAST AND FIRTST PROBLEMS
setCurrentProblem = function($problem, $isBack) {
  $problems.removeClass();
  $classes = $isBack
    ? "problem-" + $problem + " isBack"
    : "problem-" + $problem;
  $problems.addClass($classes);
};
$next.on("click", function(e) {
  $currentProblem = $currentProblem > 2 ? 1 : ($currentProblem += 1);
  setCurrentProblem($currentProblem);
});
$before.on("click", function(e) {
  $currentProblem = $currentProblem <= 1 ? 3 : ($currentProblem -= 1);
  setCurrentProblem($currentProblem, true);
});

$(document).ready(function() {
  //MOBILE FORM
  $menuMobile.on("click", function(e) {
    e.preventDefault;
    setTimeout(function() {
      $body.removeClass("cross");
    }, 180);
  });
  // CARRUSEL
  $problemsTextsContainer.append($problemsTexts.first().clone());
  $problemsTextsContainer.prepend($problemsTexts.last().clone());
  // FORM VALIDATION
  $form
    .parsley({
      successClass: "is-valid",
      errorClass: "is-invalid",
      errorsWrapper: '<div class="valid-feedback"></div>',
      errorTemplate: "<span></span>"
    })
    .on("form:submit", function() {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: $form.attr("action"),
        data: $form.serialize(),
        success: function(response) {
          if (response.status == "success") {
            $formContainer.addClass("completed");
          }
        }
      });
      return false;
    });

  // VIEW MORE EXPAND
  $toggleViewMore.on("click", function(event) {
    $(this)
      .parents(".container")
      .toggleClass("expanded collapsed");
  });
});

$(window).scroll(function() {
  if ($(window).scrollTop() >= 200) {
    if (!$nav.hasClass("scrolled")) {
      $nav.addClass("scrolled");
    }
  } else {
    if ($nav.hasClass("scrolled")) {
      $nav.removeClass("scrolled");
    }
  }
});

// init controller
var controller = new ScrollMagic.Controller();
// build tween
var tween = TweenMax.from("#animate", 0.5, { autoAlpha: 0, scale: 0.7 });
// change behaviour of controller to animate scroll instead of jump
controller.scrollTo(function(newpos) {
  TweenMax.to(window, 0.5, { scrollTo: { y: newpos } });
});

//  bind scroll to anchor links
$(".to-demo").on("click", function(e) {
  var id = $(this).attr("href");
  if ($(id).length > 0) {
    e.preventDefault();
    // trigger scroll
    controller.scrollTo(id);
    if (window.history && window.history.pushState) {
      history.pushState("", document.title, id);
    }
  }
});
