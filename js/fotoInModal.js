// Get the modal
document.addEventListener("DOMContentLoaded", function(){
  console.log("HOLA");
  var modal = document.getElementById('myModal');
  var images = document.getElementsByClassName("imageClass");
  console.log(images.length);
  for(var i = 0; i < images.length; i++){
      var img = images[i];
      var modalImg = document.getElementById("img01");
      var captionText = document.getElementById("caption");
      img.onclick = function(){
          console.log("click");
          modal.style.display = "block";
          modalImg.src = this.src;
          modalImg.alt = this.alt;
          captionText.innerHTML = this.alt;
      }
  }
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
});
