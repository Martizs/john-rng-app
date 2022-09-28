import { useRouter } from 'next/router';
import styles from './TabNavigation.module.css';

const Tab = ({ href, isSelected, title }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(href)}
            className={styles.tabItem}
            style={{
                backgroundColor: isSelected
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'transparent',
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
