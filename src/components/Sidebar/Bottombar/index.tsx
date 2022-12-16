import React from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  SvgIcon,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'

const Bottombar = ({data, rootHref}:any) => {
  const router = useRouter()
  return (
    <Wrapper>
      <StyledList>
        {
          data.map((item:any) =>
            <ListItem disablePadding key='' sx={{width: 'fit-content'}}>
              <Item
                className={router.asPath == `/${rootHref}${item.href}` ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/${item.href}`)
                }}
              >
                <StyledListItemIcon>
                  <SvgIcon component={item.icon} />
                </StyledListItemIcon>
                <Typography sx={{
                  fontSize: '12px'
                }}>
                  {item.label}
                </Typography>
              </Item>
            </ListItem>
          )
        }
      </StyledList>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
  min-height: 50px;
  color: ${props => props.theme.palette.gray[600]};
  background-color: ${props => (props.theme.palette as any).extra.card.background};
  border-top: 1px solid ${props => props.theme.palette.gray[700]};
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
`
const StyledList = styled(List)`
  display: flex;
  gap: 20px;
  padding: 0 16px;
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
  .active {
    background: rgba(7, 224, 224, 0.15);
    color: ${prop => prop.theme.palette.primary.main};
  }
`
const Item = styled(ListItemButton)`
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: .1s ease-in;
  display: flex;
  flex-direction: column;
  gap: 5px;
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
    width: 25px;
    height: 25px;
    color: inherit;
  }
`


export default Bottombar