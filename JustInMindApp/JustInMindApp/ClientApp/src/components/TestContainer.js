import React from 'react';

import { TaskView } from './TaskView';
import { BsPencil } from "react-icons/bs";
import { LoadingPage } from './LoadingPage';
import { BsTrashFill } from "react-icons/bs";
import { TestDialog } from './TestDialog';

import '../styles/board.css'

export class TestContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: 1,
        };      
    }

    f = () => {
        this.setState({
            num: this.state.num + 1
        })
    }

    render() {

        return (
            <div>
                {this.state.num}
                <TestDialog num={this.state.num} f={ this.f}/>
            </div>
            
        )
    }
}
