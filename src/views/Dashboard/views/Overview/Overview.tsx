import Page from 'components/Page'
import React from 'react'
import {
  styled,
  Box,
  Typography,
} from '@mui/material'
import Header from '../../components/Header'
import FundSection from './FundSection'
import BalanceSection from './BalanceSection'
import { useAccount } from 'hooks'
import useMediaQuery from 'hooks/useMediaQuery'


const Overview = () => {
  const {isMobile , isTablet} = useMediaQuery()
  
  const { address } = useAccount();

  return (
    <Wrapper>
      <Layout sx={{
        gridTemplateColumns: isTablet ? 'auto' : 'auto auto',
        alignItems: "start"
      }}>
        <FundSection isMobile={isMobile}/>
        {
          address &&
          <BalanceSection isMobile={isMobile}/>
        }
        
      </Layout>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
`
const Layout = styled(Box)`
  display: grid;
  gap: 24px;
`


export default Overview