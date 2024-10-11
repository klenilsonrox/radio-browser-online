'use client';
import React from "react";

export const RadioContext = React.createContext({});

const RadioProvider = ({children}) => {
    const [radios, setRadios] = React.useState([]);
    const [offSet, setOffSet] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const [favoritas, setFavoritas] = React.useState([]);
    const [filter, setFilter] = React.useState(""); // Filtro por categoria
    const [country, setCountry] = React.useState(""); // Filtro por país
    const [countries, setCountries] = React.useState([]); // Lista de países

    React.useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favoritas')) || [];
        setFavoritas(savedFavorites);
    }, []); // Executa apenas uma vez ao montar o componente

    // Requisição para buscar a lista de países
    const getCountries = async () => {
        try {
            const response = await fetch('https://de1.api.radio-browser.info/json/countries');
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.log('Erro ao buscar países:', error);
        }
    };

    React.useEffect(() => {
        getCountries();
    }, []); // Carrega a lista de países apenas uma vez

    function addFavorita(radio) {
        const isFavorited = favoritas.some(fav => fav.stationuuid === radio.stationuuid);
        let updatedFavorites;

        if (isFavorited) {
            updatedFavorites = favoritas.filter(fav => fav.stationuuid !== radio.stationuuid);
        } else {
            updatedFavorites = [...favoritas, radio];
        }

        setFavoritas(updatedFavorites);
        localStorage.setItem('favoritas', JSON.stringify(updatedFavorites));
    }

    const getRadios = async () => {
        try {
            let url = `https://de1.api.radio-browser.info/json/stations/search?limit=10&offset=${offSet}`;
            if (filter) {
                url += `&tag=${filter}`; // Adiciona o filtro por categoria à URL
            }
            if (country) {
                url += `&country=${encodeURIComponent(country)}`; // Adiciona o filtro por país à URL
            }
            const response = await fetch(url);
            const data = await response.json();
            setRadios(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getRadios();
    }, [offSet, filter, country]); // Atualiza quando o offset, o filtro ou o país mudam

    function nextPage() {
        setOffSet(offSet + 1);
    }

    function previousPage() {
        if (offSet > 1) {
            setOffSet(offSet - 1);
        }
    }

    return (
        <RadioContext.Provider value={{radios, nextPage, previousPage, offSet, loading, favoritas, addFavorita, filter, setFilter, country, setCountry, countries}}>
            {children}
        </RadioContext.Provider>
    );
};

export default RadioProvider;

const useRadio = () => {
    const context = React.useContext(RadioContext);
    if (context === undefined) {
        throw new Error('useRadio must be used within a RadioProvider');
    }
    return context;
};

export { useRadio };
