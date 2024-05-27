import { useState, useEffect } from 'react';
import './CountriesSearch.css';

const CountriesSearch = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = () => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setCountries(data);
                setFilteredCountries(data);
            })
            .catch((error) => {
                console.error("Error fetching countries data:", error);
            });
    };

    const handleSearch = (e) => {
        const searchCountry = e.target.value.toLowerCase();
        setSearch(searchCountry);
        const result = filteredCountries.filter((country) => country.name.common.toLowerCase().includes(searchCountry));
        setCountries(result);
    };

    return (
        <div>
            <div className='header'>
                <input type='text' onChange={handleSearch} value={search} placeholder='Search for countries...' />
            </div>
            <div className='Container'>
                {countries.map((items) =>
                    <div className='Card' key={items.cca3} >
                        <img className='CardItem' src={items.flags.png} alt={items.flags.alt} />
                        <h3>{items.name.common}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CountriesSearch;