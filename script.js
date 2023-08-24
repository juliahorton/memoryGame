const gameContainer = document.querySelector("#game");
sessionStorage.setItem("oneCardOver", "false");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute("data-match-status", "false");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  event.target.style.backgroundColor = event.target.getAttribute("class");
  
  if (sessionStorage.oneCardOver === "false") {
    sessionStorage.oneCardOver = true;
    event.target.setAttribute("id", "first-card");
    const firstCard = document.querySelector("#first-card");
    firstCard.removeEventListener("click", handleCardClick);
    console.log(event.target);
    console.log(sessionStorage.oneCardOver);
  } else if (sessionStorage.oneCardOver === "true") {
      sessionStorage.oneCardOver = "false";
      event.target.setAttribute("id", "second-card");
      const secondCard = document.querySelector("#second-card");
      const divs = document.querySelectorAll("[class]");
      console.log(divs);
      for (let div of divs) {
        div.removeEventListener("click", handleCardClick);
      }  
      
      if (document.querySelector("#first-card").getAttribute("class") === document.querySelector("#second-card").getAttribute("class")) {
          document.querySelector("#first-card").setAttribute("data-match-status", "true");
          document.querySelector("#second-card").setAttribute("data-match-status", "true");
          const nonMatches = document.querySelectorAll('[data-match-status="false"]')
          for (let nonMatch of nonMatches) {
            nonMatch.addEventListener("click", handleCardClick);
          }
          document.querySelector("#first-card").removeAttribute("id");
          document.querySelector("#second-card").removeAttribute("id");
        } else {
            setTimeout(function() {
              document.querySelector("#first-card").style.removeProperty("background-color");
              document.querySelector("#second-card").style.removeProperty("background-color");
              document.querySelector("#first-card").removeAttribute("id");
              document.querySelector("#second-card").removeAttribute("id");
              const divs = document.querySelectorAll('[data-match-status="false"]');
              for (let div of divs) {
                div.addEventListener("click", handleCardClick);
              } 
            }, 1000)
          }
    }
}

// when the DOM loads
createDivsForColors(shuffledColors);