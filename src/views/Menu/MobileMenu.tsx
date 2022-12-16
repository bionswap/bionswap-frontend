import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Divider,
    Link,
    Stack,
    styled,
    Typography
} from '@mui/material'
import { menuConfig, MENU_HEIGHT } from 'configs/menu/config';
import { useRouter } from 'next/router';
import { BiChevronDown } from "react-icons/bi";


type Anchor = 'top' | 'left' | 'bottom' | 'right'
interface Props {
    toggleDrawer?: any
    anchor?: Anchor
}

const MobileMenu = ({toggleDrawer , anchor}:Props) => {
    const router = useRouter()

    return (
        <Box sx={{ 
            width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw',
            minHeight:'100vh', 
            backgroundColor: theme => theme.palette.background.default,
            borderBottom: '1px solid #424242', 
            paddingTop: `${MENU_HEIGHT}px`
        }}
        >
            <Container>
                <Stack width="100%" spacing={1} divider={<Divider flexItem/>}>
                {menuConfig.map((item,index) => (
                    item.items.length !== 0 ?
                    <MenuItemMobile
                        key={item.label + index}
                        sx={{
                            width: '100%', background: 'transparent', boxShadow: 'none',
                            '&:before': {
                            display: 'none',
                            },
                        }}
                        
                        >
                        <AccordionSummary
                            sx={{ justifyContent: "space-between" }}
                            expandIcon={
                            item.items.length > 0 && (
                                <>
                                <BiChevronDown />
                                </>
                            )
                            }
                        >
                            <Typography sx={{ color: "inherit",fontWeight: '500' }}>{item.label}</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{marginTop: '10px'}}
                            onClick={toggleDrawer("right", false)}
                        >
                            <Stack spacing={4} alignItems='start'>
                            {
                                item.items.length !== 0 &&
                                item.items.map((i:any) => (
                                    <Link
                                        key={i.key} 
                                        href={i.href}
                                        underline="none"
                                        sx={{width: '100%'}}
                                        onClick={(e) => {
                                        e.preventDefault();
                                        if(i.target == '_blank') window.open(i.href);
                                        else router.push(i.href);
                                        }}
                                    >
                                        <Stack spacing={1} alignItems='start'>
                                        <Typography
                                            fontWeight={600}
                                        >
                                            {i.label}
                                        </Typography>
                                        {i.description && (
                                            <Typography
                                            color="text.secondary"
                                            fontSize='14px'
                                            >
                                            {i.description}
                                            </Typography>
                                        )}
                                        </Stack>
                                    </Link>
                                ))
                            }
                            </Stack>
                        </AccordionDetails>
                    </MenuItemMobile>
                        :
                    <Box
                        onClick={toggleDrawer("right", false)}
                        width='100%'
                    >
                        <MenuItem
                            href={item.href}
                            fullWidth
                            sx={{
                                justifyContent: 'start', padding: '0px 16px', minHeight: '48px'
                            }}
                            onClick={(e:any) => {
                                e.preventDefault();
                                if(item?.target == '_blank') window.open(item.href);
                                else router.push(item.href);
                            }}
                        >
                            <Typography sx={{ color: "inherit" }}>
                                {item.label}
                            </Typography>
                        </MenuItem>
                    </Box>
                ))}
                </Stack>
            </Container>
        </Box>
    )
}

const MenuItemMobile = styled(Accordion)`
  .MuiButtonBase-root {
    border-radius: 8px;
  }
  .MuiButtonBase-root.Mui-expanded {
    color: ${(props) => props.theme.palette.primary.main};
    background: ${(props) => (props.theme.palette as any).extra.button.backgroundGreenOpacity};
  }
`;
const MenuItem = styled(Button)`
  color: ${(props) => props.theme.palette.text.primary};
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.palette.primary.main};
    background-color: transparent;
  }
`;

export default MobileMenu