import React from 'react';
import { useContext } from 'react';
import EventContext from '../context/EventContext';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function CalendarMonthComponent() {
    const eventObj = useContext(EventContext);

    const { events } = eventObj;

    const eventClickTest = (info) => {
        console.log(info.event);
    };

    return (
        <>
            <FullCalendar
                timeZone='UTC'
                nextDayThreshold={'00:00:00'}
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                displayEventEnd={false}
                displayEventTime={false}
                events={events}
                eventClick={eventClickTest}
                headerToolbar={{
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'dayGridDay,dayGridWeek,dayGridMonth',
                }}
            />
        </>
    );
}

export default CalendarMonthComponent;
