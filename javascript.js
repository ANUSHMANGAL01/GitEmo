const spawner = require("child_process").spawn;

const dat_to_pass_in = [
  "I am angry",
  "I am happy",
  "I am sad",
  "I hate you",
  "Your work is amazing",
  "I am sorry",
  "I messed it up",
];

const python_process = spawner("python", [
  "./sentiments.py",
  JSON.stringify(dat_to_pass_in),
]);
python_process.stdout.on("data", (data) => {
  console.log(JSON.parse(data.toString()));
});
