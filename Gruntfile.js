module.exports = function(grunt) {
  // Do grunt-related things in here

  	//TASKS
  	grunt.loadNpmTasks('grunt-contrib-jshint');
  	grunt.loadNpmTasks('grunt-contrib-less');
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-react');
  	grunt.loadNpmTasks('grunt-browserify');

	//CONFIG
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

	  	//JSHINT Settings
	  	jshint: {
	  		all: [
	  			'Gruntfile.js', 
	  			'client_app/scripts/*.js',
	  			'!projector/static/scripts/build.js'
  			]
	  	},

	  	//LESS Settings
	  	less: {
	  		development: {
	  			files: {
	  				'projector/static/styles/style.css' : 'client_app/styles/style.less'
	  			}
	  		}
	  	},
	  	browserify: {
	  		options: {
	  			transform: [ require('grunt-react').browserify ]
	  		},
	  		app: {
	  			src: 'client_app/scripts/app.jsx',
	  			dest: 'projector/static/scripts/build.js'
	  		}
	  	},

		//WATCH Settings
		watch: {
			scripts: {
				files : [
					'client_app/scripts/**/*.js',
					'client_app/scripts/**/*.jsx'
					],
				tasks: ['jshint', 'browserify'],
				options: {
					spawn: false,
				}
			},

			styles: {
				files: 'client_app/styles/**/*.less',
				tasks: ['less'],
				options: {
					spawn: false,
				}
			}
		}

	});

	//Does everything
	grunt.registerTask('default', 'watch');
};
