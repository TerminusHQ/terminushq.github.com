module.exports = ->
  $("body").append Handlebars.templates["welcome"]()
  $("body").append Handlebars.templates["footer/view"]()

  require("pokeball/helpers/component").initialize()

  console.info "log from app!"
