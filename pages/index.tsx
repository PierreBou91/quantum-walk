import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Countdown from '../components/Countdown';
import StepList from '../components/StepList';
import styles from '../styles/Home.module.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const BASE_URL = () => {
  if (process.env.NODE_ENV === 'production') {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      return url + "/api/";
    }
    return process.env.NEXT_PUBLIC_PROD_API_BASE_URL
  } else {
    return process.env.NEXT_PUBLIC_DEV_API_BASE_URL;
  }
}

const Home: NextPage = () => {



  const [distance, setDistance] = useState(0);
  const [pastSteps, setPastSteps] = useState([]);
  const [futureSteps, setFutureSteps] = useState([]);
  const [pastListLength, setpastListLength] = useState(10);
  const [futureListLength, setfutureListLength] = useState(9);

  const DISTANCE_URL = BASE_URL() + "distance";
  const PAST_STEPS_URL = BASE_URL() + "past-steps";
  const FUTURE_STEPS_URL = BASE_URL() + "future-steps?size=" + futureListLength;

  const queryClient = useQueryClient()
  const query = useQuery('distance', async () => {
    const response = await fetch(DISTANCE_URL);
    if (!response.ok) {
      throw new Error('Error while fetching distance ' + response.status);
    }
    const data = await response.json();
    return data;
  })


  //fetch the distance from the API
  const fetchInitialDistanceToNextStep = async () => {
    await fetch(DISTANCE_URL)
      .then(res => res.json())
      .then(data => {
        setDistance(data.distance);
      }).catch(err => {
        console.log(err)
      }
      );
  }

  //fetch the past steps from the API
  const fetchInitialPastSteps = async () => {
    await fetch(PAST_STEPS_URL)
      .then(res => res.json())
      .then(data => {
        setPastSteps(data.dates);
      }).catch(err => {
        console.log(err)
      }
      );
  }

  //fetch the future steps from the API
  const fetchFutureSteps = async () => {
    await fetch(FUTURE_STEPS_URL)
      .then(res => res.json())
      .then(data => {
        setFutureSteps(data.dates);
      }).catch(err => {
        console.log(err)
      }
      );
  }

  // runs the fetch function when the component is mounted
  useEffect(() => {
    fetchInitialDistanceToNextStep();
    fetchInitialPastSteps();
    fetchFutureSteps();
  }, [futureListLength]);

  // updates the state every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(distance => distance - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // sets the past steps list length
  function pastListLengthUpdate() {
    setpastListLength(pastListLength => pastListLength + 10);
  }

  // sets the future steps list length
  function futureListLengthUpdate() {
    setfutureListLength(futureListLength => futureListLength + 10);
  }

  //filter the past steps to only show the last n steps
  const pastStepsFiltered = pastSteps.filter((step, index) => {
    return index < pastListLength;
  });

  return (
    <>
      <div className={`${styles.mainCountdown} container`}>
        Next Quantum step in
        <Countdown distance={distance} />
      </div>
      <div className={`container ${styles.lists}`}>
        <div>
          <StepList label="Previous steps">{pastStepsFiltered}</StepList>
          <button className={styles.button} onClick={pastListLengthUpdate} > More </button>
        </div>
        <div>
          <StepList label="Future steps">{futureSteps}</StepList>
          <button className={styles.button} onClick={futureListLengthUpdate} > More </button>
        </div>
      </div>
    </>
  )
}

export default Home
