import React, { Children } from 'react';
import Container from '@mui/material/Container';

function Wrapper(props) {
	return (
		<>
			<Container maxWidth sx={{ mt: 5, mb: 10 }}>
				{props.children}
			</Container>
		</>
	);
}

export default Wrapper;
