(function () {
    const testArray = [2, 4, 5, 7, 1, 46, -25, 0, 4];

    sortDescending(testArray);
    console.log("Descending sort array", testArray);

    const itemsCount = 5;
    const firstItemsArray = getFirstItemsArray(testArray, itemsCount);
    console.log("First items array: ", firstItemsArray);

    const lastItemsArray = getLastItemsArray(testArray, itemsCount);
    console.log("Last items array: ", lastItemsArray);

    const evenNumbersSum = getEvenNumbersSum(testArray);
    console.log("Array even numbers sum = ", evenNumbersSum);

    const numbersCount = 100;
    const numbersArray = getNumbersArray(numbersCount);
    const evenNumbersSquares = getEvenNumbersSquares(numbersArray);
    console.log("Even numbers array squares: ", evenNumbersSquares);

    function sortDescending(numbersArray) {
        numbersArray.sort((e1, e2) => e2 - e1);
    }

    function getFirstItemsArray(array, itemsCount) {
        return array.slice(0, itemsCount);
    }

    function getLastItemsArray(array, itemsCount) {
        return array.slice(-itemsCount);
    }

    function getEvenNumbersSum(numbersArray) {
        return numbersArray
            .filter(number => number % 2 === 0)
            .reduce((sum, evenNumber) => sum + evenNumber, 0);
    }

    function getNumbersArray(numbersCount) {
        const numbersArray = [];

        for (let i = 1; i <= numbersCount; ++i) {
            numbersArray.push(i);
        }

        return numbersArray;
    }

    function getEvenNumbersSquares(numbersArray) {
        return numbersArray
            .filter(number => number % 2 === 0)
            .map(evenNumber => evenNumber * evenNumber);
    }
})();