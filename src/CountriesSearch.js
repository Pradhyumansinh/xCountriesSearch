import { useState, useEffect } from 'react';
import './CountriesSearch.css';

const CountriesSearch = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [search, setSearch] = useState("");
    const url = 'https://restcountries.com/v3.1/all';

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = () => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => { setCountries(data); setFilteredCountries(data); })
            .catch((error) => console.log(error));
    };

    const handleSearch = (e) => {
        const searchCountry = e.target.value;
        setSearch(searchCountry);
        const result = filteredCountries.filter((country) => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()));
        setCountries(result);
    };

    return (
        <div>
            <div className='header'>
                <input type='text' onChange={handleSearch} value={search} placeholder='Search for Countries...' />
            </div>
            <div className='Container'>
                {countries.map((items) =>
                    <div className='countryCard' key={items.cca3} >
                        <img className='CardItem' src={items.flags.png} alt={items.flags.alt} />
                        <h3>{items.name.common}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CountriesSearch;