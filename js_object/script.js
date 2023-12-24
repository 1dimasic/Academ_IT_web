const objectsCountriesArray = [
    {
        name: "England",
        cities: [
            {
                name: "London",
                population: 12000
            },
            {
                name: "Manchester",
                population: 550
            },
            {
                name: "Liverpool",
                population: 450
            }
        ]
    },
    {
        name: "Russia",
        cities: [
            {
                name: "Moscow",
                population: 13000
            },
            {
                name: "Kazan",
                population: 5000
            },
            {
                name: "Sochi",
                population: 600
            },
            {
                name: "Novosibirsk",
                population: 2500
            }
        ]
    },
    {
        name: "Germany",
        cities: [
            {
                name: "Berlin",
                population: 8000
            },
            {
                name: "Munich",
                population: 4000
            },
            {
                name: "Dortmund",
                population: 1000
            }
        ]
    }
];

function getMaxCitiesCountCountriesArray(countries) {
    const maxCitiesCount = Math.max.apply(null, countries.map(country => country.cities.length));
    return countries.filter(country => country.cities.length === maxCitiesCount);
}

function getCountriesTotalPopulationObject(countries) {
    const countriesTotalPopulation = {};

    countries.forEach(country => countriesTotalPopulation[country.name] = country.cities
        .reduce((totalPopulation, cityPopulation) => totalPopulation + cityPopulation.population, 0));

    return countriesTotalPopulation;
}

const MaxCitiesCountCountriesArray = getMaxCitiesCountCountriesArray(objectsCountriesArray);
console.log("Countries array with max cities count: ", MaxCitiesCountCountriesArray);

const CountriesTotalPopulationObject = getCountriesTotalPopulationObject(objectsCountriesArray);
console.log("Object 'Country': Total population: ", CountriesTotalPopulationObject);