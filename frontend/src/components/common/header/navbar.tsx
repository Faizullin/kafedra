"use client";

import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import {Collapse, IconButton, Navbar as MTNavbar,} from "@material-tailwind/react";
import React, {HTMLProps, useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";

import "./navbar.scss";

interface NavMenuItem {
    name: string;
    icon?: any;
    href?: string;
}

const NAV_MENU: NavMenuItem[] = [
    {
        name: "Main Feature",
        // icon: RectangleStackIcon,
    },
    {
        name: "Popular Course",
        // icon: UserCircleIcon,
    },
    {
        name: "Explore",
        // icon: CommandLineIcon,
        // href: "https://www.material-tailwind.com/docs/react/installation",
    },
    {
        name: "Blog",
    },
    {
        name: "Contact",
    }
];

interface NavItemProps extends HTMLProps<HTMLLIElement> {
    children: React.ReactNode;
    href?: string;
}

function NavItem({children, href, className, ...props}: NavItemProps) {
    return (
        <li className={`nav-item ${className ? className : ""}`} {...props}>
            <Link
                href={href || "#"}
                target={href ? "_blank" : "_self"}
                className="flex items-center gap-2 font-medium text-text-primary"
            >
                {children}
            </Link>
        </li>
    );
}

export function Navbar() {
    const [open, setOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const handleOpen = useCallback(()=> {
        setOpen((cur) => !cur);
    }, []);
    const handleSticky = (e: Event) => {
        const scrollTop = window.scrollY;
        const initialHeight = headerRef.current!.offsetHeight;
        if(scrollTop > initialHeight) {
            headerRef.current!.classList.add("is-sticky");
        } else {
            headerRef.current!.classList.remove("is-sticky");
        }
    };
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpen(false)
        );
    }, []);
    useEffect(() => {
        window.addEventListener('scroll', handleSticky);
        return () => {
            window.removeEventListener('scroll', handleSticky);
        };
    });

    return (
        <div ref={headerRef} className="navbar absolute left-0 w-full z-50 ">
            <div className="mx-auto container">
                <MTNavbar
                    // blurred
                    className={"px-1 lg:px-8"}
                >
                    <div className="flex items-center justify-start">
                        <a className="navbar-brand" href="/">
                            <Image src="/image/logo/logo.png" alt="Logo" width={80} height={80}/>
                        </a>
                        <ul className="ml-10 hidden items-center gap-8 xl:flex">
                            {NAV_MENU.map(({name, icon: Icon, href}, index) => (
                                <NavItem key={name} href={href} className={index === 0 ? "current" : ""}>
                                    {Icon && <Icon className="h-5 w-5"/>}
                                    {name}
                                </NavItem>
                            ))}
                        </ul>
                        <div className="nav-auth">
                            <div className={"deco-bg"}></div>
                            <Button variant="text" className={"login-btn"}>Login</Button>
                            <a
                                href="https://www.material-tailwind.com/blocks"
                                target="_blank"
                            >
                                <Button variant={"filled"} color={"primary"} className={"register-btn"}>Register</Button>
                            </a>
                        </div>
                        <IconButton
                            variant="text"
                            color="gray"
                            onClick={handleOpen}
                            className="ml-auto inline-block lg:hidden"
                        >
                            {open ? (
                                <XMarkIcon strokeWidth={2} className="h-6 w-6"/>
                            ) : (
                                <Bars3Icon strokeWidth={2} className="h-6 w-6"/>
                            )}
                        </IconButton>
                    </div>
                    <Collapse open={open}>
                        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
                            <ul className="flex flex-col gap-4">
                                {NAV_MENU.map(({name, icon: Icon, href}) => (
                                    <NavItem key={name} href={href}>
                                        {Icon && <Icon className="h-5 w-5"/>}
                                        {name}
                                    </NavItem>
                                ))}
                            </ul>
                            <div className="mt-6 mb-4 flex items-center gap-4">
                                <Button variant="text">Log in</Button>
                                <a
                                    href="https://www.material-tailwind.com/blocks"
                                    target="_blank"
                                >
                                    <Button variant={"filled"} color="primary">Register</Button>
                                </a>
                            </div>
                        </div>
                    </Collapse>
                </MTNavbar>
            </div>
        </div>
    );
}

export default Navbar;
