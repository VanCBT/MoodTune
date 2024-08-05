document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion = 1;
    const totalQuestions = 4;
    
    document.getElementById('nextQuestion').addEventListener('click', function() {
      // hide the current question 
      document.getElementById(`question${currentQuestion}`).classList.remove('active');
      // increment to the count
      currentQuestion++
      // if the current question is less than the total questions it will show the next question
      if (currentQuestion <= totalQuestions) {
        document.getElementById(`question${currentQuestion}`).classList.add('active');
        if (currentQuestion === totalQuestions) {
          this.style.display = 'none';
          document.getElementById('submitAnswers').style.display = 'inline';
        
        }
    }
}
 
    
  document.getElementById(musicForm).addEventListener('submit', async function(event)) {
  event.preventDefault();
    
    const currentMood = document.getElementById('currentMood').value;
    const desiredMood = document.getElementById('desiredMood').value;
    const favoritePart = Array.from(document.getElementById('favoritePart').selectedOptions).map(option => option.value);
    const genres = Array.from(document.getElementById('genres').selectedOptions).map(option => option.value);
    
    // we need to continue here with const the items that are coming through the API
  }
  



//let slideIndex = 0;
  showSlides();
  
  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }
  //Multiple Slideshows Example
  let slideIndex = [1,1];
  /* Class the members of each slideshow group with different CSS classes */
  let slideId = ["mySlides1", "mySlides2"]
  showSlides(1, 0);
  showSlides(1, 1);
  
  function plusSlides(n, no) {
    showSlides(slideIndex[no] += n, no);
  }
  
  function showSlides(n, no) {
    let i;
    let x = document.getElementsByClassName(slideId[no]);
    if (n > x.length) {slideIndex[no] = 1}
    if (n < 1) {slideIndex[no] = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[slideIndex[no]-1].style.display = "block";
  }
