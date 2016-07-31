module.exports = function (wallaby) {
  return {
    maxConsoleMessagesPerTest: 1000,
    files: [
      // system.js and configuration
      {pattern: 'jspm_packages/system.src.js', instrument: false},
      {pattern: 'jspm.config.js', instrument: false},
      {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false},
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'node_modules/chai-as-promised/lib/chai-as-promised.js', instrument: false},

      // source files (`load: false` as the files will be loaded by system.js loader)
      {pattern: 'lib/**/*.js', load: false}
    ],
    tests: [
      // test files (`load: false` as we will load tests manually)
      {pattern: 'spec/**/*.spec.js', load: false}
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        presets: ['es2015'],
        plugins: ['transform-object-rest-spread']
      })
    },

    env: {
      kind: 'electron'
    },

    // telling wallaby to serve jspm_packages project folder
    // as is from wallaby web server
    middleware: (app, express) => {
      app.use('/jspm_packages',
        express.static(
          require('path').join(__dirname, 'jspm_packages')
        )
      );
    },

    setup: function (wallaby) {
      sinon.assert.expose(chai.assert, { prefix: "" });
      window.assert = chai.assert;

      mocha.timeout(2000);

      wallaby.delayStart();

      System.config({
        transpiler: 'none'
      });

      System.trace = true;
      System.packages = {};

      var promises = [];
      for (var i = 0, len = wallaby.tests.length; i < len; i++) {
        promises.push(System['import'](wallaby.tests[i]));
      }

      Promise.all(promises).then(function () {
        wallaby.start();
      }).catch(function (e) {
        setTimeout(function () {
          throw e;
        }, 0);
      });
    },

    testFramework: 'mocha'
  };
};
