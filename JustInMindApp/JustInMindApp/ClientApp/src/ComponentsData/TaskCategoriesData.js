import React from 'react';
import BugReportIcon from '@material-ui/icons/BugReport';
import ErrorIcon from '@material-ui/icons/Error';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import HelpIcon from '@material-ui/icons/Help';

export const TaskCategoriesData = [
    {
        name: 'Bug',
        image: <BugReportIcon/>,
        id: '0',
    },
    {
        name: 'Improvement',
        image: <TrendingUpIcon />,
        id: '1',
    },
    {
        name: 'Feature',
        image: <CallSplitIcon />,
        id: '2',
    },
    {
        name: 'Error',
        image: <ErrorIcon />,
        id: '3',
    },
    {
        name: 'Other',
        image: <HelpIcon />,
        id: '4',
    },
];