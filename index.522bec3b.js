!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},i=e.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in t){var i=t[e];delete t[e];var o={id:e,exports:{}};return n[e]=o,i.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){t[e]=n},e.parcelRequired7c6=i);var o=i("37gXm"),a=document.querySelector("#search-form"),c=document.querySelector(".gallery"),s=(document.querySelector(".example"),document.querySelector(".load-more")),r=new(0,o.NewsPixabayApi);function l(e){var n=e.map((function(e){return'<div class="photo-card">\n  <img src="'.concat(e.webformatURL,'" alt="').concat(e.tags,'" loading="lazy" class="width_img"/>\n  <div class="info">\n    <p class="info-item">\n      <b>Likes</b><span>').concat(e.likes,'</span>\n    </p>\n    <p class="info-item">\n      <b>Views</b><span>').concat(e.views,'</span>\n    </p>\n    <p class="info-item">\n      <b>Comments</b><span>').concat(e.comments,'</span>\n    </p>\n    <p class="info-item">\n      <b>Downloads</b><span>').concat(e.downloads,"</span>\n    </p>\n  </div>\n  </div>\n  ")})).join("");c.insertAdjacentHTML("beforeend",n)}function d(){c.innerHTML=""}s.addEventListener("click",(function(e){r.fetchPixabayApiService().then(l).catch((function(e){console.log(e),s.classList.add("is-hidden")}))})),a.addEventListener("submit",(function(e){e.preventDefault();var n=e.currentTarget.elements.searchQuery.value.trim();n?(r.query=n,r.ressetPage(),r.fetchPixabayApiService().then((function(e){d(),l(e),s.classList.remove("is-hidden")}))):d()}))}();
//# sourceMappingURL=index.522bec3b.js.map