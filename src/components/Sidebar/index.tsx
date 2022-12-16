import React, { useState } from 'react'
import {
  styled,
  Box,
  useMediaQuery,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
  SvgIcon,
  Link,
  Typography
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Bottombar from './Bottombar';

const Sidebar = ({ children, menuItems, rootHref }: any) => {
  const isMobile = useMediaQuery('(max-width:767px)');
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box display='flex' flexDirection={isMobile ? 'column' : 'row'}>
      {!isMobile ?
        <SidebarContainer>
          <StyledList>
            {
              menuItems.map((item: any) =>
                <ListItem disablePadding key=''>
                  {
                    item.item ?
                      <List sx={{ width: '100%', padding: 0 }}>
                        <Item onClick={handleClick}>
                          <StyledListItemIcon>
                            <SvgIcon component={item.icon} />
                          </StyledListItemIcon>
                          <ListItemText primary={item.label} />
                          {open ? <ExpandLess /> : <ExpandMore />}
                        </Item>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding
                           sx={{
                            borderTop: open ? theme => `1px solid ${theme.palette.gray[700]}` : 'none'
                           }}
                          >
                            {
                              item.item.map((i: any) =>
                                <Item 
                                  key={i.label}
                                  sx={{ pl: 6.5 }}
                                  className={router.asPath == `${i.href}` ? 'active' : ''}
                                  onClick={(e) => {
                                    router.push(`${i.href}`)
                                    e.preventDefault();
                                  }}>
                                  {/* <StyledListItemIcon>
                                    <SvgIcon component={i.icon} />
                                  </StyledListItemIcon> */}
                                  <Typography>
                                    {i.label}
                                  </Typography>
                                </Item>
                              )
                            }
                          </List>
                        </Collapse>
                      </List>
                      :
                      <Item
                        className={router.asPath == `${item.href}` ? 'active' : ''}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`${item.href}`)
                        }}
                      >
                        <StyledListItemIcon>
                          <SvgIcon component={item.icon} />
                        </StyledListItemIcon>
                        <ListItemText primary={item.label} />
                      </Item>
                  }
                </ListItem>
              )
            }
          </StyledList>
        </SidebarContainer>
        :
        <Bottombar data={menuItems} rootHref={rootHref} />
      }
      <Inner>
        {children}
      </Inner>
    </Box>
  )
}

const SidebarContainer = styled(Box)`
  min-height: 100vh;
  width: 350px;
  color: ${props => props.theme.palette.background.default};
  background-color: ${props => (props.theme.palette as any).extra.card.background};
  border-right: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
  position: relative;
  left: 0;
  top: 0;
`
const Inner = styled(Box)`
  width: 100%;
`
const Item = styled(ListItemButton)`
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: .1s ease-in;
  gap: 15px;
  :hover {
    background: rgba(7, 224, 224, 0.15);
    color: ${prop => prop.theme.palette.primary.main};
  }
  span {
    color: inherit
  }
`
const LinkCustom = styled(Link)`
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: .1s ease-in;
  gap: 15px;
  display: flex;
  text-decoration: auto;
  align-items: center;
  color: ${props => props.theme.palette.gray[600]};

  :hover {
    background: rgba(7, 224, 224, 0.15);
    color: ${prop => prop.theme.palette.primary.main};
  }
  span {
    color: inherit
  }
`
const StyledListItemIcon = styled(ListItemIcon)`
  min-width: fit-content;
  color: inherit;
  svg {
    width: 20px;
    height: 20px;
    color: inherit;
  }
`
const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px;
  .active {
    background: rgba(7, 224, 224, 0.15);
    color: ${prop => prop.theme.palette.primary.main};
  }
`

export default Sidebar