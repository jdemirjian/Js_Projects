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

//functions

//update total and count
function updateSelectedCount() { 
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //.length gets the # of elements in an array or node list
    const selectedSeatsCount = selectedSeats.length;     

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}



//Eventlisteners
    //(e) => is an "arrow function"

    //Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
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