import React from 'react'
import {
    Box,
    styled,
    Typography,
    TextField,
    InputAdornment,
    Button
} from '@mui/material'
import { Container } from '@mui/system'


const Contact = () => {
    return (
        <Wrapper>
            <Container maxWidth='xl'>
                <ContactBox gap='24px' sx={{
                    flexDirection: { xs: 'column', md: 'row' }
                }}>
                    <Flex flexDirection='column' gap='8px' sx={{
                        maxWidth: {xs: '100%', md: '447px'}
                    }}>
                        <Typography variant='body2Poppins' sx={{ color: 'yellow.300', fontWeight: '400' }}>
                            Never want to miss a sales?
                        </Typography>
                        <Typography variant='h5Samsung' sx={{ color: 'text.primary', fontWeight: '700' }}>
                            Sign up for our newsletter and get the lastest news and updates
                        </Typography>
                    </Flex>
                    <Box sx={{
                        width: { xs: "100%", md: "auto" },
                    }}>
                        <StyledInput
                            placeholder="Email Address"
                            variant="outlined"
                            sx={{
                                width: { xs: "100%", md: "514px" },

                                'input': {
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    lineHeight: '180%',
                                    color: 'text.primary',

                                    '&:placeholder': {
                                        color: 'gray.100',
                                    }
                                }
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end" sx={{ padding: '17px 20px', height: 'auto', maxHeight: 'fit-content' }}>
                                        <SubcribeButton variant='contained'>
                                            Subcribe
                                        </SubcribeButton>
                                    </InputAdornment>,
                            }}
                        />
                    </Box>
                </ContactBox>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled(Box)`
    background: #001015;
    padding: 90px 0;
`
const ContactBox = styled(Box)`
    background: #066C6C;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 3rem;
    justify-content: space-between;

    ${props => props.theme.breakpoints.down("sm")} {
        padding: 1.5rem;
    }
`
const Flex = styled(Box)`
    display: flex;
`
const StyledInput = styled(TextField)`
    * {
        transition: .12s ease-in;
    }
    .MuiOutlinedInput-root {
        background-color: #000;
        padding-right: 0;
        fieldset {
            display: none;
        }
        input {
            padding: 17px 20px;
        }
    }
`
const SubcribeButton = styled(Button)`
    font-weight: 600;
    transition: .12s ease-in;
    font-size: 16px;
    :hover {
        background-color: ${props => props.theme.palette.primary.main};
        opacity: .8;
    }
`

export default Contact