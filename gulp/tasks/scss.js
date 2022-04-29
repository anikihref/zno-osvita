import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import gulpGroupCssMediaQueries from "gulp-group-css-media-queries"

const sass = gulpSass(dartSass) // компилирует

export function scss() {
  return app.gulp.src(app.paths.src.scss)
		.pipe(
			sass({
				outputStyle: 'expanded'
			})
		)
		// группируем медиа запросы
		.pipe(gulpGroupCssMediaQueries())
		.pipe(autoprefixer({
				grid: true,
				cascade: true,
				overrideBrowserslist: ["last 3 versions"]
			})
		)
		.pipe(app.gulp.dest(app.paths.build.scss))
		.pipe(cleanCss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(app.gulp.dest(app.paths.build.scss))
}