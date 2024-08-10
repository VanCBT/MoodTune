const Form1 = document.getElementById("Form1");
const Form2 = document.getElementById("Form2");
const Form3 = document.getElementById("Form3");
const Form4 = document.getElementById("Form4");
const Form5 = document.getElementById("Form5");

const Next1 = document.getElementById("next1");
const Next2 = document.getElementById("next2");
const Next3 = document.getElementById("next3");
const Next4 = document.getElementById("next4");

Next1.onclick = function() {
  Form1.style.left = "-450px";
  Form2.style.left = "40px";
}

Next2.onclick = function() {
  Form2.style.left = "-450px";
  Form3.style.left = "40px";
}

Next3.onclick = function() {
  Form3.style.left = "-450px";
  Form4.style.left = "40px";
}

Next4.onclick = function() {
  Form4.style.left = "-450px";
  Form5.style.left = "40px";
}
