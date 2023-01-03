import React , {useState , useEffect} from 'react'

const useOnScroll = () => {
    const [scrollDir, setScrollDir] = useState(0);

    useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
        const scrollY = window.pageYOffset;

        if (Math.abs(scrollY - lastScrollY) < threshold) {
            ticking = false;
            return;
        }
        setScrollDir(scrollY);
        lastScrollY = scrollY > 0 ? scrollY : 0;
        ticking = false;
        };

        const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollDir);
            ticking = true;
        }
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollDir]);
    
    return scrollDir;
}

export default useOnScroll