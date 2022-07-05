import Page from "components/Page";
import { NextPage } from "next";
import Head from "next/head";
import Homepage from "views/Home";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Connect Wallet Demo</title>
        <meta
          name="description"
          content="Demo app part of a tutorial on adding RainbowKit to a React application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Homepage/>
      </div>
    </div>
  );
};

export default Home;
