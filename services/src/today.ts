// Export a function named 'getDate' from the module
export class Today {
    getDate = () => {
        return new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });
    };
}
// const getDate = function getDate() {
//     // Get the current date and time in the timezone "London, UK"
//     const londonTime = new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });
//     return londonTime; // Return the formatted date and time
// };


