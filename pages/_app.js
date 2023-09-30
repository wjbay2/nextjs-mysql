import Head from 'next/head';
import 'styles/globals.css';
import { Nav, Alert } from 'components';

export default App;

function App({ Component, pageProps }) {

    return (
        <>
            <Head>
                <title>Next.js 13 - User Registration and Login Example</title>
                <script src="//static.filestackapi.com/filestack-js/3.x.x/filestack.min.js"/>
            </Head>

            <div className={`app-container bg-light`}>
                <Nav />
                <Alert />

                <Component {...pageProps} />

            </div>
        </>
    );
}
