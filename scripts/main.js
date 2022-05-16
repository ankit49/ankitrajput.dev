// Card Scroll

$(function () {
  "use strict";

  // Card Scroll Animation

  var container = $(".container");
  var card_items = $(".card-inner");
  var animation_in = container.data("animation-in");
  var animation_out = container.data("animation-out");

  $(".nav-bar").on("click", "a", function () {
    /* vars */
    var width = $(window).width();
    var id = $(this).attr("href");
    var h = parseFloat($(id).offset().top);
    var card_item = $(id);
    var menu_items = $(".nav-bar li");
    var menu_item = $(this).closest("li");

    if (width >= 1199) {
      /* if desktop */
      if (
        !menu_item.hasClass("active") &
        (width > 1199) &
        $("#home-card").length
      ) {
        /* close card items */
        menu_items.removeClass("active");
        container.find(card_items).removeClass("animated " + animation_in);

        if ($(container).hasClass("opened")) {
          container.find(card_items).addClass("animated " + animation_out);
        }

        /* open card item */
        menu_item.addClass("active");
        container.addClass("opened");
        container.find(card_item).removeClass("animated " + animation_out);
        container.find(card_item).addClass("animated " + animation_in);

        $(card_items).addClass("hidden");

        $(card_item).removeClass("hidden");
        $(card_item).addClass("active");
      }
    }
    /* if mobile */
    if ((width < 1199) & $("#home-card").length) {
      /* scroll to section */
      $("body,html").animate(
        {
          scrollTop: h - 76,
        },
        800
      );
    }
    return false;
  });
});
