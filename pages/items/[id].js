import * as React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../components/layout.module.css';
import Layout from '../../components/layout';
import Image from 'next/image';
import { FliesContext } from '../../context/FliesContext';
import { useContext } from 'react';
import { itemList } from '../../data';

export async function getStaticProps({ params }) {

  // const res = await fetch(`https://5juvutwp5d.execute-api.us-west-2.amazonaws.com/beta/flies`);
  // const itemList = await res.json();

  const flies = itemList.filter(fly => fly.id.toString() === params.id);

  return {
    props: {
      fly: flies[0],
    },
  }
}

export async function getStaticPaths() {

  // const res = await fetch('https://5juvutwp5d.execute-api.us-west-2.amazonaws.com/beta/flies');
  // const itemList = await res.json();

  const paths = itemList.map(fly => ({
    params: {
      id: fly.id.toString()
    },
  }))
  return { paths, fallback: false }
}

export default function ItemPage({ fly }) {

  const { flies, addToCart } = useContext(FliesContext);

  const stateFlies = flies.filter(flyFromState => flyFromState.id === fly.id);
  const stateFly = stateFlies[0];

  // Check if fly data exists in state
  // If so, reset 'fly' variable to that data
  // If not, 'fly' variable remains set to data pulled from
  // DynamoDB before page rendering
  if (stateFly) {
    fly = stateFly;
  }

  function handleAddToCart(item) {
    addToCart(item);
  }

  return (
    <Layout>
      <section className={styles.panel}>
        <Image src={fly.imageUrl} alt={fly.title} layout="responsive" width="100vw" height="70vw" priority="true" />
        <h2 className={utilStyles.headingLg}>{fly.title}</h2>
        <p>{fly.description}</p><br />
        <p><b>Price:</b> ${fly.price}/each</p>
        <p>We have <b>{fly.inventory}</b> in stock!</p>
        <br />
        <Button
          className={styles.addCartButton}
          size="small"
          variant="contained" onClick={() => handleAddToCart(fly)}>
          {fly.inCart < 1 ? (
            <>Add to Cart</>
          ) : (
            <>
              Add to Cart ({fly.inCart})
            </>)}
        </Button >
        <Link
          href="/">
          <Button className={styles.learnMoreButton} size="small"
            variant="contained">Back to Home</Button>
        </Link>
      </section>
    </Layout>);
}


