// Get the modal
var modal = document.getElementById('myModal');
var images = document.getElementsByClassName("imageClass");
for(var i = 0; i < images.length; i++){
    var img = images[i];
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        captionText.innerHTML = this.alt;
    }
}
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
$('#closeImage').onclick = function() {
  modal.style.display = "none";
}
