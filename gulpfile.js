const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const rev = require("gulp-rev").default;
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const del = require("del");
const { parallel, series } = require("gulp");
const merge = require("gulp-merge-json");


function styles() {
  return gulp.src("./assets/scss/**/*.scss")
    .pipe(sass())             // compile SCSS
    .pipe(cssnano())          // minify CSS
    .pipe(gulp.dest("./assets/css"))   // save normal css (without hash)
    .pipe(rev())                         // add hash
    .pipe(gulp.dest("./public/assets/css"))   // save revved css
    .pipe(rev.manifest({ merge: true }))      // update manifest.json
    .pipe(gulp.dest("./public/assets/css"));
}



// JS task: minify + revision
function scripts() {
  return gulp.src("assets/js/**/*.js")          // source JS files
    .pipe(uglify())                          // minify JS          
    .pipe(rev())                              // add revision hash
    .pipe(gulp.dest("public/assets/js"))     // save hashed JS
    .pipe(rev.manifest({ merge: true }))     // update manifest.json
    .pipe(gulp.dest("public/assets/js"));    // save manifest
}

function images() {
  return gulp.src("assets/images/**/*")           // source images
    .pipe(imagemin())                          // optimize images
    .pipe(rev())                                // add revision hash
    .pipe(gulp.dest("public/assets/images"))   // save hashed images
    .pipe(rev.manifest({merge: true }))       // update manifest.json
    .pipe(gulp.dest("public/assets/images"));  // save manifest
}

function clean() {
  return del(["public/assets/**", "!public/assets"]); // delete all inside, keep folder
}

function manifest() {
    return gulp.src("public/assets/**/*.json")
    .pipe(merge({fileName: "manifest.json"}))
    .pipe(gulp.dest("public/assets"));
}

const build = series(clean, styles, scripts, images, manifest);

exports.build = build;
