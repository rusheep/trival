'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"' ,
  APIPATH:  '"https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json"',
})
