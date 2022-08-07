import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'



const Home: NextPage = () => {

  const API_URL = "http://192.168.1.15:8080/distance_next";

  const [distance, setDistance] = useState(0);

  //fetches the distance from the API
  const initialDistanceToNextStep = async () => {
    await fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setDistance(data)
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
