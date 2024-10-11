'use client';
import React from 'react';
import { useRadio } from '../contexts/RadioContext';
import { FaPlay, FaPause, FaTrash } from 'react-icons/fa';

const FavoritasRender = () => {
    const { favoritas, addFavorita, handlePlay, playingUrl } = useRadio();

    return (
        <div className="bg-[#4D4D56] rounded-md p-2 mt-2">
            <ul className="flex flex-col gap-3">
                {favoritas.map((radio, index) => (
                    <li
                        className="bg-[#62626C] h-[72px] rounded-md flex items-center justify-between text-black font-medium text-xl px-4"
                        key={index}
                    >
                        <div className="flex items-center gap-2">
                            <button
                                className="text-black bg-[#2F2F33] p-2 rounded-full flex items-center justify-center"
                                onClick={() => handlePlay(radio.url_resolved)}
                            >
                                {playingUrl === radio.url_resolved ? <FaPause /> : <FaPlay />}
                            </button>
                            <div>
                                <p className="leading-4 text-sm lg:text-xl">{radio.name}</p>
                                <p className="text-sm">
                                    {radio.country} - {radio.countrycode}
                                </p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => addFavorita(radio)}>
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritasRender;
