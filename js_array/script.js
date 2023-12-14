(function () {
    function sortArray() {
        array.sort((e1, e2) => e2 - e1);
    }

    function getFirstFiveArray() {
        return array.slice(0, 5);
    }

    function getLastFiveArray() {
        return array.slice(-5);
    }

    function getArrayEvenNumbersSum() {
        return array.filter((e) => e % 2 === 0).reduce(
            (even_number_1, even_number_2) => even_number_1 + even_number_2, 0);
    }

    function getSquaresEvenNumbersArray() {
        const fromOneToHundredArray = [];

        for (let i = 1; i <= 100; ++i) {
            fromOneToHundredArray.push(i);
        }

        return fromOneToHundredArray.filter((e) => e % 2 === 0).map((e) => e * e);
    }

    const array = [2, 4, 5, 7, 1, 46, -25, 0, 4];

    sortArray();
    console.log(array);

    const firstFiveArray = getFirstFiveArray();
    console.log(firstFiveArray);

    const lastFiveArray = getLastFiveArray();
    console.log(lastFiveArray);

    const arrayEvenNumbersSum = getArrayEvenNumbersSum();
    console.log(arrayEvenNumbersSum);

    const squaresEvenNumbersArray = getSquaresEvenNumbersArray();
    console.log(squaresEvenNumbersArray);
})();