import React from 'react'
import {
    Box,
    styled,
    Stack,
    useMediaQuery,
    Container
} from '@mui/material'
import Sidebar from './Sidebar';

const Layout = ({children}:any) => {
  const isMobile = useMediaQuery('(max-width:700px)');
  return (
    <Stack 
      sx={{
        height: '100%',
        minHeight: 'inherit',
        width: '100%'
      }}
      direction='row'
      alignItems='start'
    >
        <ContentBox>
          <StyledContainer>
            {children}
          </StyledContainer>
        </ContentBox>
        <Sidebar />
    </Stack>
  )
}
const ContentBox = styled(Box)`
    width: 100%;
`
const StyledContainer = styled(Container)`
  margin-top: 35px;
`

export default Layout