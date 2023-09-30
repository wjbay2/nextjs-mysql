import Head from 'next/head';
import 'styles/globals.css';
import { Nav, Alert } from 'components';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>NextJs MYSQL - Assurity Test</title>
            </Head>
            <div className="bg-light">
                <Nav />
                <Alert />
                <Component {...pageProps} />
            </div>
        </>
    );
}
