(function () {
    const countries = [
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

    function getCountriesTotalPopulationsObject(countries) {
        const countriesTotalPopulationsObject = {};

        countries.forEach(function (country) {
            countriesTotalPopulationsObject[country.name] = country.cities
                .reduce((totalPopulation, city) => totalPopulation + city.population, 0);
        });

        return countriesTotalPopulationsObject;
    }

    const maxCitiesCountCountriesArray = getMaxCitiesCountCountriesArray(countries);
    console.log("Countries array with max cities count: ", maxCitiesCountCountriesArray);

    const countriesTotalPopulationsObject = getCountriesTotalPopulationsObject(countries);
    console.log("Object 'Country': Total population: ", countriesTotalPopulationsObject);
})();