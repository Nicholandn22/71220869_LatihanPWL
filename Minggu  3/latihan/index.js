// const demo = document.getElementById("demo");

// const cars = ['BMW', 'Volvo', 'Saab','Ford','Fiat','Audi'];
// let text = '';
// for (let i = 0; i < cars.length; i++){
//     text += cars[i] + "<br>";
// }
// for (let i = o; i < 5; i++){
//     text +=  "The number is " + i + "<br>"
// }
// document.getElementById('demo').innerHTML = text;

// const person = {name: "john", name: "doe", age:25};
// let txt = "";
// for (let x in person){
//     txt += person[x] + " ";
// }
// const  numbers = [45,4,9,16,25];
// let txt = "";
// for (let x in numbers){
//     txt += numbers[x] + " +++ ";
// }
// document.getElementById('demo').innerHTML = txt;


// const coba = [
//     {name  : "danny", nim: '2207'},
//     {name  : "nila", nim: '1207', gender: "f"},
//     {name  : "mita", nim: '220722', status: 'menikah'},
// ];
// let tt = "";
// for(let i in coba){
//     for(let j in coba[i]){
//         tt += coba[i][j]  + ": ";
//     }
//     tt += "<br>"
// }
// for (let i of coba){
//     tt += `${i.name}: ${i.nim}: ${i.gender ?? ''}: ${i.status ?? ''}:`
// }

// document.getElementById('demo').innerHTML = tt;



// const fruits = new Map([
//     ['apples',500],
//     ['bananas',300],
//     ['oranges',200]
// ])
// document.getElementById('demo').innerHTML = fruits.get("bananas");

// tt = '';
// let recipeMap = new Map([
//     ['cucumber', 500],
//     ['tomatoes', 350],
//     ['onion', 50]
// ])
// for (let vegetable of recipeMap.keys()){
//     // document.getElementById('demo').innerHTML = vegetable;
//     tt += recipeMap.get(vegetable) + "<br>"
// }
// tt += "<br>"
// for (let amount of recipeMap.values()){
//     // document.getElementById('demo').innerHTML = amount;
//     tt += amount + "<br>"
// }
// tt += "<br>"
// for (let entry of recipeMap){
//     // document.getElementById('demo').innerHTML = entry;
//     tt += entry + "<br>"
// }
// tt += "<br>"

// recipeMap.forEach( (value, key) => {
//     tt += `${key} => ${value} <br>`;
// })

// document.getElementById('demo').innerHTML = tt;




// SET
// let satset = new Set();
// let danny = {name:'danny'};
// let nila = {name:'nila'};
// let nila2 = {name:'nila'};
// let mita = {name:'mita'};

// satset.add(danny);
// satset.add(nila);
// satset.add(mita);
// satset.add(danny);
// satset.add(mita);
// text = '';
// text += satset.size + "<br>";
// for (let user of satset){
//     text += user.name + " "
// }
// document.getElementById('demo').innerHTML = text;



//arry n object
// const ages = [32,33,35,39];
// const checkAdult = (ages) => {
//     return ages > 18;
// };
// const result = ages.filter(checkAdult);
// const check = checkAdult(20);
// console.log(result);
// if (check){
//     document.getElementById("demo").innerHTML = "Dewasa";
// } else{
//         document.getElementById("demo").innerHTML = "Muda";
// }

// let employees = [
//     {name:"danny", dept:"ti"},
//     {name:"nila", dept:"ti"},
//     {name:"mita", dept:"dp"}
// ];
// const comp = (employee) => {
//     return `<p>${employee.name}:${employee.dept}</p>`;
// };
// const ITemp = employees.filter((employee) => employee.dept == "ti");
// document.getElementById('demo'),innerHTML = ITemp.map((emp) => comp(emp)).join("-");



// sort
const frts = ['banana','Apol','Orange','apple'];
frts.sort();
document.getElementById("demo").innerHTML = frts;

frts.sort().reverse();
document.getElementById("demo").innerHTML = frts;

//numeric sort
text = "";
const point = [40,100,1,3,5,25,10];
point.sort((a,b) => a-b);
text += "Sort number : " + point;
point.sort((a,b) => b-a);
text += "<br>Sort number reverse : " + point;
document.getElementById("demo").innerHTML = text;


