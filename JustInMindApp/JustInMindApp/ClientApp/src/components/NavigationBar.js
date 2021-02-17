import React from 'react';
import Icon from "awesome-react-icons";
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';


export function NavigationBar() {
    return (
        <>
            <Navigation
                // you can use your own router's api to get pathname
                activeItemId="/management/members"
                onSelect={({ itemId }) => {
                    // maybe push to the route
                }}
                items={[
                    {
                        title: 'Dashboard',
                        itemId: '/addTask',
                        
                        // you can use your own custom Icon component as well
                        // icon is optional
                        elemBefore: () => <Icon name="inbox" />,
                    },
                    {
                        title: 'Management',
                        itemId: '/management',
                        elemBefore: () => <Icon name="users" />,
                        subNav: [
                            {
                                title: 'Projects',
                                itemId: '/updateTask',
                                
                            },
                            {
                                title: 'Members',
                                itemId: '/addTask',
                            },
                        ],
                    },
                    {
                        title: 'Another Item',
                        itemId: '/another',
                        subNav: [
                            {
                                title: 'Teams',
                                itemId: '/management/teams',
                            },
                        ],
                    },
                ]}
            />
        </>
    );
}