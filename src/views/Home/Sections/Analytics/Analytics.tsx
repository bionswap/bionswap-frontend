import React , {useState , useEffect} from 'react'
import {
    Stack,
    Typography,
    styled,
    Box,
    Container
} from '@mui/material'
import useMediaQuery from 'hooks/useMediaQuery'
import { getLaunchpadStats } from 'api/launchpad';
import CountUp from 'react-countup';


const Analytics = () => {
  const {isTablet} = useMediaQuery();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSwapTransactions: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getLaunchpadStats();

      setStats(res);
    };

    fetchStats();
  }, []);

  return (
    <Container>
        <Wrapper
            sx={{
                gridTemplateColumns: isTablet ? 'auto auto' : 'auto auto auto auto'
            }}
        >
            <StyledBox spacing={2}>
                <NumberText>
                    {stats.totalSwapTransactions}
                </NumberText>
                <Typography>
                    Total Transactions
                </Typography>
            </StyledBox>
            <StyledBox spacing={2}>
                <NumberText>
                    {stats.totalUsers}
                </NumberText>
                <Typography>
                    Total Users
                </Typography>
            </StyledBox>
            <StyledBox spacing={2}>
                <NumberText>
                    {stats.totalProjects}
                </NumberText>
                <Typography>
                    Launchpads
                </Typography>
            </StyledBox>
            <StyledBox spacing={2}>
                <NumberText>
                    600+
                </NumberText>
                <Typography>
                    Contributors
                </Typography>
            </StyledBox>
        </Wrapper>
    </Container>
  )
}

const Wrapper = styled(Box)`
    display: grid;
    gap: 15px;
    width: 100%;
`
const NumberText = styled(Typography)`
    background: ${props => (props.theme.palette as any).extra.text.linear};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 62px;
    font-weight: 700;
`
const StyledBox = styled(Stack)`
    text-align: center;
`

export default Analytics