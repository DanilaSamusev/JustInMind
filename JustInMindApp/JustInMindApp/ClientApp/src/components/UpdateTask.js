﻿import React from 'react';
import '../styles/addTask.css'

export class UpdateTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 1,
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
        this.getTask = this.getTask.bind(this);
    }

    onChange(e) {
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

    getTask() {        
        fetch('https://localhost:44330/Task/' + this.props.match.params.id)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    id: data.id,
                    name: data.name,                   
                    description: data.description,
                    urgencyId: data.urgencyId,
                    categoryId: data.categoryId,
                    attachement: data.attachement,
                    userId: data.userId,
                    stateId: data.stateId,
                }))
    }

    componentDidMount() {
        this.getTask();
    }

    submitTask() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }

        fetch('https://localhost:44330/Task', requestOptions)
            .then(response => response.status)
            .then((r) => console.log(r))
    }

    render() {
        return (
            <form class="decor" onSubmit={this.submitTask} >
                <div class="form-left-decoration"></div>
                <div class="form-right-decoration"></div>
                <div class="circle"></div>
                <div class="form-inner">
                    <h3>Edit task</h3>
                    <input type="text" placeholder="Name" name="name" onChange={this.onChange} value={this.state.name} />
                    <textarea placeholder="Description" name="description" onChange={this.onChange} value={this.state.description} />
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
                    <textarea placeholder="Attachement" name="attachment" onChange={this.onChange} value={this.state.attachement} />
                    <input type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
