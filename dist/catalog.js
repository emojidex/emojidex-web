(function() {
  var name, signal, x;

  console.log(222);

  name = "aaa";

  console.log(name);

  signal = "blue";

  switch (signal) {
    case "red":
      alert("stop");
      break;
    case "blue":
      alert("go");
      break;
    default:
      console.log("owari");
  }

  x = 50;

  if (x < 30) {
    console.log("OK");
  } else if (x < 40) {
    alert("NO");
  } else {
    alert("sankusu");
  }

}).call(this);
