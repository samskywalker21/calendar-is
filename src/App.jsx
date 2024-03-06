import { useState } from 'react';

import CalendarMonthComponent from './components/calendar/CalendarMonthComponent';
import Header from './components/layout/Header';

function App() {
    const [events, setEvents] = useState([]);

    return (
        <>
            <Header />
            <CalendarMonthComponent events={events} />
        </>
    );
}

export default App;
