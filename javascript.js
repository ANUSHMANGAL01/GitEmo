// var XMLHttpRequest = require("xhr2");
// const spawner = require("child_process").spawn;

// const dat_to_pass_in = [
//   "I am angry",
//   "I am happy",
//   "I am sad",
//   "I hate you",
//   "Your work is amazing",
//   "I am sorry",
//   "I messed it up",
// ];

// const python_process = spawner("python", [
//   "./sentiments.py",
//   JSON.stringify(dat_to_pass_in),
// ]);
// python_process.stdout.on("data", (data) => {
//   console.log(JSON.parse(data.toString()));
// });

// const dat_to_pass_in = [
//   "I am angry",
//   "I am happy",
//   "I am sad",
//   "I hate you",
//   "Your work is amazing",
//   "I am sorry",
//   "I messed it up",
// ];

chrome.runtime.onMessage.addListener(function (request) {
  if (request && request.type === "pageRendered") {
    // call method which gets fired as if new page is opened
    console.log("Page rendered anush");
    setTimeout(function () {
      main();
    }, 2000);
  }
});

function main() {
  var elementlist = document.querySelectorAll(
    "td.d-block.comment-body.markdown-body.js-comment-body > p , a.Link--primary.text-bold.js-navigation-open.markdown-title"
  );
  console.log("Anush here");
  var dat_to_pass_in = [];
  let i = 0;
  for (i = 0; i < elementlist.length; i++) {
    dat_to_pass_in.push({ test: elementlist[i].textContent });
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      console.log(typeof responseText);
      console.log("success");
    }
  };
  try {
    xhttp.open("POST", "http://127.0.0.1:5000/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dat_to_pass_in));
  } catch (error) {
    console.log(error);
  }
}
// dat_to_pass_in.push({ test: "I am angry" });
// dat_to_pass_in.push({ test: "I am happy" });
// dat_to_pass_in.push({ test: "I am the king of the world" });
// dat_to_pass_in.push({ test: "I hate this world" });
// dat_to_pass_in.push({ test: "I want a divorce!" });

// const dat_to_pass_in = [
//   { test: "I am angry" },
//   { test: "I am happy and excited" },
//   { test: "I love you" },
//   { test: "I doubt this will work" },
//   { test: "I am the king of this world" },
//   { test: "I hate this world" },
//   {
//     test: "Will you marry me?",
//   },
//   { test: "I don't want to marry you." },
// ];
