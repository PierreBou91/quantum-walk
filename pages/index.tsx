import type { NextPage } from 'next'
import { useRef, useState } from 'react';
import Countdown from '../components/Countdown';
import StepList from '../components/StepList';
import styles from '../styles/Home.module.css';
import {
  useQuery,
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

  const [pastListLength, setpastListLength] = useState(10);
  const futureListLength = useRef(9);

  const DISTANCE_URL = BASE_URL() + "distance";
  const PAST_STEPS_URL = BASE_URL() + "past-steps";
  const FUTURE_STEPS_URL = BASE_URL() + "future-steps?size=";

  // const queryClient = useQueryClient()
  const distance = useQuery('distance', async () => {
    const response = await fetch(DISTANCE_URL);
    if (!response.ok) {
      throw new Error('Error while fetching distance ' + response.status);
    }
    const data = await response.json();
    return data;
  }, {
    onError(error: any) {
      console.log("there was an error" + error);
    }
  });

  const pasts = useQuery('past-steps', async () => {
    const response = await fetch(PAST_STEPS_URL);
    if (!response.ok) {
      throw new Error('Error while fetching past steps ' + response.status);
    }
    const data = await response.json();
    return data;
  }, {
    onError(error: any) {
      console.log("there was an error" + error);
    }
  });

  const future = useQuery('future-steps', async () => {
    const response = await fetch(FUTURE_STEPS_URL + futureListLength.current);
    if (!response.ok) {
      throw new Error('Error while fetching future steps ' + response.status);
    }
    const data = await response.json();
    return data;
  }, {
    onError(error: any) {
      console.log("there was an error" + error);
    }
  });

  // sets the past steps list length
  function pastListLengthUpdate() {
    setpastListLength(pastListLength => pastListLength + 10);
  }

  // sets the future steps list length
  function futureListLengthUpdate() {
    futureListLength.current += 10;
    console.log(futureListLength.current);
    future.refetch(); // TODO Make the refetch work on first button click
  };

  //filter the past steps to only show the last n steps
  const pastStepsFiltered = pasts.data?.dates.filter((_: any, index: number) => {
    return index < pastListLength;
  });

  return (
    <>
      <div className={`${styles.mainCountdown} container`}>
        Next Quantum step in
        {distance.isLoading ? <div>Loading...</div> : <Countdown distance={distance.data.distance} />}
      </div>
      <div className={`container ${styles.lists}`}>
        <div>
          <StepList label="Previous steps">{pastStepsFiltered}</StepList>
          <button className={styles.button} onClick={pastListLengthUpdate} > More </button>
        </div>
        <div>
          <StepList label="Future steps">{future.data?.dates}</StepList>
          <button className={styles.button} onClick={futureListLengthUpdate} > More </button>
        </div>
      </div>
    </>
  )
}

export default Home
