const bcrypt = require('bcryptjs');



// // let p = new Promise((resolve, reject) =>{
// //     let a = 2 + 1;
// //     if(a===2){
// //         resolve('success')
// //     }else{
// //         reject("Failed");
// //     }
// // })

// // p.then((message) =>{
// //     console.log("this is in the then " + message);
// // }).catch((message) =>{
// //     console.log("this is in the catch " + message);
// // })
// const userLeft = false;
// const userWatchingCatMeme = false;

// function WathcTutorialCallback(callback, errorCallback) {
//     if (userLeft) {
//         errorCallback({
//             name: 'User Left',
//             message: ':('
//         })
//     } else if (userWatchingCatMeme) {
//         errorCallback({
//             name: 'User Watching cat Meme',
//             message: 'WebDevSimplified < Cat'
//         })
//     } else {
//         callback("Thumbs up and Subscribe");
//     }
// }

// WathcTutorialCallback((message) => {
//     console.log('Success:' + message)
// }, (error) => {
//     console.log(error.name + " " + error.message)
// })

// function WathcTutorialPromise() {
//     return new Promise((resolve, reject) => {

//         if(userLeft) {
//             reject({
//                 name: 'User Left',
//                 message: ':('
//             })
//         }else if(userWatchingCatMeme) {
//             reject({
//                 name: 'User Watching cat Meme',
//                 message: 'WebDevSimplified < Cat'
//             })
//         } else {
//             resolve('Thumbs up and Subscribe');
//         }

//     })

// }
// WathcTutorialPromise().then((message) =>{
//     console.log('Success: ' + message);
// }).catch((error) =>{
//     console.log(error.name + " " + error.message);
// })

// const recordVideoOne = new Promise((resolve, reject) =>{
//     resolve('Video 1 recorded')
// });

// const recordVideoTwo = new Promise((resolve, reject) =>{
//     resolve('Video 2 Recorded')
// });

// const recordVideoThree = new Promise((resolve, reject)=>{
//     reject('Video 3 is not recorded')
// });

// Promise.race([recordVideoOne,
//             recordVideoTwo,
//             recordVideoThree
// ]).then((message) =>{
//     console.log(message)
// }).catch((message)=>{
//     console.log(message)
// });

// const makeRequest = (location)=>{
//     return new Promise((resolve, reject) =>{
//         console.log(`Making Request  to ${location}`);

//         if(location === 'Google'){
//             resolve('Google says hi');
//         }else{
//             reject('We can only talk to Google');
//         }

//     })
// };

// const processRequest = (response) =>{
//     return new Promise((resolve, reject) =>{
//         console.log('Processing response');
//         resolve(`Extra Information ${response}`);
//     })
// };

// makeRequest('Facebook').then((response) =>{
//     console.log('Response Recieved')
//     return processRequest(response)
// }).then((processResponse)=>{
//     console.log(processResponse)
// }).catch((err)=>{
//     console.log(err)
// })

// const doWork = async ()=>{
//     try{
//         const response = await makeRequest('Google')
//         console.log('Response Recieved');

//         const processedResponse = await processRequest(response)
//         console.log(processedResponse);
//     }
//     catch(err){
//         console.log(err)
//     }

// }
// doWork();

var name = 'Krishna';
var salt = bcrypt.genSaltSync(10);

var encrypt = bcrypt.hashSync(name, salt);
var encrypt2 = bcrypt.hashSync(name+'a', salt);
console.log(encrypt);
console.log(encrypt2);
