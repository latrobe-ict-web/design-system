!function(){"use strict";jQuery(document).ready(function(t){t(".ds-accordion__trigger").each(function(){"true"==t(this).attr("aria-expanded")&&t(this).parent().next(".ds-accordion__content").show()}),t(".ds-accordion__trigger").click(function(){"true"==t(this).attr("aria-expanded")?t(this).attr("aria-expanded","false"):t(this).attr("aria-expanded","true"),t(this).parent().next(".ds-accordion__content").slideToggle()})}),$(document).ready(function(){$(".ds-alert__close").on("click",function(){$(this).parent().remove()})}),$(document).ready(function(){function t(){var t=$(".ds-page-nav-container").offset().top-$(window).scrollTop();1024<=$(window).width()&&t==e?$(".ds-page-nav-container").addClass("ds-page-nav-container--stuck"):$(".ds-page-nav-container").removeClass("ds-page-nav-container--stuck")}if(0<$(".ds-page-nav-container").length){var e=parseInt($(".ds-page-nav-container").css("top"),10);t(),$(window).scroll(function(){t()}),$(window).on("resize",function(){e=parseInt($(".ds-page-nav-container").css("top"),10),t()})}}),$(document).ready(function(){$(".ds-collapse__trigger").click(function(){var t=$(this).attr("aria-controls");"false"==$(this).attr("aria-expanded")?($(this).attr("aria-expanded","true"),$("#"+t).slideDown(function(){$(this).removeAttr("hidden")})):($(this).attr("aria-expanded","false"),$("#"+t).slideUp(function(){$(this).attr("hidden","hidden")}))}),$(".ds-collapse__close").click(function(){var t=$(this).attr("aria-controls");$('.ds-collapse[aria-controls="'+t+'"]').trigger("click").focus()})}),$(document).ready(function(){$(".ds-filter-group__nav__tab").click(function(){var t=$(this).attr("aria-controls");"false"==$(this).attr("aria-expanded")?($(this).siblings().each(function(){var t=$(this).attr("aria-controls");$("#"+t).hide().attr("hidden","hidden"),$(this).attr("aria-expanded","false")}),$(this).attr("aria-expanded","true"),$("#"+t).slideDown(function(){$(this).removeAttr("hidden")})):($(this).attr("aria-expanded","false"),$("#"+t).slideUp(function(){$(this).attr("hidden","hidden")}))})}),jQuery(document).ready(function(n){n("body").on("click",".ds-image-gallery__image, .ds-image-gallery__more button",function(t){t.preventDefault();var e=t.target,a=n(this).parents(".ds-image-gallery");a=a.html(),openModal(e,a)})}),window.openModal=function(t,e,a){void 0===a&&(a="1280px"),$(t).attr("data-returnfocus","yes");var n='<div role="dialog" aria-modal="true" class="overlay"><div class="ds-modal">'+e+'</div><button id="overlay-close" class="ds-btn-round ds-btn--light ds-icon-x">Close</button></div>';$("body").append(n).addClass("overlay-open"),$(".ds-modal").css("max-width",a),$('.overlay[role="dialog"]').fadeIn(function(){$(this).find('button:visible, [href]:visible, input:visible, select:visible, textarea:visible, [tabindex]:not([tabindex="-1"]):visible').eq(0).focus()})},jQuery(document).ready(function(r){r("body").on("click keydown",'#overlay-close, .overlay[role="dialog"]',function(t){void 0!==t.keyCode&&13!=t.keyCode&&27!=t.keyCode||(t.preventDefault(),r('.overlay[role="dialog"]').fadeOut(function(){r('.overlay[role="dialog"]').remove(),r('[data-returnfocus="yes"]').focus().removeAttr("data-returnfocus"),r("body").removeClass("overlay-open")}))}),r("body").on("click","[data-modal-content]",function(t){t.preventDefault();var e,a=t.target,n=r(a).attr("data-modal-content"),o=r(a).attr("data-modal-width");e="medium"==o?"1024px":"large"==o?"1280px":"800px";var i=r("<div/>").append(r("#"+n).clone()).html();openModal(a,i,e)})}),$(document).ready(function(){if(0<$(".ds-hero-promo__text").length&&0<$("#logo h1 img").length){var t=$(window).width(),e=$(this).scrollTop(),a=$(".ds-hero-promo__text").offset().top;1023<t&&(a<e?$("#logo h1 img").css("transform","translateY(0)"):$("#logo h1 img").css("transform","translateY(-100%)")),$(window).scroll(function(){e=$(this).scrollTop(),1023<t&&(a<e?$("#logo h1 img").css("transform","translateY(0)"):$("#logo h1 img").css("transform","translateY(-100%)"))}),$(window).resize(function(){!(1023<(t=$(window).width()))||a<e?$("#logo h1 img").css("transform","translateY(0)"):$("#logo h1 img").css("transform","translateY(-100%)")})}}),$(document).ready(function(){var r={end:35,home:36,left:37,up:38,right:39,down:40,delete:46,enter:13,space:32},d={37:-1,38:-1,39:1,40:1};function o(t,e,a){var n=a.keyCode,o=!1;"vertical"==t.attr("aria-orientation")?n!==r.up&&n!==r.down||(a.preventDefault(),o=!0):n!==r.left&&n!==r.right||(o=!0),o&&function(t,e,a){var n=a.keyCode,o=$(t).children(),i=o.index(e);if(d[n]){a.target;void 0!==i&&(o[i+d[n]]?o[i+d[n]].focus():n===r.left||n===r.up?c(o):n!==r.right&&n!=r.down||s(o))}}(t,e,a)}function i(t,e){e=e||!0;var a,n,o=t.attr("id"),i=$('[aria-labelledby="'+o+'"]');n=i,(a=t).attr("tabindex","-1").siblings('[role="tab"]').attr("tabindex","-1"),a.attr("aria-selected","false").siblings(".ds-tabs-nav__tab").attr("aria-selected","false"),n.attr("hidden","hidden").siblings('[role="tabpanel"]').attr("hidden","hidden"),t.removeAttr("tabindex"),t.attr("aria-selected","true"),i.removeAttr("hidden"),e&&t.focus()}function s(t){t.first().focus()}function c(t){t.last().focus()}$(".ds-tabs-nav__tab").on("click",function(){i($(this),!1)}),$(".ds-tabs-nav__tab").on("keydown",function(t){var e=t.keyCode,a=$(this),n=a.parent();switch(e){case r.end:t.preventDefault(),c($(n).children());break;case r.home:t.preventDefault(),s($(n).children());break;case r.up:case r.down:o(n,a,t)}}),$(".ds-tabs-nav__tab").on("keyup",function(t){var e=t.keyCode,a=$(this),n=a.parent();switch(e){case r.left:case r.right:o(n,a,t);break;case r.enter:case r.space:i(a)}});var t=document.location.toString();t.match("#")&&document.getElementById(t.split("#")[1]).click()}),jQuery(document).ready(function(){$("table").each(function(){$(this).parent().hasClass("ds-table-wrapper")||$(this).wrap('<div class="ds-table-wrapper"></div>')})}),jQuery(document).ready(function(n){n("body").on("click","a[data-youtube]",function(t){t.preventDefault();var e=t.target,a=n(e).attr("data-youtube");openModal(e,'<div class="ds-video ds-video--fullwidth"><div class="ds-video__wrapper"><iframe id="vid-'+a+'" width="560" height="315" type="text/html" src="https://www.youtube.com/embed/'+a+'?rel=0&amp;autoplay=1" frameborder="0" allowfullscreen></iframe></div></div>')})})}();
//# sourceMappingURL=ds-ltu.js.map
