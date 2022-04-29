import gulp from 'gulp'
import { paths } from './gulp/config/paths.js'
import ts from 'gulp-typescript'
import browsersync from "browser-sync"

export const tsProject = ts.createProject("tsconfig.json");

import { reset } from './gulp/tasks/reset.js'
import { scss } from './gulp/tasks/scss.js'
import { typescript } from './gulp/tasks/typescript.js'
import { server } from './gulp/tasks/server.js'
import { html } from './gulp/tasks/html.js'
 
function watcher() {
	gulp.watch(paths.watch.html, html)
	gulp.watch(paths.watch.scss, scss)
	gulp.watch(paths.watch.typescript, typescript)
}


global.app = {
  gulp,
  paths,
  tsProject,
  browsersync
}

const build = gulp.series(reset, gulp.parallel(html, scss, typescript))
const dev = gulp.series(reset, gulp.parallel(html, scss, typescript), gulp.parallel(server, watcher))

export { dev }
export { build }