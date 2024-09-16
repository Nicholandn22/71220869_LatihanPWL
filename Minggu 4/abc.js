// const fs = require('fs');

// let content;
// fs.readFile('text.txt','utf-8', (err, data) => {
//     if(err){
//         throw new Error('Error in reading source');
//     }
//     content = data;
// });
// console.log(content);

// function asyncDivision(dividend, divisor, cb){
//     setTimeout(() => {
//         let err;

//         if (isNaN(dividend) && isNaN(divisor)){
//             err = 'One of dividend or divisor is not a number';
//             cb(err, null);
//         }

//         if(divisor === 0){
//             err = 'divide by zero';
//             cb(err, null);
//         }

//         const quotient = Number(dividend) / Number(divisor);
//         cb(null, quotient);
//     }, 2000);
// }

// asyncDivision(14, 0, (err, result) => {
//     if (err) {
//       throw new Error(err);
//     }
//     console.log(err, result);
//   });

// asyncDivision(14, 2, (err, result) => {
//     if (err) {
//       throw new Error(err);
//     }
  
//     console.log(err, result);
//   });



// function isNumber (a, b, cb) {
//     setTimeout(()=> {
//       if (isNaN(a) || isNaN(b)) {
//         err = 'One of input is not a number';
//         cb(err, null);
//       } else {
//         cb(null, true);
//       }
//     }, 500)
//   };
  
//   function divide (a, b, cb) {
//     setTimeout(()=> {
//       if (b === 0) {
//         err = 'Divide by zero';
//         return cb(err, null);
//       }
  
//       const result = Number(a) / Number(b);
//       cb(null, result);
//     }, 1500)
//   };
  
//   function multiply (a, b, cb) {
//     setTimeout(()=> {
//       const result = Number(a) * Number(b);
//       cb(null, result);
//     }, 1000)
//   }
  
//   function add (a, b, cb) {
//     setTimeout(()=> {
//       const result = Number(a) + Number(b);
//       cb(null, result);
//     }, 500);
//   }
  
//   // callback hell start here...
//   isNumber(6, 3, (err, isNumber)=> {
//     if (err) {
//       throw new Error(err);
//     }
  
//     divide(6, 3, (err, divResult)=> {
//       if (err) {
//         throw new Error(err);
//       }
  
//       multiply(divResult, 7, (err, multiResult)=> {
//         if (err) {
//           throw new Error(err);
//         }
  
//         add(multiResult, 1, (err, addResult)=> {
//           if (err) {
//             throw new Error(err);
//           }
  
//           console.log(`The final result is ${addResult}`);
//         }
//     );
//       }
//     );
//     }
// );
//   })
//   ;



// const isNumber = (a, b)=> new Promise((resolve, reject)=> {
//     setTimeout(() => {
//       if (isNaN(a) || isNaN(b)) {
//         err = 'One of input is not a number';
//         reject(err);
//       } else {
//         resolve(true);
//       }
//     }, 500)
//   });
  
//   const divide = (a, b)=> new Promise((resolve, reject)=> {
//     setTimeout(()=> {
//       if (b === 0) {
//         err = 'Divide by zero';
//         return reject(err);
//       }
  
//       const result = Number(a) / Number(b);
//       resolve(result);
//     }, 1500)
//   });
  
//   const multiply = (a, b)=> new Promise((resolve, reject)=> {
//     setTimeout(()=> {
//       const result = Number(a) * Number(b);
//       resolve(result);
//     }, 1000)
//   });
  
//   const add = (a, b)=> new Promise((resolve, reject)=> {
//     setTimeout(()=> {
//       const result = Number(a) + Number(b);
//       resolve(result);
//     }, 500);
//   });
  
//   // promise start here...
//   isNumber(6, 3)
//     .then(()=> {
//       const a = 4;
//       return divide(6, 3);
//     })
//     .then(result=> {
//       // uncomment next line will yield an error because const a is beyond this scope
//       // console.log(a);
  
//       return multiply(result, 7);
//     })
//     .then(result=> add(result, 1))
//     .then((result)=> {
//       console.log(`The final result is ${result}`);
//     })
//     .catch((err)=> console.log(err));



