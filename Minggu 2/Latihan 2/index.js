// const demo = document.getElementById("demo");
// const testlet = () => {
//     let num = 100;
//     {
//         let num = 200;
//     }
//     return num;
// }

// document.getElementById("demo").innerHTML = testlet();

// const testVar = () => {
//     let num = 101;
//     {
//         let num = 201;
//     }
//     return num;
// }

// document.getElementById("demo").innerHTML = testVar();



// try {
//   const PI = 3.141592653589793;
//   PI = 3.14;
//   document.getElementById("demo").innerHTML = PI;
// } catch (err) {
//   document.getElementById("demo").innerHTML = err;
// }




// let name = 'Bonbon';
// let age = 25;
// let isApproved = true ;
// let firstName = "Nicholas";
// let lastName = null ;
// document.getElementById('demo').innerHTML = `<p>This Undefined variabel is: ${firstName}</p>`

// var a = 3.14;
// var b = a;
// a = 4;
// document.getElementById('demo').innerHTML = b;


// let person = {
//     name,
//     age
//     }
    
// console.log("Person :", person, "Name :", person.name, "Age :", person.age)

// // Bracket notation
// person['name'] = 'Marry'
// person['age'] = 25
// let selection = 'name'
// console.log("Person :", person, "Name :", person['name'], "Age :",
// person['age'], person[selection])

// // b. Array notation
// let selectedColors = ['red', 'blue']
// selectedColors.push('pink')
// selectedColors.push(1)
// console.log("Selected Colors:", selectedColors, selectedColors[0])

// // c. Function
// function greet(names) {
// console.log("hello " + names)
// }
// let names = 'John'
// greet(names)
// greet("abc")
// greet("Sapipul paladin")

// var a = [1,2,3]; // Initialize a variable to refer to an array
// var b = a; // Copy that reference into a new variable
// a[0] = 99; // Modify the array using the original reference
// alert(b); // Display the changed array [99,2,3] using the new
    

// function rect(w,h){
//     return w*h;
// }
// console.log(rect(5,4));
// const rect1 = function (w, h) {
//     return w * h;
// }
// console.log(rect(2,3));
// const rect2 = (w, h) =>{
//     return w * h;
// }
// console.log(rect(7,4));
// const rect3 = (w, h) => w *h;
// console.log(rect(9,2));


// // ES5
// var car = {
//     name: "Honda",
//     products: ["jazz", "civic", "hrv"],
//     showProduct: function () {
//     this.products.map(
//     function (product) {
//     console.log(`${this.name} has launched ${product}`);
//     }.bind(this)
//     );
// },
// };
// car.showProduct();


// // ES6
// var car = {
//     name: "Honda",
//     products: ["jazz", "civic", "hrv"],
//     showProduct: function () {
//     this.products.map((product) => {
//     console.log(`${this.name} has launched ${product}`);
//     });
//     },
//     };
//     car.showProduct();
    

// let firstName = "Nicholas";
// let lastName = 'Dwinata';
// let text = `Welcome ${lastName}, ${firstName}!`;
// document.getElementById("demo").innerHTML = text;

// let text =
// `The quick
// brown fox
// jumps over
// the lazy dog`;
// document.getElementById("demo").innerHTML = text;
 


// const formatMessage = (name, id, avatar) => {
//     return {
//     name,
//     id,
//     avatar,
//     timestamp: Date.now(),
//     save () {
//         console.log("save");
//     //save message
//     }
//     }
//     }
//     const message = formatMessage("Belajar Programming", 1,
//     "https://i.pravatar.cc/300");
//     document.getElementById("demo").innerHTML = message.name;


// let person = {
//     firstName: 'John',
//     lastName: 'Doe'};
//     let { firstName: fname, lastName: lname } = person;
//     document.getElementById("demo").innerHTML = `First name: ${fname}, Last
//     Name: ${lname}`;
    

// let func = (a, b = 2) => {
//     return a + b
//     }
//     document.getElementById("demo").innerHTML = func(10) // return 12
//     document.getElementById("demo").innerHTML = func(10, 5) // return 15

// // opsi 1
// const q1 = ["Jan", "Feb", "Mar"];
// const q2 = ["Apr", "May", "Jun"];
// const q3 = ["Jul", "Aug", "Sep"];
// const q4 = ["Oct", "Nov", "May"];
// // const year = [q1, ...q2, ...q3, ...q4];
// const year = [q1,q2,q3, q4];
// // opsi 2
// const numbers = [23,55,21,87,56];
// let maxValue = Math.max(...numbers);
// console.log(maxValue);
// document.getElementById("demo").innerHTML = year;


// import {name, age} from "./person.js";
import {message} from "./person.js";

let text = "My name is " + name + ", I am " + age + "old.";
// let text = message();
document.getElementById("demo").innerHTML = text;

