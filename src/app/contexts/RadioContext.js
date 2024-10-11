'use client';
import React from 'react';

export const RadioContext = React.createContext({});

const RadioProvider = ({ children }) => {
    const [radios, setRadios] = React.useState([]);
    const [offSet, setOffSet] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const [favoritas, setFavoritas] = React.useState([]);
    const [filter, setFilter] = React.useState(''); // Filtro por categoria
    const [country, setCountry] = React.useState(''); // Filtro por país
    const [countries, setCountries] = React.useState([]); // Lista de países
    const [playingUrl, setPlayingUrl] = React.useState(null); // URL da rádio que está tocando
    const [audio, setAudio] = React.useState(null); // Objeto de áudio

    React.useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favoritas')) || [];
        setFavoritas(savedFavorites);
    }, []);

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
    }, []);

    const addFavorita = (radio) => {
        const isFavorited = favoritas.some(fav => fav.stationuuid === radio.stationuuid);
        let updatedFavorites;

        if (isFavorited) {
            if (playingUrl === radio.url_resolved && audio) {
                audio.pause(); // Pausar o áudio se estiver tocando
                setPlayingUrl(null);
            }
            updatedFavorites = favoritas.filter(fav => fav.stationuuid !== radio.stationuuid);
        } else {
            updatedFavorites = [...favoritas, radio];
        }

        setFavoritas(updatedFavorites);
        localStorage.setItem('favoritas', JSON.stringify(updatedFavorites));
    };

    const handlePlay = (url) => {
        if (audio) {
            audio.pause();
        }

        if (url === playingUrl) {
            setPlayingUrl(null);
            return;
        }

        const newAudio = new Audio(url);
        newAudio.play();
        setAudio(newAudio);
        setPlayingUrl(url);

        newAudio.onended = () => {
            setPlayingUrl(null);
        };
    };

    const getRadios = async () => {
        try {
            let url = `https://de1.api.radio-browser.info/json/stations/search?limit=10&offset=${offSet}`;
            if (filter) {
                url += `&tag=${filter}`;
            }
            if (country) {
                url += `&country=${encodeURIComponent(country)}`;
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
    }, [offSet, filter, country]);

    const nextPage = () => {
        setOffSet(offSet + 1);
    };

    const previousPage = () => {
        if (offSet > 1) {
            setOffSet(offSet - 1);
        }
    };

    return (
        <RadioContext.Provider
            value={{
                radios,
                nextPage,
                previousPage,
                offSet,
                loading,
                favoritas,
                addFavorita,
                filter,
                setFilter,
                country,
                setCountry,
                countries,
                handlePlay,
                playingUrl,
            }}
        >
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
