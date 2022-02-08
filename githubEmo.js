// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === "function" && parcelRequire;
  var nodeRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === "function" && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === "string") {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = "MODULE_NOT_FOUND";
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})(
  {
    "sotagger.js": [
      function (require, module, exports) {
        var array = [];

        chrome.runtime.onMessage.addListener(function (request) {
          if (request && request.type === "pageRendered") {
            // call method which gets fired as if new page is opened
            setTimeout(function () {
              main();
            }, 2000);
          }
        });

        function main() {
          var elementlist = document.querySelectorAll(
            "td.d-block.comment-body.markdown-body.js-comment-body > p , a.Link--primary.text-bold.js-navigation-open.markdown-title"
          );

          var emoji_list1 = {
            anger: "😠",
            fear: "😨",
            joy: "😂",
            sadness: "😥",
            surprise: "😯",
            confidence: "😁",
            confused: "😵",
            worried: "😟",
            praise: "🙌",
            mistake: "😕",
          };
          var emoji_list2 = {
            anger: "😤",
            fear: "😱",
            joy: "😄",
            sadness: "☹️",
            surprise: "😮",
            confidence: "😎",
            confused: "😖",
            worried: "😦",
            praise: "👏",
            mistake: "😅",
          };
          var xhttp = new XMLHttpRequest();
          var dat_to_pass_in = [];
          let i = 0;
          for (i = 0; i < elementlist.length; i++) {
            if (elementlist[i].innerText.length > 10) {
              dat_to_pass_in.push({ test: elementlist[i].innerText });
            }

            // console.log(elementlist[i].textContent);
          }
          try {
            console.log(dat_to_pass_in);
            xhttp.open("POST", "http://127.0.0.1:5000/", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(dat_to_pass_in));
          } catch (error) {
            console.log(error);
          }
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              // console.log(i);
              console.log(this.responseText);
              console.log(typeof this.responseText);
              console.log("success");
              var my_array = this.responseText.split(", ");

              let loopi = 0;
              let i = 0;
              for (i = 0; i < elementlist.length; i++) {
                if (elementlist[i].innerText.length > 10) {
                  var my_string = "";

                  //emoji 1
                  let emoji = my_array[loopi++];
                  // emoji = emoji.trim();
                  emoji = emoji.replace(/[^a-zA-Z ]/g, "");

                  my_string = emoji_list2[emoji] + my_string;

                  //emoji 2
                  emoji = my_array[loopi++];
                  // emoji = emoji.trim();
                  emoji = emoji.replace(/[^a-zA-Z ]/g, "");

                  my_string = emoji_list1[emoji] + my_string;

                  const div = document.createElement("div");
                  div.innerHTML = my_string;
                  elementlist[i].appendChild(div);
                  // elementlist[i].innerText = my_string;
                }
              }
            }
          };
        }

        $(document).ready(function () {
          main();
        });
      },
      {},
    ],
  },
  {},
  ["sotagger.js"],
  null
);
//# sourceMappingURL=/sotagger.797a247b.js.map
