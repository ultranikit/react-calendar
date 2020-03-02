import React from 'react';

import {Provider} from 'react-redux'
import store from './store'

import {MyCalendar} from "./components/Calendar";
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <MyCalendar/>
            </div>
        </Provider>
    );
}

export default App;
