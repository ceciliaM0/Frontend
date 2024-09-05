var showMessage = function(e) {
    e.preventDefault();
    
    var messageDiv = document.getElementById("message");
    
    messageDiv.textContent = "Ai ajuns la etajul " + e.target.textContent;
    messageDiv.style.display = "block";
    
    var buttonRect = e.target.getBoundingClientRect();
    
    messageDiv.style.top = buttonRect.top + "px"; // Poziționează vertical în funcție de buton
    messageDiv.style.left = (buttonRect.left - messageDiv.offsetWidth - 10) + "px"; // Poziționează în stânga butonului, cu un offset de 10px

    setTimeout(function() {
        messageDiv.style.display = "none";
    }, 2000);
};
  
var buttons = document.getElementsByClassName("button");
  
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', showMessage, false);
}