// export function bookApartment(req, res, next) {
//     booking.create(req.booking)
//       .then(function(data){
//           notifier.sendBookingConfirmation(data)
//           .then(function(result){
//             statistics.log(data) 
//             .then(function(result){
//               log.debug('booking-succeeded');
//             })
//             .catch(function(err){
//               next(err);
//             });
//           })
//           .catch(function(err){
//             next(err);
//           });
//       })
//       .then(function(){ 
//         res.send(200);
//       })
//       .catch(function(err) {
//           next(err);
//       });
//   }


// const co = require('co');
// const Promise = require('bluebird');

// const isNumber = (a, b)=> new Promise((resolve, reject)=> {
//   setTimeout(()=> {
//     if (isNaN(a) || isNaN(b)) {
//       err = 'One of input is not a number';
//       reject(err);
//     } else {
//       resolve(true);
//     }
//   }, 500)
// });

// const divide = (a, b)=> new Promise((resolve, reject)=> {
//   setTimeout(()=> {
//     if (b === 0) {
//       err = 'Divide by zero';
//       return reject(err);
//     }

//     const result = Number(a) / Number(b);
//     resolve(result);
//   }, 1500)
// });

// const multiply = (a, b)=> new Promise((resolve, reject)=> {
//   setTimeout(()=> {
//     const result = Number(a) * Number(b);
//     resolve(result);
//   }, 1000)
// });

// const add = (a, b)=> new Promise((resolve, reject)=> {
//   setTimeout(()=> {
//     const result = Number(a) + Number(b);
//     resolve(result);
//   }, 500);
// });

// const a = 6;
// const b = 3;

// const coroutine = Promise.coroutine(function* run(a, b) {
//   yield isNumber(a, b);
//   const divideResult = yield divide(a, b);
//   const multiplyResult = yield multiply(divideResult, 7);
//   const addResult = yield add(multiplyResult, 1);

//   return addResult;
// })

// coroutine(a, b)
//   .then((result)=> console.log(`The final result is ${result}`))
//   .catch((err)=> console.log(err));

// // implementation using co
// co(function* run() {
//   const a = 6;
//   const b = 3;

//   yield isNumber(a, b);
//   const divideResult = yield divide(a, b);
//   const multiplyResult = yield multiply(divideResult, 7);
//   const addResult = yield add(multiplyResult, 1);

//   return addResult;
// })
//   .then((result)=> console.log(`Hasil akhrinya :  ${result}`))
//   .catch((err)=> console.log(err));




// const isNumber = (a, b)=> new Promise((resolve, reject)=> {
//     setTimeout(()=> {
//       if (isNaN(a) || isNaN(b)) {
//         err = 'One of input is not a number';
//         reject(err);
//       } else {
//         resolve(true);
//       }
//     }, 500)
//   });
  
//   const divide = (a, b)=> new Promise((resolve, reject)=> {
//     setTimeout(()=> {
//       if (b === 0) {
//         err = 'Divide by zero';
//         return reject(err);
//       }
  
//       const result = Number(a) / Number(b);
//       resolve(result);
//     }, 1500)
//   });
  
//   const multiply = (a, b)=> new Promise((resolve, reject)=> {
//     setTimeout(()=> {
//       const result = Number(a) * Number(b);
//       resolve(result);
//     }, 1000)
//   });
  
//   const add = (a, b)=> new Promise((resolve, reject)=> {
//     setTimeout(()=> {
//       const result = Number(a) + Number(b);
//       resolve(result);
//     }, 500);
//   });
  
//   const run = async function(a, b) {
//     await isNumber(a, b);
//     const divideResult = await divide(a, b);
//     const multiplyResult = await multiply(divideResult, 7);
//     const addResult = await add(multiplyResult, 1);
  
//     return addResult;
//   };
  
//   run(6, 3)
//     .then((result)=> console.log(`The final result is ${result}`))
//     .catch((err)=> console.log(err));



// const run = async function(a, b) {
//     try {
//       await isNumber(a, b);
//       const divideResult = await divide(a, b);
//       const multiplyResult = await multiply(divideResult, 7);
//       const addResult = await add(multiplyResult, 1);
  
//       console.log(`The final result is ${addResult}`);
//     } catch (e) {
//       console.log(err);
//     }
  
//   };
//   run(8, 3);