const changeThemeButton = document.querySelector("#changeThemeButton");

//toggle color theme 

//create function for changing button text
function changeButtonText() {
    if(document.body.classList.contains("dark")) {
        changeThemeButton.textContent = "Light Mode";
    } else {
        changeThemeButton.textContent = "Dark Mode";
    }
}

//click event on button
changeThemeButton.addEventListener("click", () => {
    //add/remove dark class to body
    document.body.classList.toggle("dark"); //knows the value entered is a class already
    changeButtonText();
})
