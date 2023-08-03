function setHeights() {
  var heights = [];
  $(".carousel-item").each(function () {
    heights.push($(this).height() + 5);
  });

  $(".carousel-item").height(Math.max(...heights));
}

setHeights();

// Card Scroll

$(function () {
  "use strict";

  //Subtitle Animation

  $(".profile-subtitle.subtitle-typed").each(function () {
    var subtitleContainer = $(this);

    subtitleContainer.typed({
      stringsElement: subtitleContainer.find(".typing-title"),
      backDelay: 3500 /* Delay in text change */,
      typeSpeed: 0 /* Typing speed */,
      loop: true,
    });
  });

  // Card Scroll Animation

  var container = $(".container");
  var card_items = $(".card-right");
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
    var d_lnk = $(".lnks .lnk.discover");

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
          scrollTop: h - 125,
        },
        800
      );
    }
    return false;
  });

  $(window).on("resize", function () {
    var width = $(window).width();
    var height = $(window).height();

    if (width < 1199) {
      $(".card-right").removeClass("hidden");
      $(".card-right").removeClass("fadeOutLeft");
      $(".card-right").removeClass("rotateOutUpLeft");
      $(".card-right").removeClass("rollOut");
      $(".card-right").removeClass("jackOutTheBox");
      $(".card-right").removeClass("fadeOut");
      $(".card-right").removeClass("fadeOutUp");
      $(".card-right").removeClass("animated");

      $(window).on("scroll", function () {
        var scrollPos = $(window).scrollTop();
        $(".nav-bar ul li a").each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.offset().top - 140 <= scrollPos) {
            $(".nav-bar ul li").removeClass("active");
            currLink.closest("li").addClass("active");
          }
        });
      });

      $(".card-right .card-wrap").slimScroll({ destroy: true });
      $(".card-right .card-wrap").attr("style", "");
    } else {
      $($(".nav-bar li.active a").attr("href")).addClass("active");
    }
  });

  /*
  Smoothscroll
*/
  var width = $(window).width();

  if ((width < 1199) & $("#home-card").length) {
    $(window).on("scroll", function () {
      var scrollPos = $(window).scrollTop();
      $(".nav-bar ul li a").each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.offset().top - 140 <= scrollPos) {
          $(".nav-bar ul li").removeClass("active");
          currLink.closest("li").addClass("active");
        }
      });
    });
  }
});
