let path = require('path');

module.exports = function(config) {
    var appBase    = 'src/';       // transpiled app JS and map files
    var appAssets  = '/base/app/'; // component assets fetched by Angular's compiler
  
    // Testing helpers (optional) are conventionally in a folder called `testing`
    var testingBase    = 'src/testing/'; // transpiled test JS and map files
    var testingSrcBase = 'src/testing/'; // test source TS files
  
    config.set({
      basePath: '',
      frameworks: ['jasmine'],

      preprocessors: {
        'dist/**/!(*spec|index|*.module|*.routes).js': ['coverage']
      },
      reporters: ['mocha', 'coverage', 'karma-remap-istanbul'],
      coverageReporter: {
        dir: path.join('coverage', 'coverage_js', '/'),
        reporters: [
          { type: 'json', subdir: '.', file: 'coverage-final.json' },
          { type: 'html', subdir: '.' }
        ]
      },
      remapIstanbulReporter: {
        reports: {
          html: path.join('testing', 'coverage_ts', '/')
        }
      },
    
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-coverage'),
        require('karma-mocha-reporter'),
        require('karma-remap-istanbul')
      ],
  
      client: {
        builtPaths: [appBase, testingBase], // add more spec base paths as needed
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
  
      customLaunchers: {
        // From the CLI. Not used here but interesting
        // chrome setup for travis CI using chromium
        Chrome_travis_ci: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }
      },
  
      files: [
        // System.js for module loading
        'node_modules/systemjs/dist/system.src.js',
  
        // Polyfills
        'node_modules/core-js/client/shim.js',
  
        // zone.js
        'node_modules/zone.js/dist/zone.js',
        'node_modules/zone.js/dist/long-stack-trace-zone.js',
        'node_modules/zone.js/dist/proxy.js',
        'node_modules/zone.js/dist/sync-test.js',
        'node_modules/zone.js/dist/jasmine-patch.js',
        'node_modules/zone.js/dist/async-test.js',
        'node_modules/zone.js/dist/fake-async-test.js',
  
        // RxJs
        { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
        { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },
  
        // Paths loaded via module imports:
        // Angular itself
        { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
        { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },
  
        { pattern: appBase + '/systemjs.config.js', included: false, watched: false },
        { pattern: appBase + '/systemjs.config.extras.js', included: false, watched: false },
        'karma-test-shim.js', // optionally extend SystemJS mapping e.g., with barrels
  
        // transpiled application & spec code paths loaded via module imports
        { pattern: appBase + '**/*.js', included: false, watched: true },
        { pattern: testingBase + '**/*.js', included: false, watched: true },
  
  
        // Asset (HTML & CSS) paths loaded via Angular's component compiler
        // (these paths need to be rewritten, see proxies section)
        { pattern: appBase + '**/*.html', included: false, watched: true },
        { pattern: appBase + '**/*.css', included: false, watched: true },
  
        // Paths for debugging with source maps in dev tools
        { pattern: appBase + '**/*.ts', included: false, watched: false },
        { pattern: appBase + '**/*.js.map', included: false, watched: false },
        { pattern: testingSrcBase + '**/*.ts', included: false, watched: false },
        { pattern: testingBase + '**/*.js.map', included: false, watched: false}
      ],
  
      // Proxied base paths for loading assets
      proxies: {
        // required for modules fetched by SystemJS
        '/base/src/node_modules/': '/base/node_modules/'
      },
  
      exclude: [],
  
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['ChromeHeadless'],
      singleRun: true
    })
  }
  