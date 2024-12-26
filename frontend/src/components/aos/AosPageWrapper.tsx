'use client'
import {FC, PropsWithChildren, useEffect} from 'react';

import AOS from "aos";
import "aos/dist/aos.css";

const AosPageWrapper: FC<PropsWithChildren> = ({children}) => {
    useEffect(() => {
        AOS.init()
    }, [])

    return <>{children}</>
}
export default AosPageWrapper;
