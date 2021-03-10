const middleware = {}

middleware['annoymous'] = require('..\\middleware\\annoymous.js')
middleware['annoymous'] = middleware['annoymous'].default || middleware['annoymous']

middleware['authenticated'] = require('..\\middleware\\authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

export default middleware
