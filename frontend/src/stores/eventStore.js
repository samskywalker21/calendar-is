import { create } from 'zustand';

const useEventStore = create((set) => ({
	calendarEvents: [],
	listEvents: [],
	filterApEv: true,
	filterApMn: false,
	filterPeEv: false,
	filterPeMn: false,
	updateCalendarEvents: (calendarEvents) =>
		set(() => ({ calendarEvents: calendarEvents })),
	updateListEvents: (listEvents) => set(() => ({ listEvents: listEvents })),
	updateFilter: (filterApEv, filterApMn, filterPeEv, filterPeMn) =>
		set(() => ({
			filterApEv: filterApEv,
			filterApMn: filterApMn,
			filterPeEv: filterPeEv,
			filterPeMn: filterPeMn,
		})),
}));

export default useEventStore;
