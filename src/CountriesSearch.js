import { useState, useEffect } from 'react';
import './CountriesSearch.css';

const Tiles = ({ name, flag, altFlag }) => {
    return (
        <div className='countryCard' >
            <img className='CardItem' src={flag} alt={altFlag} />
            <h3>{name}</h3>
        </div>
    )
}

const CountriesSearch = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [search, setSearch] = useState("");
    const url = 'https://restcountries.com/v3.1/all';

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => { setCountries(data); setFilteredCountries(data); })
            .catch((error) => console.log("Data not fetched"));
    }, []);

    const handleSearch = (e) => {
        const searchCountry = e.target.value;
        setSearch(searchCountry);
        const result = countries.filter((country) => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()));
        setFilteredCountries(result);
    };

    return (
        <div>
            <div className='header'>
                <input type='text' onChange={handleSearch} value={search} placeholder='Search for Countries...' />
            </div>
            <div className='Container'>
                {filteredCountries.map((items) =>
                    <Tiles key={items.cca3} name={items.name.common} flag={items.flags.png} altFlag={items.flags.alt} />
                )}
            </div>
        </div>
    );
}

export default CountriesSearch;