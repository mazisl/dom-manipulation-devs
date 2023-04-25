/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container by ID that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...

const container = document.querySelector('.cardsContainer');

//this func changes box color from white to red and vice versa
//it contains two additional funcs to add box to LS and remove box from LS
const changeBackground = (e) => {
  item = e.target;
  if (Array.from(item.classList).includes('card')) {
    if (!item.style.backgroundColor) {
      addToLS(item.id);
      item.style.backgroundColor = 'red';
    } else {
      removeFromLS(item.id);
      item.style.backgroundColor = '';
    }
  }
}

container.addEventListener('click', changeBackground);

const data = {
  items: []
}

const addToLS = (item) => {
  if (!data.items.length) {
    data.items.push(item);  
    localStorage.setItem("favorites", JSON.stringify(data));
  }

  if (!data.items.includes(item)) {

    const storageFavsDataRaw = localStorage.getItem('favorites');
    const updatedData = JSON.parse(storageFavsDataRaw);
    updatedData.items.push(item)
    localStorage.setItem("favorites", JSON.stringify(updatedData));
  }

}

const removeFromLS = (item) => {

  const currentLSRaw = localStorage.getItem('favorites');
  const updatedLSData = JSON.parse(currentLSRaw);

  if (!updatedLSData.items.length) return

  if (updatedLSData.items.includes(item) && updatedLSData.items.length === 1) {
    updatedLSData.items.splice(updatedLSData.items.indexOf(item), 1).join(',');
    data.items.length = 0;
    updatedLSData.items.length = 0;
  }

  if (updatedLSData.items.includes(item)) {
    updatedLSData.items.splice(updatedLSData.items.indexOf(item), 1).join(',');
  }
  
  localStorage.setItem("favorites", JSON.stringify(updatedLSData));
}

// here we make sure the current box color stays on page reload
const containerItemsArr = Array.from(container.children);

const LSitems = localStorage.getItem('favorites');
console.log(LSitems);
const LSitemsObj = JSON.parse(LSitems);
console.log(LSitemsObj);

if (LSitems && LSitemsObj.items.length) {
  for (let elm of containerItemsArr) {
    if (LSitemsObj.items.includes(elm.id)) {
      elm.style.backgroundColor = 'red'
    }
  }
}