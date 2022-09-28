import Head from 'next/head';
import styles from './layout.module.css';

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Johns Treasure Trove</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="icon" href="/leprechauns_treasure.ico" />
            </Head>
            <div className={styles.bgImg}/>
                {children}
        </div>
    );
}
