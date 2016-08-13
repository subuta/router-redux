module.exports = function(config) {
  config.set({
    autoWatch: true,
    singleRun: true,

    // browsers: ['Chrome', 'Firefox'],
    browsers: ['Firefox'],

    frameworks: [
      'jspm',
      'mocha',
      'sinon',
      'chai'
    ],

    client: {
      chai: {
        includeStack: true
      }
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jspm',
      'karma-mocha',
      'karma-sinon',
      'karma-coverage',
      'karma-coveralls',
      'karma-babel-preprocessor',
      'karma-chai'
    ],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'lib/**/*.js': ['babel', 'coverage']
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        plugins: ['transform-object-rest-spread'],
        sourceMap: 'inline'
      }
    },

    jspm: {
      loadFiles: [
        'spec/**/*.spec.js'
      ],
      serveFiles: [
        'lib/**/*.js'
      ],
      config: "jspm.config.js",
      stripExtension: false
    },

    proxies: {
      '/lib/': '/base/lib/',
      '/spec/': '/base/spec/',
      '/jspm_packages/': '/base/jspm_packages/',
      '/node_modules/': '/base/node_modules/'
    },

    // setting for coverall
    reporters: ['coverage', 'coveralls', 'progress'],
    coverageReporter: {
      type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
      dir: 'coverage/'
    },

    files: []
  });
};
