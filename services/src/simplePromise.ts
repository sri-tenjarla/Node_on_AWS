import prompt from "prompt-sync";

const timer = prompt()("Enter time in seconds: ");

const myPromise: Promise<string> = new Promise((resolve, reject) => {

    if (parseInt(timer) <= 3) {
        setTimeout(() => {
            resolve("Promise resolved");
        }, 3000)
    } else {
        reject((new Error("Promise rejected with number not in range")));
    }

})

console.log("Before calling promise");

myPromise.then((success) => {
    console.log(`From callback – ${success}`);
},
    (err) => {
        console.log(`Error occurred – ${err}`);
    });

console.log("After calling promise");