import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import {Badge} from "@mui/base";

export default function GroupAvatars() {
    return (
        <AvatarGroup max={4}>
            <Badge color="secondary" badgeContent={<div>x</div>}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
            </Badge>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg"/>
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg"/>
        </AvatarGroup>
    );
}