import { useRouter } from 'next/router';
import styles from './TabNavigation.module.css';

const Tab = ({ href, isSelected, lastItem, firstItem, title }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(href)}
            className={styles.tabItem}
            style={{
                backgroundColor: isSelected
                    ? 'rgba(76, 70, 70, 0.4)'
                    : 'transparent',
                borderTopLeftRadius: firstItem ? '10px' : 0,
                borderTopRightRadius: lastItem ? '10px' : 0,
                borderRight: lastItem ? 0 : '1px solid',
            }}
        >
            {title}
        </div>
    );
};

export const TabNavigation = ({ selectedTab, tabs }) => {
    return (
        <div className={styles.container}>
            {tabs.map((tabItem, index) => (
                <Tab
                    key={tabItem.key}
                    href={`admin/?tab=${tabItem.key}`}
                    title={tabItem.title}
                    isSelected={selectedTab === tabItem.key}
                    firstItem={index === 0}
                    lastItem={index === tabs.length - 1}
                />
            ))}
        </div>
    );
};
