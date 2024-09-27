import { useEffect, useState } from 'react';

import LogInContext from './context/LogInContext';
import EventContext, { eventObj } from './context/EventContext';
import Header from './components/layout/Header';
import Wrapper from './components/layout/Wrapper';

import { Outlet } from 'react-router-dom';

function App() {
    const [isLoggedin, setLogIn] = useState(false);

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
    });

    const loginObj = {
        flipLogin,
        isLoggedin,
    };

    return (
        <>
            <LogInContext.Provider value={loginObj}>
                <EventContext.Provider value={eventObj}>
                    <Header />
                    <Wrapper>
                        <Outlet />
                    </Wrapper>
                </EventContext.Provider>
            </LogInContext.Provider>
        </>
    );
}

export default App;
