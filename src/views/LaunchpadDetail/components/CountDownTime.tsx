import React, { useEffect, useState } from 'react'
import { Box, Typography, styled } from '@mui/material'

const CountDownTime = ({ endTime, startTime }: any) => {
    const currentTime = +new Date();

    const calculateTimeLeft = () => {
        let difference;
        if (currentTime > startTime) {
            difference = +new Date(Number(endTime)) - +new Date();
        } else {
            difference = +new Date(Number(startTime)) - +new Date();
        }

        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / 1000 / 60 / 60 / 24),
                hours: Math.floor((difference / 1000 / 60 / 60) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }

        return timeLeft
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)
    })

    return (
        <FlexBox flexDirection='column' textAlign='center' gap='10px'>
            <Typography color='text.secondary'>
                {currentTime > startTime ? 'Sales end in:' : 'Sales start in:'}
            </Typography>
            <WrapCountDownTime>
                <BoxItem>
                    <TimeBox>
                        <Typography variant='h3' color='text.primary' fontWeight='700'>
                            {timeLeft?.days || 0}
                        </Typography>
                    </TimeBox>
                    <Typography variant='body4Poppins' color='text.secondary' fontWeight='400'>
                        Days
                    </Typography>
                </BoxItem>
                <BoxItem>
                    <TimeBox>
                        <Typography variant='h3' color='text.primary' fontWeight='700'>
                            {timeLeft?.hours || 0}
                        </Typography>
                    </TimeBox>
                    <Typography variant='body4Poppins' color='text.secondary' fontWeight='400'>
                        Hours
                    </Typography>
                </BoxItem>
                <BoxItem>
                    <TimeBox>
                        <Typography variant='h3' color='text.primary' fontWeight='700'>
                            {timeLeft?.minutes || 0}
                        </Typography>
                    </TimeBox>
                    <Typography variant='body4Poppins' color='text.secondary' fontWeight='400'>
                        Minutes
                    </Typography>
                </BoxItem>
                <BoxItem>
                    <TimeBox>
                        <Typography variant='h3' color='text.primary' fontWeight='700'>
                            {timeLeft?.seconds || 0}
                        </Typography>
                    </TimeBox>
                    <Typography variant='body4Poppins' color='text.secondary' fontWeight='400'>
                        Seconds
                    </Typography>
                </BoxItem>
            </WrapCountDownTime>
        </FlexBox>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const WrapCountDownTime = styled(Box)`
    display: flex;
    width: 100%;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
`
const BoxItem = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 4px; 
    align-items: center;
    width: 100%;
    max-width: 92px;
`
const TimeBox = styled(Box)`
    background: ${props => (props.theme.palette as any).extra.swapPanel.hover};
    border-radius: 6px;
    width: 100%;
    display: flex;
    height: 56px;
    align-items: center;
    justify-content: center;
    max-width: 91px;
`

export default CountDownTime
