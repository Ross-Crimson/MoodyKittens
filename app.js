let activeKitten = {}
let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  console.log("submitted")
  let form = event.target

  let kittenName = form.name.value

  activeKitten = kittens.find(kitten => kitten.name == kittenName)

  if(!activeKitten){
    activeKitten = {id: generateId(), name: kittenName, mood: "mood", affection: 0}
    kittens.push(activeKitten)
    saveKittens()
  }


  form.reset()
  drawKittens()
  setKittenMood(activeKitten)

  document.getElementById("kitten-name").innerText = activeKitten.name

  document.getElementById("raise-game")?.classList.remove("hidden")
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"))
  if(kittenData){
    kittens = kittenData
  }
  drawKittens()
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = ""
  kittens.sort((p1, p2) => p2.name - p1.name)
  kittens.forEach(kitten => {
    template += `
    <div>
    <span>${kitten.name}</span>
    <span>: ${kitten.mood} &nbsp;</span>
    </div>
    `
  })

  document.getElementById("kittens").innerHTML = template
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let connectAttempt = Math.random()
  if (connectAttempt > .5){
    activeKitten.affection ++;
  }
  else{
    activeKitten.affection --;
  }

  if(activeKitten.affection < 0) activeKitten.affection = 0;
  
  setKittenMood(activeKitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  activeKitten.affection = 5
  setKittenMood(activeKitten)
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  let kittenImgElement = document.getElementById("kitten-mood");
  let mood
  if(kitten.affection <= 3){
    kittenImgElement.src = "cat_angry.png"
    kitten.mood = "Angry"
  }
  else if(kitten.affection <= 7){
    kittenImgElement.src = "cat_neutral.png"
    kitten.mood = "Tolerant"
  }
  else{
    kittenImgElement.src = "cat_happy.png"
    kitten.mood = "Happy"
  }
  console.log(kitten.affection)
  saveKittens()
  return mood
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = []
  saveKittens()
  drawKittens()
  document.getElementById("raise-game")?.classList.add("hidden")
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
