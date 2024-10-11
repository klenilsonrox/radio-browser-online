
'use client'
import Container from '@/app/components/Container';
import React, { useEffect, useState } from 'react';

const page = ({params}) => {
    const [radio,setRadio]=useState(null)

    const getRadio = async()=>{
        const response = await fetch(`http://de1.api.radio-browser.info/json/stations/byuuid/${params.id}`)
        const data = await response.json()
            console.log(data)
        setRadio(data)
    }

    useEffect(()=>{
        getRadio(params)
    },[])
    

  return (
   <Container>radios</Container>
  );
};

export default page;