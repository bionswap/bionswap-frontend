import {
    styled,
    useMediaQuery as muiUseMediaQuery
} from '@mui/material'

const useMediaQuery = () => {
    const isMobile = muiUseMediaQuery('(max-width:599px)');
    const isTablet = muiUseMediaQuery('(max-width:899px)');
    const isDesktop = muiUseMediaQuery('(max-width:1199px)'); 
    return {
        isMobile,
        isTablet,
        isDesktop
    }
}

export default useMediaQuery