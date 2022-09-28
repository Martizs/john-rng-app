import axios from 'axios';
import { Auth } from 'components/Auth';
import { TabNavigation } from 'components/admin/TabNavigation';
import { AuthContext } from 'hooks/authContext';
import { showError, showSuccess } from 'lib/ui/utils';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo } from 'react';
import styles from './Admin.module.css';
import { AllItems } from 'components/admin/AllItems';
import { RollTables } from 'components/admin/RollTables';

const TAB_TYPES = {
    allItems: {
        key: 'allItems',
        title: 'All items',
    },
    rollTables: {
        key: 'rollTables',
        title: 'Roll tables',
    },
    roll: {
        key: 'roll',
        title: 'Roll',
    },
};

export default function Admin() {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    const logOut = () => {
        axios
            .post('/api/auth/logout')
            .then(() => {
                authContext.setUser(null);
                showSuccess('Logged out');
                router.push('/');
            })
            .catch(showError);
    };

    useEffect(() => {
        if (!router.query.tab) {
            router.replace(`admin/?tab=${TAB_TYPES.allItems.key}`);
        }
    }, []);

    const TabPage = useMemo(() => {
        switch (router.query.tab) {
            case TAB_TYPES.allItems.key:
                return <AllItems />;
            case TAB_TYPES.rollTables.key:
                return <RollTables />;
            case TAB_TYPES.roll.key:
                return <div>Roll div</div>;
            default:
                return <div>bruh</div>;
        }
    }, [router.query.tab]);

    return (
        <Auth >
            <div className={styles.container}>
                <div className={styles.logoutContainer}>
                    <span className={styles.logoutBtn} onClick={logOut}>Log out</span>
                </div>

                <div className={styles.navContainer}>
                    <TabNavigation
                        selectedTab={router.query.tab}
                        tabs={Object.values(TAB_TYPES)}
                    />
                </div>

                {TabPage}
            </div>
        </Auth>
    );
}
