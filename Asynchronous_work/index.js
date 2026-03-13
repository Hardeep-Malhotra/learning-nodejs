






// This is the so-called callback.

// A callback is a simple function that's passed as a value to another function, and will only be executed when the event happens. We can do this because JavaScript has first-class functions, which can be assigned to variables and passed around to other functions (called higher-order functions)

// It's common to wrap all your client code in a load event listener on the window object, which runs the callback function only when the page is ready:

function greet(name,sayBye){
    console.log("Hello,"+name);
    sayBye();
}

function sayBye(){
    console.log("GoodBye!")
}

greet("Ajay",sayBye)





window.addEventListener('load',()=>{
    alert("window is loadedd...")
})

setTimeout(() => {
  window.addEventListener("load", () => {
    alert("window is loadedd...");
  });
}, 2000);


// Handling errors in callbacks
// How do you handle errors with callbacks? One very common strategy is to use what Node.js adopted: the first parameter in any callback function is the error object: error-first callbacks

// If there is no error, the object is null. If there is an error, it contains some description of the error and other information.


const fs = require('node:fs');
const { stringify } = require('node:querystring');

fs.readFile('./sync-vs-async.js',(err,data)=>{
    if(err){
        console.log(err);
        return ;
    }
    
;
    console.log(data.toString())
})

