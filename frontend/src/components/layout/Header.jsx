import LoggedIn from './LoggedIn';

import { Link } from 'react-router-dom';

import { AppBar, Box, Toolbar, Typography, CssBaseline } from '@mui/material';

const Header = () => {
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<CssBaseline>
					<AppBar position='sticky'>
						<Toolbar>
							<Typography
								variant='h6'
								component={'div'}
								sx={{ flexGrow: 1 }}
							>
								<Link to={'/'}>Event Calendar</Link>
							</Typography>
							<LoggedIn />
						</Toolbar>
					</AppBar>
				</CssBaseline>
			</Box>
		</>
	);
};

export default Header;
