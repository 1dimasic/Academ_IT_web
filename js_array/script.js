(function () {
    function sort_array() {
        array.sort((e1, e2) => e2 - e1);
    }

    function get_first_five_array() {
        return array.slice(0, 5);
    }

    function get_last_five_array() {
        return array.slice(-5);
    }

    function get_array_even_numbers_sum() {
        return array.filter((e) => e % 2 === 0).reduce(
            (even_number_1, even_number_2) => even_number_1 + even_number_2, 0);
    }

    function get_squares_even_numbers_array() {
        const from_one_to_hundred_array = [];

        for (let i = 1; i <= 100; ++i) {
            from_one_to_hundred_array.push(i);
        }

        return from_one_to_hundred_array.filter((e) => e % 2 === 0).map((e) => e * e);
    }

    const array = [2, 4, 5, 7, 1, 46, -25, 0, 4];

    sort_array();
    console.log(array);

    const first_five_array = get_first_five_array();
    console.log(first_five_array);

    const last_five_array = get_last_five_array();
    console.log(last_five_array);

    const array_even_numbers_sum = get_array_even_numbers_sum();
    console.log(array_even_numbers_sum);

    const squares_even_numbers_array = get_squares_even_numbers_array();
    console.log(squares_even_numbers_array);
})();