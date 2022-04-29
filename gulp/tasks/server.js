export const server = (done) => {
	app.browsersync.init({
		server: {
			baseDir: `${app.paths.build.html}`
		},
		notify: false,
		port: 3000,
	})
}