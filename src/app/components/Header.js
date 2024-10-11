'use client';
import React from 'react';
import { IoMenu } from "react-icons/io5";
import { useRadio } from '../contexts/RadioContext';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Skeleton from './Skeleton';
import Link from 'next/link';
import { FaHeart } from "react-icons/fa"; // Importando o ícone de coração

const Header = () => {
  const { radios, offSet, nextPage, previousPage, loading, addFavorita, favoritas, filter, setFilter, country, setCountry, countries } = useRadio();
  const [menu, setOpenMenu] = React.useState(false);

  function closeMenu(e) {
    if (e.target.id === "menu") {
      setOpenMenu(!menu);
    }
  }

  function voltar(){
    setOpenMenu(false)
  }

  return (
    <>
    <button className="absolute right-1 top-2 lg:hidden" onClick={() => setOpenMenu(!menu)}>
        <IoMenu size={40} className="text-[#1267FC]" />
      </button>
    <div className="w-full max-w-[244px] bg-[#1E1E21] relative">
      <button className="absolute right-1 top-2 hidden lg:block" onClick={() => setOpenMenu(!menu)}>
        <IoMenu size={40} className="text-[#1267FC]" />
      </button>

      <form action="" className="mt-14 flex flex-col items-center px-6">
        <input
          type="text"
          className="w-full h-[33px] rounded-[10px] pl-3 bg-[#62626C] text-white outline-none mb-4"
          placeholder="Search here"
        />

        {/* Filtro por categoria */}
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full h-[33px] rounded-[10px] pl-3 bg-[#62626C] text-white outline-none mb-4"
        >
          <option value="">Todas as Categorias</option>
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
          <option value="jazz">Jazz</option>
          <option value="news">Notícias</option>
          <option value="classical">Clássica</option>
        </select>

        {/* Filtro por país */}
        <select 
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full h-[33px] rounded-[10px] pl-3 bg-[#62626C] text-white outline-none"
        >
          <option value="">Todos os Países</option>
          {countries && countries.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </form>

      {loading && <Skeleton />}
      <ul className="mt-6 flex flex-col gap-3">
        {radios && radios.map((radio,index) => {
          const isFavorited = favoritas.some(fav => fav.stationuuid === radio.stationuuid); // Verifica se a rádio já é favorita
          
          return (
            <li className="bg-[#4D4D56] mx-2 h-[48px] rounded-[10px] flex items-center text-white px-4 cursor-pointer hover:bg-[#464650] transition-all truncate justify-between" key={index}>
              <Link href={`/radios/${radio.changeuuid}`} className="max-w-200px truncate">{radio.name}</Link>
              {isFavorited ? (
                <button 
                  className="text-red-500" 
                  onClick={(e) => { 
                    e.stopPropagation(); // Para evitar que o clique no botão dispare o evento de clique no item da lista
                    addFavorita(radio); // Desfavoritar a rádio
                  }}
                >
                  <FaHeart /> {/* Exibe o coração preenchido */}
                </button>
              ) : (
                <button 
                  className="text-white" 
                  onClick={(e) => { 
                    e.stopPropagation(); // Para evitar que o clique no botão dispare o evento de clique no item da lista
                    addFavorita(radio); // Favoritar a rádio
                  }}
                >
                  <FaHeart className="opacity-50" /> {/* Exibe o coração vazio ou com opacidade */}
                </button>
              )}
            </li>
          );
        })}
        <div className="flex items-center justify-between px-2">
          <button className={`flex items-center gap-2 hover:underline ${offSet === 1 ? 'text-gray-500' : 'text-blue-600'}`} onClick={previousPage}>
            <MdKeyboardArrowLeft /> anterior
          </button>
          <span className="text-white text-xl">{offSet}</span>
          <button className="flex items-center gap-2 hover:underline text-blue-600" onClick={nextPage}>
            Proxima <MdKeyboardArrowRight />
          </button>
        </div>
      </ul>

    
    </div>
    {menu && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm" id="menu" onClick={closeMenu}>
          <header className="w-full max-w-[244px] bg-[#1E1E21] h-full z-40">
            <button className="absolute right-1 top-2" onClick={voltar}>
              <IoMdClose size={40} className="text-[#1267FC]" />
            </button>
            <ul className="mt-14 flex flex-col gap-2">
              <li className="ml-6 text-white text-lg" onClick={voltar}>
                <Link href="/">Inicio</Link>
              </li>
              <li className="ml-6 text-white text-lg" onClick={voltar}>
              <Link href="/radios-favoritas">Favoritas</Link>
              </li>
        
            </ul>
          </header>
        </div>
      )}
    </>
  );
}

export default Header;
