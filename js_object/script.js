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

    function getMaxCitiesCountCountriesArray() {
        return countries.filter((e) => e.cities.length === countries.map((e) => e.cities.length).sort(
            (e1, e2) => e2 - e1)[0]);
    }

    function getCountryTotalPopulationObject() {
        const CountryTotalPopulation = {};

        countries.forEach((e) => CountryTotalPopulation[e.name] = e.cities.map((city) => city.population).reduce(
            (e1, e2) => e1 + e2), 0);

        return CountryTotalPopulation;
    }

    const MaxCitiesCountCountriesArray = getMaxCitiesCountCountriesArray();
    console.log(MaxCitiesCountCountriesArray);

    const CountryTotalPopulationObject = getCountryTotalPopulationObject();
    console.log(CountryTotalPopulationObject);

})();