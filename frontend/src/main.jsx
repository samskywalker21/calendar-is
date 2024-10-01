import React from 'react';
import ReactDOM from 'react-dom/client';

//Import CSS for Links
import './main.css';

//Import Main Component
import App from './App.jsx';

//Pages for BrowserRouter
import CalendarPage from './components/pages/CalendarPage.jsx';
import EventListPage from './components/pages/EventListPage.jsx';
import EditEventPage from './components/pages/EditEventPage.jsx';

//Font imports for Material UI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <CalendarPage /> },
			{ path: 'events', element: <EventListPage /> },
			{ path: 'edit/:id', element: <EditEventPage /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
