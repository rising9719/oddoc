import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

interface Props {
    children: React.ReactNode;
    title: string
}

export default function BasicCard(props: Props) {
    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography variant="h5" component="div" textAlign="left"> {/* Set textAlign to 'left' */}
                    {props.title}
                </Typography>
                <Typography variant="body2" textAlign="left"> {/* Set textAlign to 'left' */}
                    {props.children}
                </Typography>
            </CardContent>
        </Card>
    );
}
