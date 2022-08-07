import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Countdown from '../components/Countdown';
import StepList from '../components/StepList';
import styles from '../styles/Home.module.css';

const BASE_URL = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_PROD_API_BASE_URL;
  } else {
    return process.env.NEXT_PUBLIC_DEV_API_BASE_URL;
  }
}

const Home: NextPage = () => {

  const DISTANCE_URL = BASE_URL() + "distance";
  const PAST_STEP_URL = BASE_URL() + "past-steps";

  const [distance, setDistance] = useState(0);
  const [pastSteps, setPastSteps] = useState([]);

  //fetches the distance from the API
  const initialDistanceToNextStep = async () => {
    await fetch(DISTANCE_URL)
      .then(res => res.json())
      .then(data => {
        setDistance(data.distance);
      }).catch(err => {
        console.log(err)
      }
      );
  }

  //fetches the past steps from the API
  const initialPastSteps = async () => {
    await fetch(PAST_STEP_URL)
      .then(res => res.json())
      .then(data => {
        setPastSteps(data.dates);
      }).catch(err => {
        console.log(err)
      }
      );
  }

  // runs the fetch function when the component is mounted
  useEffect(() => {
    initialDistanceToNextStep();
    initialPastSteps();
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
      <Card>
        <div className={styles.mainCountdown}>
          <Countdown distance={distance} />
        </div>
      </Card>
      <StepList>{pastSteps}</StepList>

      {/* TODO List of future steps */}
    </>
  )
}

export default Home
