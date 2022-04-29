import fileInclude from "gulp-file-include";

export const html = () => {
  return app.gulp.src(app.paths.src.html)
    .pipe(fileInclude())
    .pipe(app.gulp.dest(app.paths.build.html))
    .pipe(app.browsersync.stream());
};