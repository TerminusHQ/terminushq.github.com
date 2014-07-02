$ ->
  # console output for chrome
  if console and console.log
    console.log("%cWelcome%chttp://terminus.io/etc/jd", "line-height: 30px; border-radius: 5px 0 0 5px; background-color: #666; color: white; padding: 6px;", "border-radius: 0 5px 5px 0; border: 1px solid #666; color: #666; padding: 5px;")

  $("a[data-scroll]").click (evt) ->
    evt.preventDefault()
    $target = $($(@).attr("href"))
    if $target.length > 0
      $("body").animate
        scrollTop: $target.offset().top
      , 400
