import Head from 'next/head';

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Johns Treasure Trove</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="icon" href="/leprechauns_treasure.ico" />
            </Head>
            {children}
        </div>
    );
}
