import Layout from 'components/Layout';
import { AuthContext } from 'hooks/authContext';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

const { Provider } = AuthContext;

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState(null);

    return (
        <Layout>
            <Provider
                value={{
                    user,
                    setUser,
                }}
            >
                <Component {...pageProps} />
            </Provider>
            <ToastContainer hideProgressBar position="top-center" />
        </Layout>
    );
}

export default MyApp;
