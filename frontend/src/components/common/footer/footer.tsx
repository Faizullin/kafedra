"use client";

import ContainerWithRipple from "@/components/ContainerWithRipple";
import Image from "next/image";


import Icon1 from "@/../public/image/social-icons/facebook-svgrepo-com.svg";
import Icon3 from "@/../public/image/social-icons/instagram-svgrepo-com.svg";
import Icon4 from "@/../public/image/social-icons/linkedin-svgrepo-com.svg";
import Icon2 from "@/../public/image/social-icons/telegram-alt-svgrepo-com.svg";
import LangSwitcher from "@/components/common/footer/LangSwitcher";
import Link from "next/link";
import { FC, HTMLProps } from "react";

import "./footer.scss";
const social_icons = [Icon1, Icon2, Icon3, Icon4];

const LINKS: Array<{
    title: string;
    items: Array<{
        text: string;
        href: string;
    }>;
}> = [
        {
            title: "Company",
            items: [
                {
                    text: "About Us",
                    href: "/about",
                },
                {
                    text: "Careers",
                    href: "/careers",
                },
                {
                    text: "Careers",
                    href: "/careers",
                },
                {
                    text: "Contact Us",
                    href: "/contact-us",
                },
            ],
        },
        {
            title: "Resources",
            items: [
                {
                    text: "View Posts",
                    href: "/posts",
                },
                {
                    text: "All Categories",
                    href: "/categories",
                },
                {
                    text: "All Courses",
                    href: "/courses",
                },
                {
                    text: "Quizzes",
                    href: "/quizzes",
                },
            ],
        },
        {
            title: "User",
            items: [
                {
                    text: "Login",
                    href: "/login",
                },
                {
                    text: "Dashboard",
                    href: "/dashboard",
                },
                {
                    text: "Add new post",
                    href: "/posts/new",
                },
                {
                    text: "My posts",
                    href: "/dashboard/posts",
                },
            ],
        },
    ];

interface FooterProps extends HTMLProps<HTMLDivElement> {

}

const Footer: FC<FooterProps> = ({ className }) => {
    return (
        <footer className={`footer px-8 py-10 ${className ? className : ""}`}>
            <div className="container flex flex-col mx-auto">
                <div className="w-full flex flex-wrap">
                    <div className={"w-full md:w-1/4 py-4"}>
                        <div className={"logo flex justify-start items-center mb-6"}>
                            <Image src="/image/logo/logo.png" alt="Logo" width={48} height={48} className="mr-4" />
                            <p>Kafedra</p>
                        </div>
                        <p className="footer-desc pb-2 mb-4">
                            Anywhere, anytime. Start learning today! And Get an Exceptional Education Experience.
                        </p>
                        <p className="body-2 show-md-up">© Alexstrap Education 2022</p>
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        {/*p-4 col-span-2 items-center gap-10 mb-10 lg:mb-0 md:gap-36*/}
                        <div className={"w-full flex justify-around"}>
                            {LINKS.map(({ title, items }, index) => (
                                <div key={index} className={"sm:w-1/4"}>
                                    <h6 className="mb-4 uppercase text-primary-dark font-bold">
                                        {title}
                                    </h6>
                                    <ul>
                                        {items.map((link, j_index) => (
                                            <li key={j_index}>
                                                <Link
                                                    href={link.href}
                                                >
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                // <ul key={title}>
                                //     <Typography variant="h6" color="blue-gray" className="mb-4">
                                //         {title}
                                //     </Typography>
                                //     {items.map((link) => (
                                //         <li key={link}>
                                //             <Typography
                                //                 as="a"
                                //                 href="#"
                                //                 className="py-1 font-normal !text-gray-700 transition-colors hover:!text-gray-900"
                                //             >
                                //                 {link}
                                //             </Typography>
                                //         </li>
                                //     ))}
                                // </ul>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 py-4">
                        <div className={"social-icons-list mb-8"}>
                            {
                                social_icons.map((item, index) => {
                                    const ItemComponent = item;
                                    return (
                                        <ContainerWithRipple key={index} className={"social-icon m-2"}>
                                            <ItemComponent />
                                        </ContainerWithRipple>
                                    )
                                })
                            }
                        </div>
                        <div className={"flex justify-center"}>
                            <LangSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
