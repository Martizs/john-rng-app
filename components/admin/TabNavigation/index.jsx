import Link from 'next/link';
import styles from './TabNavigation.module.css';

const Tab = ({ href, isSelected, lastItem, firstItem, title }) => (
    <Link href={href}>
        <a
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
        </a>
    </Link>
);

export const TabNavigation = ({ selectedTab, tabs }) => {
    return (
        <div className={styles.container}>
            <nav>
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
            </nav>
        </div>
    );
};
