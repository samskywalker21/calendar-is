import { useEffect, useState } from 'react';

import LogInContext from './context/LogInContext';
import EventContext, { eventObj } from './context/EventContext';
import Header from './components/layout/Header';
import Wrapper from './components/layout/Wrapper';
import { Alert, Snackbar } from '@mui/material';

import useNotifStore from './stores/notifStore';
import useEventStore from './stores/eventStore';

import { Outlet } from 'react-router-dom';

function App() {
	const [isLoggedin, setLogIn] = useState(false);
	const setEvents = useEventStore((state) => state.updateCalendarEvents);
	const setListEvents = useEventStore((state) => state.updateListEvents);

	const isOpen = useNotifStore((state) => state.isOpen);

	const message = useNotifStore((state) => state.message);
	const severity = useNotifStore((state) => state.severity);

	const closeNotif = useNotifStore((state) => state.closeNotif);

	const flipLogin = () => {
		setLogIn((prev) => {
			return !prev;
		});
	};

	useEffect(() => {
		const checkLogIn = sessionStorage.getItem('isLoggedIn');
		if (checkLogIn) {
			setLogIn(true);
		}
		eventObj.getActiveEvents(setEvents);
		eventObj.getEventsLimit(setListEvents);
	}, []);

	const loginObj = {
		flipLogin,
		isLoggedin,
	};

	return (
		<>
			<LogInContext.Provider value={loginObj}>
				<EventContext.Provider
					value={{
						...eventObj,
					}}
				>
					<Header />
					<Wrapper>
						<Outlet />
						<Snackbar
							open={isOpen}
							autoHideDuration={5000}
							onClose={closeNotif}
						>
							<Alert
								onClose={closeNotif}
								severity={severity}
								variant='filled'
								sx={{ width: '100%' }}
							>
								{message}
							</Alert>
						</Snackbar>
					</Wrapper>
				</EventContext.Provider>
			</LogInContext.Provider>
		</>
	);
}

export default App;
