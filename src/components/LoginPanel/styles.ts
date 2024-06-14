import { styled } from '@mui/system';

import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20%',
        },
        backgroundColor: theme.palette.background.default,
        padding: '10px',
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        },
    },
}));

export const FormDescription = styled(Typography)({
    textAlign: 'center',
    padding: '16px',
})

export const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 120px)',
});