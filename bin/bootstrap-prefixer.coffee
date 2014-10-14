#!/usr/bin/env node
glob   = require('glob')
fs     = require('fs')
prompt = require('prompt')

userArgs = process.argv.slice(2)
prefix = userArgs[0]
lessPath = userArgs[1]

if prefix and lessPath
	console.log """Please note that this tool is still in early alpha and can damage your files if used wrong."""
	console.log """Are you sure you want to continue? [Y/n]"""
	prompt.start()
	prompt.get ['continue'], (er, res) ->
		unless res.continue is '' or res.continue is 'Y' or res.continue is 'y'
			return console.log 'Not doing anything then.'

		rgx = /(\.)([^\d]\w[^\s"\.]*)([\(,\s;\.])/g
		tildeRgx = /\.col-/g

		addPrefix = (str) ->
			str = str.replace rgx, "$1#{ prefix }$2$3"
			# fix grid-framework.less ~"" values
			str.replace tildeRgx, ".#{ prefix }col-"

		handle = (er, files) ->
			for file in files
				str = fs.readFileSync file, 'utf8'
				fs.writeFileSync file, addPrefix(str)

		glob "#{ lessPath }/*.less", handle
		glob "#{ lessPath }/**/*.less", handle

		console.log 'Finished prefixing.'

else
	unless prefix? and lessPath?
		return console.log """Usage: bootstrap-prefixer [prefix] [path to bootstrap/less]"""
	unless prefix?
		console.log """You didn't supply a prefix to be applied."""
	unless lessPath?
		console.log """You didn't supply a path for the less files."""
