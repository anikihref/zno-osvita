import sourcemaps from 'gulp-sourcemaps'

export const typescript = () => {
    return app.tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(app.tsProject()).js
        .pipe(sourcemaps.write('../typescript-maps'))
        .pipe(app.gulp.dest(app.paths.build.typescript));
}