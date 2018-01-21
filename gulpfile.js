// Gulpfile.js

"use strict";

var gulp = require("gulp"),
  eslint = require("gulp-eslint"),
  less = require("gulp-less"),
  sass = require("gulp-sass"),
  minifyCSS = require("gulp-minify-css"),
  path = require("path"),
  notify = require("gulp-notify"),
  clean = require("gulp-clean"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify");

var less_src = [
  "node_modules/bootstrap/less/variables.less", 
  "node_modules/bootstrap/less/mixins/*.less",
  "src/less/bootstrap-dialog.less"
];

var sass_src = [
  "node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss", 
  "node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins/*.scss",
  "src/sass/bootstrap-dialog.scss"
];

gulp.task("less", function() {
  gulp.src(less_src)
    .pipe(concat("bootstrap-dialog.less"))
    .pipe(gulp.dest("dist/less"))
    .pipe(less())
    .pipe(gulp.dest("dist/css"))
    .pipe(gulp.dest("src/css"))
    .pipe(rename("bootstrap-dialog.min.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("sass", function() {
  gulp.src(sass_src)
    .pipe(concat("bootstrap-dialog.scss"))
    .pipe(gulp.dest("dist/sass"))
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(gulp.dest("src/css"))
    .pipe(rename("bootstrap-dialog.min.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("lint", function() {
  gulp.src(["src/js/bootstrap-dialog.js"])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task("dist", ["clean", "less", "sass"], function() {
  gulp.src(["src/js/bootstrap-dialog.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(rename("bootstrap-dialog.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(notify({
      message: "Build task completed."
    }));
});

gulp.task("clean", function() {
  return gulp.src(["dist/"], {
    read: false
  })
    .pipe(clean());
});

gulp.task("default", ["clean"], function() {
  gulp.start("dist");
});
