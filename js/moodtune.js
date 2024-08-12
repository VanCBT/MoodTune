const Form1 = document.getElementById("Form1");
const Form2 = document.getElementById("Form2");
const Form3 = document.getElementById("Form3");
const Form4 = document.getElementById("Form4");
const Form5 = document.getElementById("Form5");

const Next1 = document.getElementById("next1");
const Next2 = document.getElementById("next2");
const Next3 = document.getElementById("next3");
const Next4 = document.getElementById("next4");

const forms = document.querySelectorAll('fieldset');
const nextButtons = document.querySelectorAll('.next-question');

nextButtons.forEach((button, index) => {
  button.onclick = function(event) {
    event.preventDefault(); // Prevent form submission
     forms[index].style.right = "-145%";
     forms[index].style.left = "unset";
     forms[index].classList.remove('active');

    if (forms[index + 1]) {
       forms[index + 1].classList.add('active');
    }
  };
});