import React from 'react';
import {Avatar, Container, Grid} from "@mui/material";
import {FlexWrapper} from "../../../../components/decoration/FlexWrapper";
import {CurrentRoute} from "../../../../components/decoration/CurrentRoute";
import {MainTitle} from "../../../../components/decoration/MainTitle";
import {ComponentWrap} from "../../../../components/decoration/ComponentWrap";
import {ComponentTitle} from "../../../../components/decoration/ComponentTitle";
import avatar from '../../../../assets/admin/avatarphoto.webp'
import operator from '../../../../assets/admin/operators (1).webp'
import hotels from '../../../../assets/admin/hotels.webp'
import analytical from '../../../../assets/admin/analitycs.webp'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {S} from './Profile_Styles'


export const Profile = () => {

    const regals = [
        {title: 'subordinates', num: '11'},
        {title: 'rating', num: '4.8'},
        {title: 'experience', num: '5.2'}
    ]

    const tasks = [
        {title: 'Compilation of a list of operators', image: operator, path: '/operators'},
        {title: 'Formation of lists of hotels', image: hotels, path: '/hotels'},
        {title: 'Analysis of the entered data', image: analytical, path: '/dashboard'}
    ]

    const aboutAdm = [
        {title: 'Education', descr: 'RUT (MIIT)'},
        {title: 'Department', descr: 'Programming technologies'},
        {title: 'Organization', descr: 'Tourfirm'},
        {title: 'Languages', descr: 'Russian, English'},
        {title: 'Work History', descr: 'USSR, tourfirm'},
        {title: 'Birthday', descr: '20 June 1966'},
    ]

    const avatar_style = {
        width: 70,
        height: 70,
        position: 'relative',
        top: '35px',
        outline: '5px solid white'
    }
    return (
        <Container>
            <FlexWrapper direction={'column'} align={'flex-start'} gap={'20px'}>
                <FlexWrapper direction={'column'} justify={'flex-start'} gap={'2px'}>
                    <CurrentRoute>Pages / Profile</CurrentRoute>
                    <MainTitle>Profile</MainTitle>
                </FlexWrapper>
                <Grid container spacing={2} columns={6}>
                    <Grid item xs={3}>
                        <ComponentWrap height={'52vh'}>
                            <S.ProfileCover>
                                <Avatar src={avatar} sx={avatar_style}/>
                            </S.ProfileCover>
                            <FlexWrapper direction={'column'} gap={'0px'} align={'center'} style={{marginTop: '35px', width: '100%'}}>
                                <S.Name>Adela Vmiit</S.Name>
                                <S.Status>Admin</S.Status>
                                <S.RegalsList>
                                    {regals.map(el => {
                                        return (
                                            <S.RegalsItem key={el.title}>
                                                <S.NumRegals>{el.num}</S.NumRegals>
                                                <S.NameRegals>{el.title}</S.NameRegals>
                                            </S.RegalsItem>
                                        )
                                    })}
                                </S.RegalsList>
                            </FlexWrapper>
                        </ComponentWrap>
                    </Grid>
                    <Grid item xs={2.5} marginLeft={'16px'}>
                        <ComponentWrap height={'fit-content'}>
                            <ComponentTitle>Just a calendar</ComponentTitle>
                            <S.DecorBorder>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar sx={{color: '#000c60'}}/>
                                </LocalizationProvider>
                            </S.DecorBorder>

                        </ComponentWrap>
                    </Grid>
                    <Grid item xs={2.8}>
                        <ComponentWrap height={'fit-content'}>
                            <ComponentTitle>All tasks</ComponentTitle>
                            <S.ProfileText>
                                Here you can find more details about your tasks. Keep you user engaged by providing
                                meaningful information.
                            </S.ProfileText>
                            {tasks.map((el, index) => {
                                return (
                                    <ComponentWrap
                                        key={el.title}
                                        width={'470px'}
                                        height={'108px'}
                                        style={{boxShadow: '0px 18px 40px 0px rgba(112, 144, 176, 0.12)'}}>
                                        <FlexWrapper align={'center'} justify={'space-between'} style={{height: '100%', width: '100%'}}>
                                            <FlexWrapper align={'center'}>
                                                <S.ProfileImage src={el.image}/>
                                                <FlexWrapper direction={'column'}>
                                                    <S.TaskTitle>{el.title}</S.TaskTitle>
                                                    <FlexWrapper>
                                                        <S.NameRegals>Task #{index + 1}</S.NameRegals>
                                                        <S.TaskLink to={el.path}>See task details</S.TaskLink>
                                                    </FlexWrapper>
                                                </FlexWrapper>
                                            </FlexWrapper>
                                            <TaskAltIcon style={{color: '#8F9BBA'}}/>
                                        </FlexWrapper>
                                    </ComponentWrap>
                                )
                            })}
                        </ComponentWrap>
                    </Grid>
                    <Grid item xs={3.2}>
                        <ComponentWrap height={'fit-content'}>
                            <ComponentTitle>General Information</ComponentTitle>
                            <S.ProfileText>To be honest, I don't know what to fill this section with anymore, so
                                additional information about an imaginary admin is collected here. And I also need four
                                lines of this text in the entire width of the block. There was text in the layout for
                                this block, but it's not harsh enough, and it doesn't suit us. </S.ProfileText>
                            <FlexWrapper wrap={'wrap'} justify={'center'} style={{width: '100%', marginTop: '15px'}}>
                                {aboutAdm.map(el => {
                                    return (
                                        <ComponentWrap
                                            key={el.title}
                                            width={'255px'}
                                            height={'90px'}
                                            style={{boxShadow: '0px 18px 40px 0px rgba(112, 144, 176, 0.12)'}}
                                        >
                                            <S.NameRegals>{el.title}</S.NameRegals>
                                            <S.AboutText>{el.descr}</S.AboutText>
                                        </ComponentWrap>
                                    )
                                })}
                            </FlexWrapper>
                        </ComponentWrap>
                    </Grid>
                </Grid>
            </FlexWrapper>
        </Container>
    );
};
