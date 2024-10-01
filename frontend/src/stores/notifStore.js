import { create } from 'zustand';

const useNotifStore = create((set) => ({
	isOpen: false,
	message: '',
	severity: '',
	openNotif: (message, severity) => {
		set(() => ({
			isOpen: true,
			message: message,
			severity: severity,
		}));
	},
	closeNotif: () => {
		set(() => ({ isOpen: false, message: '' }));
	},
}));

export default useNotifStore;
