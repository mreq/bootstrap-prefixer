//!/usr/bin/env node
(function() {
  var fs, glob, lessPath, prefix, prompt, userArgs;

  glob = require('glob');

  fs = require('fs');

  prompt = require('prompt');

  userArgs = process.argv.slice(2);

  prefix = userArgs[0];

  lessPath = userArgs[1];

  if (prefix && lessPath) {
    console.log("Please note that this tool is still in early alpha and can damage your files if used wrong.");
    console.log("Are you sure you want to continue? [Y/n]");
    prompt.start();
    prompt.get(['continue'], function(er, res) {
      var addPrefix, handle, rgx;
      if (!(res["continue"] === '' || res["continue"] === 'Y' || res["continue"] === 'y')) {
        return console.log('Not doing anything then.');
      }
      rgx = /(\.)([^\d]\w[^\s"\.]*)([\(,\s;\.])/g;
      addPrefix = function(str) {
        return str.replace(rgx, "$1" + prefix + "$2$3");
      };
      handle = function(er, files) {
        var file, str, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          str = fs.readFileSync(file, 'utf8');
          _results.push(fs.writeFileSync(file, addPrefix(str)));
        }
        return _results;
      };
      glob("" + lessPath + "/*.less", handle);
      glob("" + lessPath + "/**/*.less", handle);
      return console.log('Finished prefixing.');
    });
  } else {
    if (!((prefix != null) && (lessPath != null))) {
      return console.log("Usage: bootstrap-prefixer [prefix] [path to bootstrap/less]");
    }
    if (prefix == null) {
      console.log("You didn't supply a prefix to be applied.");
    }
    if (lessPath == null) {
      console.log("You didn't supply a path for the less files.");
    }
  }

}).call(this);
