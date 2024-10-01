import { create } from 'zustand';

const useEventStore = create((set) => ({
	calendarEvents: [],
	listEvents: [],
	updateCalendarEvents: (calendarEvents) =>
		set(() => ({ calendarEvents: calendarEvents })),
	updateListEvents: (listEvents) => set(() => ({ listEvents: listEvents })),
}));

export default useEventStore;
