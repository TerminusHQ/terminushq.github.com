$(".slide-menu").on "click touchend", ->
  $("body").toggleClass("slide")
  $(".navigation").toggleClass("slide")

console.log("%cWelcome%chttp://terminus.io/about",
  "line-height: 30px;
  border-radius: 5px 0 0 5px;
  background-color: #666;
  color: white;
  padding: 6px;",
  "border-radius: 0 5px 5px 0;
  border: 1px solid #666;
  color: #666;
  padding: 5px;"
) if console
