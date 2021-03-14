import React from 'react';

import Navbar from './Navbar';

export class Home extends React.Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <Navbar />
                <h1>Start work with 'Just in Mind'</h1>    
                <p>Use Menu in right corner to start work!</p>
            </div>
        );
    }
}
