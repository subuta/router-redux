SystemJS.config({
  "baseURL": "/",
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/",
      "router-redux/": "/lib/"
    }
  },
  nodeConfig: {
    "paths": {
      "npm:": "jspm_packages/npm/",
      "router-redux/": "lib/"
    }
  },
  devConfig: {
    "map": {
      "babel-preset-es2015": "npm:babel-preset-es2015@6.22.0",
      "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.22.0",
      "react-dom": "npm:react-dom@15.4.2",
      "lodash": "npm:lodash@4.17.4",
      "react": "npm:react@15.4.2",
      "redux": "npm:redux@3.6.0",
      "symbol-observable": "npm:symbol-observable@1.0.4",
      "babel-preset-stage-2": "npm:babel-preset-stage-2@6.22.0",
      "constants": "npm:jspm-nodelibs-constants@0.2.0",
      "crypto": "npm:jspm-nodelibs-crypto@0.2.0",
      "fs": "npm:jspm-nodelibs-fs@0.2.0",
      "path": "npm:jspm-nodelibs-path@0.2.1",
      "http": "npm:jspm-nodelibs-http@0.2.0",
      "buffer": "npm:jspm-nodelibs-buffer@0.2.1",
      "domain": "npm:jspm-nodelibs-domain@0.2.0",
      "assert": "npm:jspm-nodelibs-assert@0.2.0",
      "os": "npm:jspm-nodelibs-os@0.2.0",
      "process": "npm:jspm-nodelibs-process@0.2.0",
      "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.19",
      "vm": "npm:jspm-nodelibs-vm@0.2.0",
      "vidom": "npm:vidom@0.5.8",
      "util": "npm:jspm-nodelibs-util@0.2.1",
      "redux-virtual-dom": "npm:redux-virtual-dom@0.9.3",
      "events": "npm:jspm-nodelibs-events@0.2.0",
      "stream": "npm:jspm-nodelibs-stream@0.2.0",
      "zlib": "npm:jspm-nodelibs-zlib@0.2.2",
      "redux-mock-store": "npm:redux-mock-store@1.2.1",
      "url": "npm:jspm-nodelibs-url@0.2.0",
      "https": "npm:jspm-nodelibs-https@0.2.1",
      "snabbdom": "npm:snabbdom@0.5.4",
      "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0"
    },
    "packages": {
      "npm:redux@3.6.0": {
        "map": {
          "lodash": "npm:lodash@4.17.4",
          "symbol-observable": "npm:symbol-observable@1.0.4",
          "loose-envify": "npm:loose-envify@1.3.1",
          "lodash-es": "npm:lodash-es@4.17.4"
        }
      },
      "npm:jspm-nodelibs-crypto@0.2.0": {
        "map": {
          "crypto-browserify": "npm:crypto-browserify@3.11.0"
        }
      },
      "npm:react@15.4.2": {
        "map": {
          "loose-envify": "npm:loose-envify@1.3.1",
          "object-assign": "npm:object-assign@4.1.1",
          "fbjs": "npm:fbjs@0.8.8"
        }
      },
      "npm:react-dom@15.4.2": {
        "map": {
          "loose-envify": "npm:loose-envify@1.3.1",
          "object-assign": "npm:object-assign@4.1.1",
          "fbjs": "npm:fbjs@0.8.8"
        }
      },
      "npm:babel-plugin-transform-react-jsx@6.22.0": {
        "map": {
          "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0"
        }
      },
      "npm:jspm-nodelibs-os@0.2.0": {
        "map": {
          "os-browserify": "npm:os-browserify@0.2.1"
        }
      },
      "npm:jspm-nodelibs-stream@0.2.0": {
        "map": {
          "stream-browserify": "npm:stream-browserify@2.0.1"
        }
      },
      "npm:jspm-nodelibs-domain@0.2.0": {
        "map": {
          "domain-browserify": "npm:domain-browser@1.1.7"
        }
      },
      "npm:jspm-nodelibs-url@0.2.0": {
        "map": {
          "url-browserify": "npm:url@0.11.0"
        }
      },
      "npm:jspm-nodelibs-string_decoder@0.2.0": {
        "map": {
          "string_decoder-browserify": "npm:string_decoder@0.10.31"
        }
      },
      "npm:jspm-nodelibs-http@0.2.0": {
        "map": {
          "http-browserify": "npm:stream-http@2.6.3"
        }
      },
      "npm:jspm-nodelibs-zlib@0.2.2": {
        "map": {
          "browserify-zlib": "npm:browserify-zlib@0.1.4"
        }
      },
      "npm:babel-helper-builder-react-jsx@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "lodash": "npm:lodash@4.17.4",
          "babel-types": "npm:babel-types@6.22.0",
          "esutils": "npm:esutils@2.0.2"
        }
      },
      "npm:fbjs@0.8.8": {
        "map": {
          "loose-envify": "npm:loose-envify@1.3.1",
          "object-assign": "npm:object-assign@4.1.1",
          "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
          "setimmediate": "npm:setimmediate@1.0.5",
          "core-js": "npm:core-js@1.2.7",
          "ua-parser-js": "npm:ua-parser-js@0.7.12",
          "promise": "npm:promise@7.1.1"
        }
      },
      "npm:jspm-nodelibs-buffer@0.2.1": {
        "map": {
          "buffer": "npm:buffer@4.9.1"
        }
      },
      "npm:babel-preset-es2015@6.22.0": {
        "map": {
          "babel-plugin-transform-es2015-block-scoped-functions": "npm:babel-plugin-transform-es2015-block-scoped-functions@6.22.0",
          "babel-plugin-transform-es2015-arrow-functions": "npm:babel-plugin-transform-es2015-arrow-functions@6.22.0",
          "babel-plugin-transform-es2015-block-scoping": "npm:babel-plugin-transform-es2015-block-scoping@6.22.0",
          "babel-plugin-check-es2015-constants": "npm:babel-plugin-check-es2015-constants@6.22.0",
          "babel-plugin-transform-es2015-modules-amd": "npm:babel-plugin-transform-es2015-modules-amd@6.22.0",
          "babel-plugin-transform-es2015-literals": "npm:babel-plugin-transform-es2015-literals@6.22.0",
          "babel-plugin-transform-es2015-for-of": "npm:babel-plugin-transform-es2015-for-of@6.22.0",
          "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.22.0",
          "babel-plugin-transform-es2015-classes": "npm:babel-plugin-transform-es2015-classes@6.22.0",
          "babel-plugin-transform-es2015-duplicate-keys": "npm:babel-plugin-transform-es2015-duplicate-keys@6.22.0",
          "babel-plugin-transform-es2015-shorthand-properties": "npm:babel-plugin-transform-es2015-shorthand-properties@6.22.0",
          "babel-plugin-transform-es2015-parameters": "npm:babel-plugin-transform-es2015-parameters@6.22.0",
          "babel-plugin-transform-regenerator": "npm:babel-plugin-transform-regenerator@6.22.0",
          "babel-plugin-transform-es2015-template-literals": "npm:babel-plugin-transform-es2015-template-literals@6.22.0",
          "babel-plugin-transform-es2015-spread": "npm:babel-plugin-transform-es2015-spread@6.22.0",
          "babel-plugin-transform-es2015-typeof-symbol": "npm:babel-plugin-transform-es2015-typeof-symbol@6.22.0",
          "babel-plugin-transform-es2015-modules-umd": "npm:babel-plugin-transform-es2015-modules-umd@6.22.0",
          "babel-plugin-transform-es2015-unicode-regex": "npm:babel-plugin-transform-es2015-unicode-regex@6.22.0",
          "babel-plugin-transform-es2015-computed-properties": "npm:babel-plugin-transform-es2015-computed-properties@6.22.0",
          "babel-plugin-transform-es2015-object-super": "npm:babel-plugin-transform-es2015-object-super@6.22.0",
          "babel-plugin-transform-es2015-function-name": "npm:babel-plugin-transform-es2015-function-name@6.22.0",
          "babel-plugin-transform-es2015-sticky-regex": "npm:babel-plugin-transform-es2015-sticky-regex@6.22.0",
          "babel-plugin-transform-es2015-modules-systemjs": "npm:babel-plugin-transform-es2015-modules-systemjs@6.22.0",
          "babel-plugin-transform-es2015-destructuring": "npm:babel-plugin-transform-es2015-destructuring@6.22.0"
        }
      },
      "npm:redux-virtual-dom@0.9.3": {
        "map": {
          "deep-equal": "npm:deep-equal@1.0.1"
        }
      },
      "npm:babel-preset-stage-2@6.22.0": {
        "map": {
          "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.22.0",
          "babel-plugin-syntax-dynamic-import": "npm:babel-plugin-syntax-dynamic-import@6.18.0",
          "babel-preset-stage-3": "npm:babel-preset-stage-3@6.22.0",
          "babel-plugin-transform-decorators": "npm:babel-plugin-transform-decorators@6.22.0"
        }
      },
      "npm:loose-envify@1.3.1": {
        "map": {
          "js-tokens": "npm:js-tokens@3.0.0"
        }
      },
      "npm:stream-http@2.6.3": {
        "map": {
          "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
          "xtend": "npm:xtend@4.0.1",
          "readable-stream": "npm:readable-stream@2.2.2",
          "inherits": "npm:inherits@2.0.3",
          "builtin-status-codes": "npm:builtin-status-codes@3.0.0"
        }
      },
      "npm:babel-runtime@6.22.0": {
        "map": {
          "core-js": "npm:core-js@2.4.1",
          "regenerator-runtime": "npm:regenerator-runtime@0.10.1"
        }
      },
      "npm:stream-browserify@2.0.1": {
        "map": {
          "readable-stream": "npm:readable-stream@2.2.2",
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:browserify-zlib@0.1.4": {
        "map": {
          "readable-stream": "npm:readable-stream@2.2.2",
          "pako": "npm:pako@0.2.9"
        }
      },
      "npm:crypto-browserify@3.11.0": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "create-ecdh": "npm:create-ecdh@4.0.0",
          "create-hmac": "npm:create-hmac@1.1.4",
          "pbkdf2": "npm:pbkdf2@3.0.9",
          "browserify-cipher": "npm:browserify-cipher@1.0.0",
          "diffie-hellman": "npm:diffie-hellman@5.0.2",
          "browserify-sign": "npm:browserify-sign@4.0.0",
          "randombytes": "npm:randombytes@2.0.3",
          "create-hash": "npm:create-hash@1.1.2",
          "public-encrypt": "npm:public-encrypt@4.0.0"
        }
      },
      "npm:babel-plugin-transform-es2015-arrow-functions@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-block-scoped-functions@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-block-scoping@6.22.0": {
        "map": {
          "babel-types": "npm:babel-types@6.22.0",
          "lodash": "npm:lodash@4.17.4",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-template": "npm:babel-template@6.22.0",
          "babel-traverse": "npm:babel-traverse@6.22.1"
        }
      },
      "npm:babel-plugin-transform-es2015-literals@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0"
        }
      },
      "npm:babel-plugin-check-es2015-constants@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-modules-amd@6.22.0": {
        "map": {
          "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-template": "npm:babel-template@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-for-of@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-modules-commonjs@6.22.0": {
        "map": {
          "babel-types": "npm:babel-types@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-template": "npm:babel-template@6.22.0",
          "babel-plugin-transform-strict-mode": "npm:babel-plugin-transform-strict-mode@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-classes@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0",
          "babel-template": "npm:babel-template@6.22.0",
          "babel-helper-optimise-call-expression": "npm:babel-helper-optimise-call-expression@6.22.0",
          "babel-traverse": "npm:babel-traverse@6.22.1",
          "babel-helper-define-map": "npm:babel-helper-define-map@6.22.0",
          "babel-helper-function-name": "npm:babel-helper-function-name@6.22.0",
          "babel-messages": "npm:babel-messages@6.22.0",
          "babel-helper-replace-supers": "npm:babel-helper-replace-supers@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-duplicate-keys@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-shorthand-properties@6.22.0": {
        "map": {
          "babel-types": "npm:babel-types@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-parameters@6.22.0": {
        "map": {
          "babel-types": "npm:babel-types@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-template": "npm:babel-template@6.22.0",
          "babel-traverse": "npm:babel-traverse@6.22.1",
          "babel-helper-call-delegate": "npm:babel-helper-call-delegate@6.22.0",
          "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-template-literals@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-typeof-symbol@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-unicode-regex@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-helper-regex": "npm:babel-helper-regex@6.22.0",
          "regexpu-core": "npm:regexpu-core@2.0.0"
        }
      },
      "npm:babel-plugin-transform-es2015-spread@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-computed-properties@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-template": "npm:babel-template@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-modules-umd@6.22.0": {
        "map": {
          "babel-plugin-transform-es2015-modules-amd": "npm:babel-plugin-transform-es2015-modules-amd@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-template": "npm:babel-template@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-modules-systemjs@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-template": "npm:babel-template@6.22.0",
          "babel-helper-hoist-variables": "npm:babel-helper-hoist-variables@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-sticky-regex@6.22.0": {
        "map": {
          "babel-types": "npm:babel-types@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-helper-regex": "npm:babel-helper-regex@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-function-name@6.22.0": {
        "map": {
          "babel-types": "npm:babel-types@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-helper-function-name": "npm:babel-helper-function-name@6.22.0"
        }
      },
      "npm:babel-plugin-transform-es2015-object-super@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-helper-replace-supers": "npm:babel-helper-replace-supers@6.22.0"
        }
      },
      "npm:babel-plugin-transform-class-properties@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-template": "npm:babel-template@6.22.0",
          "babel-helper-function-name": "npm:babel-helper-function-name@6.22.0",
          "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.13.0"
        }
      },
      "npm:readable-stream@2.2.2": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "string_decoder": "npm:string_decoder@0.10.31",
          "isarray": "npm:isarray@1.0.0",
          "buffer-shims": "npm:buffer-shims@1.0.0",
          "core-util-is": "npm:core-util-is@1.0.2",
          "process-nextick-args": "npm:process-nextick-args@1.0.7",
          "util-deprecate": "npm:util-deprecate@1.0.2"
        }
      },
      "npm:url@0.11.0": {
        "map": {
          "punycode": "npm:punycode@1.3.2",
          "querystring": "npm:querystring@0.2.0"
        }
      },
      "npm:babel-types@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "esutils": "npm:esutils@2.0.2",
          "lodash": "npm:lodash@4.17.4",
          "to-fast-properties": "npm:to-fast-properties@1.0.2"
        }
      },
      "npm:buffer@4.9.1": {
        "map": {
          "isarray": "npm:isarray@1.0.0",
          "ieee754": "npm:ieee754@1.1.8",
          "base64-js": "npm:base64-js@1.2.0"
        }
      },
      "npm:babel-plugin-transform-regenerator@6.22.0": {
        "map": {
          "regenerator-transform": "npm:regenerator-transform@0.9.8"
        }
      },
      "npm:babel-plugin-transform-es2015-destructuring@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0"
        }
      },
      "npm:pbkdf2@3.0.9": {
        "map": {
          "create-hmac": "npm:create-hmac@1.1.4"
        }
      },
      "npm:diffie-hellman@5.0.2": {
        "map": {
          "randombytes": "npm:randombytes@2.0.3",
          "miller-rabin": "npm:miller-rabin@4.0.0",
          "bn.js": "npm:bn.js@4.11.6"
        }
      },
      "npm:create-hmac@1.1.4": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2",
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:browserify-sign@4.0.0": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2",
          "create-hmac": "npm:create-hmac@1.1.4",
          "inherits": "npm:inherits@2.0.3",
          "bn.js": "npm:bn.js@4.11.6",
          "browserify-rsa": "npm:browserify-rsa@4.0.1",
          "parse-asn1": "npm:parse-asn1@5.0.0",
          "elliptic": "npm:elliptic@6.3.2"
        }
      },
      "npm:create-hash@1.1.2": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "cipher-base": "npm:cipher-base@1.0.3",
          "ripemd160": "npm:ripemd160@1.0.1",
          "sha.js": "npm:sha.js@2.4.8"
        }
      },
      "npm:public-encrypt@4.0.0": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2",
          "randombytes": "npm:randombytes@2.0.3",
          "bn.js": "npm:bn.js@4.11.6",
          "browserify-rsa": "npm:browserify-rsa@4.0.1",
          "parse-asn1": "npm:parse-asn1@5.0.0"
        }
      },
      "npm:babel-preset-stage-3@6.22.0": {
        "map": {
          "babel-plugin-syntax-trailing-function-commas": "npm:babel-plugin-syntax-trailing-function-commas@6.22.0",
          "babel-plugin-transform-object-rest-spread": "npm:babel-plugin-transform-object-rest-spread@6.22.0",
          "babel-plugin-transform-async-to-generator": "npm:babel-plugin-transform-async-to-generator@6.22.0",
          "babel-plugin-transform-exponentiation-operator": "npm:babel-plugin-transform-exponentiation-operator@6.22.0",
          "babel-plugin-transform-async-generator-functions": "npm:babel-plugin-transform-async-generator-functions@6.22.0"
        }
      },
      "npm:isomorphic-fetch@2.2.1": {
        "map": {
          "whatwg-fetch": "npm:whatwg-fetch@2.0.2",
          "node-fetch": "npm:node-fetch@1.6.3"
        }
      },
      "npm:babel-template@6.22.0": {
        "map": {
          "babel-traverse": "npm:babel-traverse@6.22.1",
          "babel-types": "npm:babel-types@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "lodash": "npm:lodash@4.17.4",
          "babylon": "npm:babylon@6.15.0"
        }
      },
      "npm:babel-helper-optimise-call-expression@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0"
        }
      },
      "npm:babel-helper-define-map@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "lodash": "npm:lodash@4.17.4",
          "babel-types": "npm:babel-types@6.22.0",
          "babel-helper-function-name": "npm:babel-helper-function-name@6.22.0"
        }
      },
      "npm:babel-plugin-transform-strict-mode@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0"
        }
      },
      "npm:babel-traverse@6.22.1": {
        "map": {
          "babel-messages": "npm:babel-messages@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0",
          "lodash": "npm:lodash@4.17.4",
          "babel-code-frame": "npm:babel-code-frame@6.22.0",
          "debug": "npm:debug@2.6.0",
          "invariant": "npm:invariant@2.2.2",
          "globals": "npm:globals@9.14.0",
          "babylon": "npm:babylon@6.15.0"
        }
      },
      "npm:babel-helper-call-delegate@6.22.0": {
        "map": {
          "babel-traverse": "npm:babel-traverse@6.22.1",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0",
          "babel-helper-hoist-variables": "npm:babel-helper-hoist-variables@6.22.0"
        }
      },
      "npm:regenerator-transform@0.9.8": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0",
          "private": "npm:private@0.1.6"
        }
      },
      "npm:babel-plugin-transform-decorators@6.22.0": {
        "map": {
          "babel-types": "npm:babel-types@6.22.0",
          "babel-template": "npm:babel-template@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-plugin-syntax-decorators": "npm:babel-plugin-syntax-decorators@6.13.0",
          "babel-helper-explode-class": "npm:babel-helper-explode-class@6.22.0"
        }
      },
      "npm:babel-helper-get-function-arity@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0"
        }
      },
      "npm:babel-helper-regex@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "lodash": "npm:lodash@4.17.4",
          "babel-types": "npm:babel-types@6.22.0"
        }
      },
      "npm:babel-messages@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0"
        }
      },
      "npm:babel-helper-function-name@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0",
          "babel-traverse": "npm:babel-traverse@6.22.1",
          "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.22.0",
          "babel-template": "npm:babel-template@6.22.0"
        }
      },
      "npm:create-ecdh@4.0.0": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "elliptic": "npm:elliptic@6.3.2"
        }
      },
      "npm:browserify-cipher@1.0.0": {
        "map": {
          "browserify-aes": "npm:browserify-aes@1.0.6",
          "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
          "browserify-des": "npm:browserify-des@1.0.0"
        }
      },
      "npm:babel-helper-replace-supers@6.22.0": {
        "map": {
          "babel-helper-optimise-call-expression": "npm:babel-helper-optimise-call-expression@6.22.0",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-traverse": "npm:babel-traverse@6.22.1",
          "babel-messages": "npm:babel-messages@6.22.0",
          "babel-template": "npm:babel-template@6.22.0",
          "babel-types": "npm:babel-types@6.22.0"
        }
      },
      "npm:babel-helper-hoist-variables@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0"
        }
      },
      "npm:promise@7.1.1": {
        "map": {
          "asap": "npm:asap@2.0.5"
        }
      },
      "npm:babel-plugin-transform-object-rest-spread@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-plugin-syntax-object-rest-spread": "npm:babel-plugin-syntax-object-rest-spread@6.13.0"
        }
      },
      "npm:babel-plugin-transform-async-to-generator@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-plugin-syntax-async-functions": "npm:babel-plugin-syntax-async-functions@6.13.0",
          "babel-helper-remap-async-to-generator": "npm:babel-helper-remap-async-to-generator@6.22.0"
        }
      },
      "npm:babel-plugin-transform-exponentiation-operator@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-helper-builder-binary-assignment-operator-visitor": "npm:babel-helper-builder-binary-assignment-operator-visitor@6.22.0",
          "babel-plugin-syntax-exponentiation-operator": "npm:babel-plugin-syntax-exponentiation-operator@6.13.0"
        }
      },
      "npm:miller-rabin@4.0.0": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "brorand": "npm:brorand@1.0.6"
        }
      },
      "npm:browserify-aes@1.0.6": {
        "map": {
          "cipher-base": "npm:cipher-base@1.0.3",
          "create-hash": "npm:create-hash@1.1.2",
          "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
          "inherits": "npm:inherits@2.0.3",
          "buffer-xor": "npm:buffer-xor@1.0.3"
        }
      },
      "npm:evp_bytestokey@1.0.0": {
        "map": {
          "create-hash": "npm:create-hash@1.1.2"
        }
      },
      "npm:browserify-des@1.0.0": {
        "map": {
          "cipher-base": "npm:cipher-base@1.0.3",
          "inherits": "npm:inherits@2.0.3",
          "des.js": "npm:des.js@1.0.0"
        }
      },
      "npm:browserify-rsa@4.0.1": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "randombytes": "npm:randombytes@2.0.3"
        }
      },
      "npm:regexpu-core@2.0.0": {
        "map": {
          "regjsparser": "npm:regjsparser@0.1.5",
          "regjsgen": "npm:regjsgen@0.2.0",
          "regenerate": "npm:regenerate@1.3.2"
        }
      },
      "npm:parse-asn1@5.0.0": {
        "map": {
          "browserify-aes": "npm:browserify-aes@1.0.6",
          "create-hash": "npm:create-hash@1.1.2",
          "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
          "pbkdf2": "npm:pbkdf2@3.0.9",
          "asn1.js": "npm:asn1.js@4.9.1"
        }
      },
      "npm:cipher-base@1.0.3": {
        "map": {
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:elliptic@6.3.2": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "inherits": "npm:inherits@2.0.3",
          "brorand": "npm:brorand@1.0.6",
          "hash.js": "npm:hash.js@1.0.3"
        }
      },
      "npm:sha.js@2.4.8": {
        "map": {
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:node-fetch@1.6.3": {
        "map": {
          "is-stream": "npm:is-stream@1.1.0",
          "encoding": "npm:encoding@0.1.12"
        }
      },
      "npm:babel-code-frame@6.22.0": {
        "map": {
          "esutils": "npm:esutils@2.0.2",
          "js-tokens": "npm:js-tokens@3.0.0",
          "chalk": "npm:chalk@1.1.3"
        }
      },
      "npm:invariant@2.2.2": {
        "map": {
          "loose-envify": "npm:loose-envify@1.3.1"
        }
      },
      "npm:babel-plugin-transform-async-generator-functions@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-helper-remap-async-to-generator": "npm:babel-helper-remap-async-to-generator@6.22.0",
          "babel-plugin-syntax-async-generators": "npm:babel-plugin-syntax-async-generators@6.13.0"
        }
      },
      "npm:babel-helper-explode-class@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-traverse": "npm:babel-traverse@6.22.1",
          "babel-types": "npm:babel-types@6.22.0",
          "babel-helper-bindify-decorators": "npm:babel-helper-bindify-decorators@6.22.0"
        }
      },
      "npm:debug@2.6.0": {
        "map": {
          "ms": "npm:ms@0.7.2"
        }
      },
      "npm:regjsparser@0.1.5": {
        "map": {
          "jsesc": "npm:jsesc@0.5.0"
        }
      },
      "npm:asn1.js@4.9.1": {
        "map": {
          "bn.js": "npm:bn.js@4.11.6",
          "inherits": "npm:inherits@2.0.3",
          "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
        }
      },
      "npm:babel-helper-builder-binary-assignment-operator-visitor@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0",
          "babel-helper-explode-assignable-expression": "npm:babel-helper-explode-assignable-expression@6.22.0"
        }
      },
      "npm:babel-helper-remap-async-to-generator@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-template": "npm:babel-template@6.22.0",
          "babel-types": "npm:babel-types@6.22.0",
          "babel-traverse": "npm:babel-traverse@6.22.1",
          "babel-helper-function-name": "npm:babel-helper-function-name@6.22.0"
        }
      },
      "npm:des.js@1.0.0": {
        "map": {
          "inherits": "npm:inherits@2.0.3",
          "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
        }
      },
      "npm:hash.js@1.0.3": {
        "map": {
          "inherits": "npm:inherits@2.0.3"
        }
      },
      "npm:encoding@0.1.12": {
        "map": {
          "iconv-lite": "npm:iconv-lite@0.4.15"
        }
      },
      "npm:chalk@1.1.3": {
        "map": {
          "ansi-styles": "npm:ansi-styles@2.2.1",
          "has-ansi": "npm:has-ansi@2.0.0",
          "supports-color": "npm:supports-color@2.0.0",
          "strip-ansi": "npm:strip-ansi@3.0.1",
          "escape-string-regexp": "npm:escape-string-regexp@1.0.5"
        }
      },
      "npm:babel-helper-bindify-decorators@6.22.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-traverse": "npm:babel-traverse@6.22.1",
          "babel-types": "npm:babel-types@6.22.0"
        }
      },
      "npm:babel-helper-explode-assignable-expression@6.22.0": {
        "map": {
          "babel-traverse": "npm:babel-traverse@6.22.1",
          "babel-runtime": "npm:babel-runtime@6.22.0",
          "babel-types": "npm:babel-types@6.22.0"
        }
      },
      "npm:has-ansi@2.0.0": {
        "map": {
          "ansi-regex": "npm:ansi-regex@2.1.1"
        }
      },
      "npm:strip-ansi@3.0.1": {
        "map": {
          "ansi-regex": "npm:ansi-regex@2.1.1"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "es2015": true,
    "stage2": true,
    "plugins": [
      "babel-plugin-transform-react-jsx"
    ]
  },
  packages: {
    "router-redux": {
      "main": "index.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {},
  packages: {}
});
