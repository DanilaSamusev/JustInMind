﻿import React from 'react';
import '../styles/addTask.css'

export class AddTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            urgencyId: 1,
            categoryId: 1,
            attachement: '',
            userId: 1,
            stateId: 1,
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.submitTask = this.submitTask.bind(this);
    }

    onChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })        
    }

    onSelectChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: parseInt(value)
        })
    }

    componentDidMount() {
        this.setState({
            stateId: parseInt(this.props.match.params.stateId)
        })
    }

    submitTask() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }

        fetch('https://localhost:44330/Task', requestOptions)
            .then(response => response.status)
            .then((r) => console.log(r))       
    }

    render() {
        return (
            <form class="decor" onSubmit={this.submitTask}>
                <div class="form-left-decoration"></div>
                <div class="form-right-decoration"></div>
                <div class="circle"></div>
                <div class="form-inner">
                    <h3>Add task</h3>
                    <input type="text" placeholder="Name" name="name" onChange={this.onChange} />
                    <textarea placeholder="Description" name="description" onChange={this.onChange} />
                    <div class="dropdown">
                        <select class="dropdown-select" name="urgencyId" onChange={this.onSelectChange} value={this.state.urgencyId}>
                            <option value="1">Low</option>
                            <option value="2">MediumLow</option>
                            <option value="3">Medium</option>
                            <option value="4">High</option>
                            <option value="5">Critical</option>
                        </select>
                    </div>
                    <div class="dropdown">
                        <select class="dropdown-select" name="categoryId" onChange={this.onSelectChange} value={this.state.categoryId}>
                            <option value="1">Bug</option>
                            <option value="2">Improvement</option>
                            <option value="3">Feature</option>
                            <option value="4">Error</option>
                            <option value="5">Other</option>
                        </select>
                    </div>
                    <textarea placeholder="Attachement" onChange={this.onChange} />
                    <input type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}