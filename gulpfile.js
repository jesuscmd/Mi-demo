const {
  series,
  parallel,
  src,
  dest,
  watch
} = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

const clean = require("gulp-clean");
const del = require("del");
const rename = require("gulp-rename");

const connect = require("gulp-connect-php");
const concat = require("gulp-concat");
const htmlreplace = require("gulp-html-replace");
const replace = require("gulp-replace");
const replaceString = require("gulp-replace");
const gulpRemoveHtml = require("gulp-remove-html");
const htmlmin = require("gulp-htmlmin");
const removeEmptyLines = require("gulp-remove-empty-lines");

const gulpif = require('gulp-if');

const serverUrl = "./dist/"
const distUrl = "../site-dist/"

const isDist = process.argv[2] === "dist"
const path = isDist ? distUrl : serverUrl

function resetDist() {

  return del("dist/**/*", {
    force: true
  });
}

function cleanDist(cb) {
  return src("src", {
      read: false
    })
    .pipe(dest("./dist/"))
    .pipe(clean({
      force: true
    }))
    .on("end", cb)
    .on("error", cb);
}

function copyJS(cb) {
  return src("src/js/**/*.*").pipe(dest(`${path}js/`)).on("end", cb).on("error", cb);
}

function copyCSS(cb) {
  src("src/css/**/*.*").pipe(dest(`${path}css/`)).on("end", cb).on("error", cb);
  browserSync.reload();
  return true;
}

function compileSass(cb) {
  return src(`./src/scss/*.scss`)
    .pipe(sass({
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(dest(`${path}css`))
    .on("end", cb)
    .on("error", cb);
}

function copyImages(cb) {
  src("src/images/**/*.*")
    .pipe(dest(`${path}images/`))
    .on("end", cb)
    .on("error", cb);
  browserSync.reload();
  return true;
}

function copyFonts(cb) {
  return src("src/fonts/**/*.*")
    .pipe(dest(`${path}/fonts/`))
    .on("end", cb)
    .on("error", cb);
}

function copyFaviconItems(cb) {
  return src("src/favicons/")
    .pipe(dest(path))
    .on("end", cb)
    .on("error", cb);
}

function copySites(cb) {
  src("src/sites/")
    .pipe(dest(path))
    .on("end", cb)
    .on("error", cb);
}

function fixDistHtml(cb) {
  return src("src/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(removeEmptyLines({
      removeSpaces: true
    }))
    .pipe(dest(path))
    .on("end", cb)
    .on("error", cb);
}

function fixHtml(cb) {
  return src("src/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(dest(path))
    .on("end", cb)
    .on("error", cb);
}

function replaceDistBundles(cb) {
  return src("src/*.html")
    .pipe(
      htmlreplace({
        css: "css/main.min.css",
        js: "js/bundle.min.js",
      })
    )
    .pipe(dest("dist/"))
    .on("end", cb)
    .on("error", cb);
}

// function bundleJs(cb) {
//   return src([
//       "./src/js/lib/gsap3/gsap.min.js",
//       "./src/js/lib/scrollmagic/ScrollMagic.js",
//       "./src/js/lib/scrollmagic/plugins/animation.gsap.js",
//       "./src/js/main.js",
//     ])
//     .pipe(concat("bundle.min.js"))
//     .pipe(dest("dist/js"))
//     .on("end", cb)
//     .on("error", cb);
// }

// rename to a fixed value
function changeCSSName(cb) {
  src("./dist/css/main.css")
    .pipe(rename("main.min.css"))
    .pipe(dest("./dist/css"))
    .on("end", cb)
    .on("error", cb);
}

function reload(done) {
  browserSync.reload();
  done();
}

function serve() {
  connect.server({
    base: "./dist/",
    port: 8010,
    keepalive: true
  }, function () {
    browserSync.init({
      server: {
        baseDir: "./dist/",
      },
    });
  });

  watch("src/*.html", series(fixHtml));
  watch("src/scss/*.scss", compileSass);
  watch("src/**/*.js", copyJS);
  watch("src/images/**/*.*", copyImages);

  watch("dist/*.html", reload);
  watch("dist/css/*.css", reload);
  watch("dist/js/*.js", reload);
}

exports.dist = series(
  copyJS,
  copyCSS,
  compileSass,
  parallel(copyImages, copyFonts),
  copyFaviconItems,
  copySites,
  fixDistHtml
);

exports.serve = series(
  resetDist,
  cleanDist,
  copyJS,
  copyCSS,
  compileSass,
  parallel(copyImages, copyFonts),
  copyFaviconItems,
  copySites,
  // replaceDistBundles,
  fixHtml,
  // bundleJs,
  // changeCSSName,
  serve
);