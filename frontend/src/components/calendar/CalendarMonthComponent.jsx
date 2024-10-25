import { useContext, useState, useEffect } from 'react';
import ViewModal from '../ui/ViewModal';

import useEventStore from '../../stores/eventStore';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function CalendarMonthComponent({ changeModal, changeViewEvent }) {
	const events = useEventStore((state) => state.calendarEvents);

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
				eventClick={(info) => {
					changeViewEvent(info.event);
				}}
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
