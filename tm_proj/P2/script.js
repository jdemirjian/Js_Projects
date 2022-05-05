//selects just one thing / first thing
const container = document.querySelector('.container'); 
// puts things in a node list -> similar to an array / can run methods on it / .row goes through each row & :not(.occupied) will grab anything without the class .occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)') 

const count = document.getElementById('count');
const total = document.getElementById('total');
//gives us the element
const movieSelect = document.getElementById('movie'); 
//+ infront of "movieSelect.value" turns it into a number
let ticketPrice = +movieSelect.value; 

populateUI();

//functions

// Save SelectedMovie index & price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update total and count
function updateSelectedCount() { 
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //Notes for seatsIndex construction
    //need an array of indexes to help store local memory
    //Map through that array
    //Return a new array of indexes
    //"..." is the Spread Operator because it copies the elements of an array
    //in our case, it is also converting the node list into a regular array
    //.map() high-order array method ; similar to forEach() ; .map() returns an array
    //.map() takes in a function -- can use an "arrow function"
    //because there's only one expression / one return ; we can get rid of "return" and the curly braces
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat))

    //localStorage is built into the browser
    //localStorage.setItem takes in a key-value pair
    //We could set 'name' to 'Brad' by using .setItem('name', 'Joe') for example
    //We're saving an array, the seatsIndex ; 'selectedSeats'
    //Need to wrap seatsIndex in JSON.stringify because seatsIndex is an array
    //This line of code does not allow us to actually use the saved information 
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    
    //.length gets the # of elements in an array or node list
    const selectedSeatsCount = selectedSeats.length;     

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from local storage & populate UI
function populateUI() {
    //need to pull out the selectedSeats from local storage
    //because we used the JSON.stringify to turn it into a string, we need to turn it back into an array
    //basically, JSON.parse does the opposite of JSON.stringify, so we use it to convert the information back into an array
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        //need index to call in selectedSeats.indexOf()
        seats.forEach((seat , index) => {
            if(selectedSeats.indexOf(index) > -1) {
                //callList.add() allows us to add the 'selected' class to any clicked seat in the local storage 
                seat.classList.add('selected');
            }
        });

    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;  
    }
}

//Eventlisteners
//(e) => is an "arrow function"

//Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount;
})

//seat click event
container.addEventListener('click', (e) => { 
    //on click, check to make sure that BOTH a SEAT & a non-occupied SEAT are selected
    if  ( 
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    )   {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
})

//Initial Count and Total set
updateSelectedCount();