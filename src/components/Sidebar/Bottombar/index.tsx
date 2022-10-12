import React from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  SvgIcon
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
                <ListItemText primary={item.label} />
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
  background-color: #081319;
`
const StyledList = styled(List)`
  display: flex;
  gap: 20px;
  padding: 10px 16px;
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
  gap: 15px;
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


export default Bottombar