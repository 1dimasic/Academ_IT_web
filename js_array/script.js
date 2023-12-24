const testArray = [2, 4, 5, 7, 1, 46, -25, 0, 4];

sortDescendingArray(testArray);
console.log("Descending sort array", testArray)

const itemsCount = 5;
const firstFiveItemsArray = getFirstFiveItemsArray(testArray, itemsCount);
console.log("First five items array: ", firstFiveItemsArray);

const lastFiveItemsArray = getLastFiveItemsArray(testArray, itemsCount);
console.log("Last five items array: ", lastFiveItemsArray);

const arrayEvenNumbersSum = getArrayEvenNumbersSum(testArray);
console.log("Array even numbers sum = ", arrayEvenNumbersSum);

const arrayEvenNumbersSquares = getArrayEvenNumbersSquares();
console.log("Even numbers array squares: ", arrayEvenNumbersSquares);

function sortDescendingArray(array) {
    array.sort((e1, e2) => e2 - e1);
}

function getFirstFiveItemsArray(array, itemsCount) {
    return array.slice(0, itemsCount);
}

function getLastFiveItemsArray(array, itemsCount) {
    return array.slice(-itemsCount);
}

function getArrayEvenNumbersSum(array) {
    return array
        .filter(number => number % 2 === 0)
        .reduce((sum, evenNumber) => sum + evenNumber, 0);
}

function getNumberArray(maxNumbersCount) {
    const numberArray = [];

    for (let i = 1; i <= maxNumbersCount; ++i) {
        numberArray.push(i);
    }

    return numberArray;
}

function getArrayEvenNumbersSquares() {
    const maxNumbersCount = 100;
    return getNumberArray(maxNumbersCount)
        .filter(number => number % 2 === 0)
        .map(evenNumber => evenNumber * evenNumber);
}