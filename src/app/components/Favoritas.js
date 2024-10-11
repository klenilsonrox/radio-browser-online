'use client';
import React, { useState } from 'react';
import { useRadio } from '../contexts/RadioContext';
import { FaPlay, FaPause } from "react-icons/fa";
import FavoritasRender from './FavoritasRender';

const Favoritas = () => {
    const { favoritas} = useRadio();





    return (
        <div>
            <h1 className="text-2xl text-white text-center mb-2">Radio Browser</h1>
            <section>
                <img src="public/images/screenshoot.png" alt="" />
                <div className="flex items-center justify-between">
                    <p className="uppercase text-white">Favorites Radios</p>
                    <form action="">
                        <input type="text" className="bg-transparent outline-none text-white text-right" placeholder="Search stations"/>
                    </form>
                </div>
                {favoritas.length > 0 ? (
                    <FavoritasRender favoritas={favoritas}/>
                ) : (
                    <p className="text-white text-center">Sem favoritos</p>
                )}
            </section>
        </div>
    );
};

export default Favoritas;
