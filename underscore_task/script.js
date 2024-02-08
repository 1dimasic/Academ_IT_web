(function () {
    const people = [
        {name: "Bob", age: 25},
        {name: "John", age: 20},
        {name: "Mike", age: 35},
        {name: "Kate", age: 30},
        {name: "Pit", age: 50},
        {name: "Scott", age: 60},
        {name: "Ashley", age: 40},
        {name: "Sue", age: 55},
        {name: "Tony", age: 19},
        {name: "John", age: 21}
    ];

    const averageAge = _.meanBy(people, "age");
    console.log("People average age = ", averageAge);

    const peopleListFromTwentyToThirtyAged = _.chain(people)
        .filter(p => p.age >= 20 && p.age <= 30)
        .sortBy("age")
        .value();

    console.log("People list from 20 to 30 aged: ", peopleListFromTwentyToThirtyAged);

    const uniquePeopleNamesListFromTwentyToThirtyAged = _.chain(people)
        .filter(p => p.age >= 20 && p.age <= 30)
        .map(p => p.name)
        .uniq()
        .sort()
        .reverse()
        .value();

    console.log("Unique people names list from 20 to 30 aged: ", uniquePeopleNamesListFromTwentyToThirtyAged);

    const namePeopleCountObject = _.countBy(people, "name");
    console.log("\"Name\": people count object - ", namePeopleCountObject);
})();

