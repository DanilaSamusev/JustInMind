import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { deepOrange, deepPurple, red } from '@material-ui/core/colors';

import '../styles/taskView.css';

const useStyles = makeStyles((theme) => ({
	

	'.MuiOutlinedInput-multiline': {
		width: '300px',
	},

	commentField: {
		display: 'block',
		marginLeft: '20px',
		marginTop: '7px',

		'& .MuiOutlinedInput-multiline': {
			width: '300px',
			height: '20px',
		},
	},

	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},

	taskView: {
		color: '#172b4d',
		position: 'relative',
		height: '420px',
		width: '400px',
		marginLeft : '35%',
	},

	taskCommentsContainer: {
		overflow: 'auto',
		backgroundColor: '#dfe1e6',
		height: '100px',
		width: '300px',
		marginLeft: '20px',
		marginTop: '10px',
		borderRadius: '3px',
		border: '4px double black;',
	},

	descriptionField: {
		marginLeft: '20px',
		marginTop: '20px',
	},
}));

export function TaskView() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper elevation={3} className={classes.taskView}>

				<div className='closeButton'>
					<IconButton >
						<CloseIcon />
					</IconButton>
				</div>

				<div>
					<textarea className='taskName'>Task name</textarea>
				</div>

				<div className='stateLabel'>
					in {'New'} state
					</div>

				<div className='ownerContainer'>
					<div className='ownerLabel'>Owner:</div>
					<Avatar className={classes.orange}>OP</Avatar>
				</div>


				<TextField
					className={classes.descriptionField}
					id="outlined-multiline-flexible"
					label="Description"
					multiline
					rowsMax={4}
					value={'Explain this ticket more infromative'}
					variant="outlined"
				/>

				<TextField
					className={classes.commentField}
					id="outlined-textarea"
					label="Add your comment"
					placeholder="Placeholder"
					multiline
					variant="outlined"
				/>

				<div className={classes.taskCommentsContainer}>
					<div>Test comment!!!</div>
					<div>Test comment!!!</div>
					<div>Test comment!!!</div>
					<div>Test comment!!!</div>
					<div>Test comment!!!</div>
					<div>Test comment!!!</div>
					<div>Test comment!!!</div>
				</div>

			</Paper>
		</div>
	);
}