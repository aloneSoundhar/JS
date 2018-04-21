import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import './App.css';
import './AgeStats';
import AgeStats from './AgeStats';

class App extends Component {
    constructor() {
        super();

        this.state = {
            newDate: '',
            birthDay: '1997-06-30',
            showStats: false
        }
    }

    changeBirthDay() {
        this.setState({ 
            birthDay: this.state.newDate,
            showStats: true
         });
    }

    render() {
        return (
            <div className="App">
                <Form inline>
                <h2>Input Your Birthday!</h2>
                    <FormControl 
                        type="date"
                        onChange= { event => this.setState({ newDate: event.target.value})}></FormControl>
                    {' '}
                    <Button onClick={ () => this.changeBirthDay()}>
                        Submit
                    </Button>
                </Form>
                {
                    this.state.showStats ? 
                        <div className="fade age-stats">
                        <AgeStats date={this.state.birthDay}/>
                        </div>
                    :
                        <div></div>
                }
            </div>
        );
    }
}

export default App;
