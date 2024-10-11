import React from 'react';

const page = () => {
  return (
    <div className="bg-[#2F2F33] w-full max-w-[1034px] flex flex-col gap-4 py-[40px] items-start px-2">
      <p className='text-white'>
      Descubra uma variedade de estações de rádio de todo o mundo! Nosso site permite que você explore, ouça e encontre estações de rádio ao vivo em diversos gêneros e idiomas, consumindo dados diretamente da API do Radio Browser. Com uma interface simples e intuitiva, você pode navegar facilmente por estações populares, regionais ou buscar por suas favoritas. Aproveite a experiência musical global com apenas alguns cliques!
      </p>
      <img src="https://taaqui.org/blog/wp-content/uploads/2018/12/o-que-e-radio-online.png" alt="imagem radio" className='w-full rounded-md'/>
    </div>
  );
};

export default page;