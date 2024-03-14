import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import EventContext from './components/context/EventContext.jsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <EventContext.Provider value='testString'>
            <App />
        </EventContext.Provider>
    </React.StrictMode>
);
