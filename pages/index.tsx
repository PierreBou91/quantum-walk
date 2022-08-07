import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

const BASE_URL = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_PROD_API_BASE_URL;
  } else {
    return process.env.NEXT_PUBLIC_DEV_API_BASE_URL;
  }
}

const Home: NextPage = () => {

  const API_URL = BASE_URL() + "distance";

  const [distance, setDistance] = useState(0);

  //fetches the distance from the API
  const initialDistanceToNextStep = async () => {

    await fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setDistance(data.distance);
      }).catch(err => {
        console.log(err)
      }
      );
  }

  // runs the fetch function when the component is mounted
  useEffect(() => {
    initialDistanceToNextStep();
  }, []);

  // updates the state every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(distance => distance - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* TODO Main timer */}
      {/* TODO List of past/future steps */}
      {Math.floor(distance / 86400000) +
        " days : " +
        Math.floor((distance % 86400000) / 36e5) +
        " hours : " +
        Math.floor((distance % 36e5) / 6e4) +
        " minutes : " +
        Math.trunc((distance % 6e4) / 1000) +
        " seconds"}
      <div>
        {distance}
      </div>
    </>
  )
}

export default Home
