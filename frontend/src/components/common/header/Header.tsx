import Image from "next/image";

import "./Header.scss";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Button} from "@/components/ui/button";

interface NavLinkItem {
    label: string;
    url: string;
}

const Header = () => {
    const navMenuLinks: NavLinkItem[] = [
        {
            label: "main feature",
            url: "/",
        },
        {
            label: "popular course",
            url: "/#popular-course",
        },
        {
            label: "explore",
            url: "/#explore",
        },
        {
            label: "blog",
            url: "/#blog",
        },
        {
            label: "contact",
            url: "/#contact",
        },
    ]
    const currentActiveNavLinkIndex = 0;
    return (
        <header className={"header"}>
            <div className={"container mx-auto"}>
                <div className="header-content">
                    <nav className="nav-logo">
                        <button
                            className="mobile-menu btn-icon waves-effect hamburger hamburger--spin show-md-down"

                            id="mobile_menu"
                            type="button">
                                <span className="hamburger-box">
                                    <span className="bar hamburger-inner">

                                    </span>
                                </span>
                        </button>
                        <div className="logo scrollnav current">
                            <a href="/">
                                <Image src="/images/logo/header-logo.png" alt="logo" width={80} height={80}/>
                            </a>
                        </div>
                    </nav>
                    <nav className="nav-menu">
                        <div className="scrollactive-nav show-lg-up scrollnav">
                            <ul>
                                {
                                    navMenuLinks.map((link, index) => (
                                        <li key={index} className={
                                            cn({
                                                "active": currentActiveNavLinkIndex === index,
                                            })}>
                                            <Link
                                                className="btn btn-flat anchor-link waves-effect"
                                                href={link.url}>
                                                <span
                                                    className="text">
                                                    {link.label}
                                                </span>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </nav>
                    <nav className="nav-menu nav-auth">
                        <div className="hidden-xs-down">
                            <div className="deco"></div>
                            <Button variant={"link"} asChild>
                                <Link className="btn-flat text-btn waves-effect" href="/login">
                                    login
                                </Link>
                            </Button>
                            <Button variant={"white"} asChild>
                                <Link className="btn white light button waves-effect" href="/register">
                                    register
                                </Link>
                            </Button>
                        </div>
                        {/*<div className="menu-setting">*/}
                        {/*    <div className="setting">*/}
                        {/*        <button className="btn btn-icon waves-effect btn-small m-2 dropdown-trigger"*/}
                        {/*                data-target="dropdown_config" type="button" data-align="left"><i*/}
                        {/*            className="icon material-icons" id="setting_icon">settings</i></button>*/}
                        {/*        <div className="dropdown-content" id="dropdown_config">*/}
                        {/*            <ul className="collection with-header">*/}
                        {/*                <li className="collection-header">theme mode</li>*/}
                        {/*                <li className="collection-item no-hover pl-4">*/}
                        {/*                    <div className="flex-menu">*/}
                        {/*                        <div className="switch">*/}
                        {/*                            <label>*/}
                        {/*                                light*/}
                        {/*                                <input id="theme_switcher" type="checkbox"/>*/}
                        {/*                                <span className="lever">*/}
                        {/*                                </span>*/}
                        {/*                                dark*/}
                        {/*                            </label>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*            <div className="dropdown-divider"></div>*/}
                        {/*            <ul className="collection with-header lang-menu" id="lang_menu">*/}
                        {/*                <li className="collection-header">language</li>*/}
                        {/*                <li className="collection-item lang-list waves-effect avatar"><a*/}
                        {/*                    data-lang="ar" href="#">*/}
                        {/*                    <div className="flag circle"><i className="ar"></i></div>*/}
                        {/*                    <span className="content lang-opt text-truncate">󠁥󠁮󠁧󠁿العربيّة</span></a>*/}
                        {/*                </li>*/}
                        {/*                <li className="collection-item lang-list waves-effect avatar"><a*/}
                        {/*                    data-lang="de" href="#">*/}
                        {/*                    <div className="flag circle"><i className="de"></i></div>*/}
                        {/*                    <span className="content lang-opt text-truncate">Deutsch</span></a></li>*/}
                        {/*                <li className="collection-item lang-list waves-effect avatar"><a*/}
                        {/*                    data-lang="en" href="#">*/}
                        {/*                    <div className="flag circle"><i className="en"></i></div>*/}
                        {/*                    <span className="content lang-opt text-truncate">English</span>*/}
                        {/*                    <div className="secondary-content"><i*/}
                        {/*                        className="material-icons">check</i>*/}
                        {/*                    </div>*/}
                        {/*                </a></li>*/}
                        {/*                <li className="collection-item lang-list waves-effect avatar"><a*/}
                        {/*                    data-lang="id" href="#">*/}
                        {/*                    <div className="flag circle"><i className="id"></i></div>*/}
                        {/*                    <span*/}
                        {/*                        className="content lang-opt text-truncate">󠁥󠁮󠁧󠁿Bahasa Indonesia</span></a>*/}
                        {/*                </li>*/}
                        {/*                <li className="collection-item lang-list waves-effect avatar"><a*/}
                        {/*                    data-lang="pt" href="#">*/}
                        {/*                    <div className="flag circle"><i className="pt"></i></div>*/}
                        {/*                    <span*/}
                        {/*                        className="content lang-opt text-truncate">󠁥󠁮󠁧󠁿Português</span></a>*/}
                        {/*                </li>*/}
                        {/*                <li className="collection-item lang-list waves-effect avatar"><a*/}
                        {/*                    data-lang="zh" href="#">*/}
                        {/*                    <div className="flag circle"><i className="zh"></i></div>*/}
                        {/*                    <span className="content lang-opt text-truncate">简体中文</span></a>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </nav>
                </div>
            </div>
        </header>
    )
}
export default Header;
