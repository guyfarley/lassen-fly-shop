import { itemList } from '../data';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export async function getStaticProps() {
  return {
    props: {
      allItemsData: itemList,
    },
  };
}

export default function Home({ allItemsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>The hottest patterns guaranteed to put fish in your net!</p>
        <h2 className={utilStyles.headingLg}>Current Items in Stock</h2>
        <ul className={utilStyles.list}>
          {allItemsData.map(({ id, title, price }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {price}
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
