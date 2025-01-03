"use client";

import React from "react";

import {
    ArrowRightIcon,
    GlobeEuropeAfricaIcon,
    HeartIcon,
    MicrophoneIcon,
    PuzzlePieceIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import ContainerWithRipple from "@/components/ContainerWithRipple";
import Link from "next/link";


interface ICategory {
    img: string;
    title: string;
    description: string;
    icon: React.ElementType;
    link: string;
}

const CATEGORIES: ICategory[] = [
    {
        img: "/image/blogs/blog-10.jpeg",
        icon: HeartIcon,
        title: "Frontend Web Development",
        description: "300 Courses",
        link: "/",
    },
    {
        img: "/image/blogs/blog-10.jpeg",
        icon: PuzzlePieceIcon,
        title: "Backend Web Development",
        description: "200 Courses",
        link: "/",
    },
    {
        img: "/image/blogs/blog-10.jpeg",
        icon: GlobeEuropeAfricaIcon,
        title: "Web Security & Performance",
        description: "240 Courses",
        link: "/",
    },
    {
        img: "/image/blogs/blog-10.jpeg",
        icon: MicrophoneIcon,
        title: "Full-Stack Web Development",
        description: "100 Courses",
        link: "/",
    },
    {
        img: "/image/blogs/blog-10.jpeg",
        icon: MicrophoneIcon,
        title: "Full-Stack Web Development",
        description: "100 Courses",
        link: "/",
    },
];

export function CoursesCategories() {
    return (
        <section id="course-categories" className="py-16">
            <div className=" container mx-auto relative">
                <div className="title-main text-left">
                    <h3 className="title">
                        Explore courses
                    </h3>
                    <p className="use-text-subtitle2">
                        Choose from 100,000 online video courses with new additions published every month.
                    </p>
                </div>
                <div className="mt-10">
                    <div className="w-full flex flex-wrap">
                        {
                            CATEGORIES.map((item, index) => (
                                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2 md:p-6">
                                    <div className="category-card ">
                                        <ContainerWithRipple
                                            as={Link}
                                            href={item.link}
                                            className={"category-card__image w-full rounded-2xl overflow-hidden cursor-pointer"}>
                                            <Image
                                                src={item.img}
                                                alt={item.title}
                                                width={360}
                                                height={250}
                                                className={"w-full object-cover object-center"}/>
                                            <div className={"category-card__content"}>
                                                <h3 className={"title"}>
                                                    {item.title}
                                                </h3>
                                                <p className={"description"}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </ContainerWithRipple>

                                        <div className="fold">
                                            <div className="fold-item"></div>
                                            <div className="fold-item"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="w-full sm:w-1/2 lg:w-1/3 p-2 md:p-6">
                            <div className="category-card all-courses-link-card">
                                <ContainerWithRipple
                                    as={Link}
                                    href={"/courses"}
                                    className={"category-card__image w-full rounded-2xl overflow-hidden cursor-pointer"}>
                                    <Image
                                        src={"/image/home/all-courses-demo.jpeg"}
                                        alt={"other courses"}
                                        width={360}
                                        height={250}
                                        className={"w-full h-full object-cover object-center"}/>
                                    <div className={"category-card__content"}>
                                        <h3 className={"title"}>
                                            All courses
                                        </h3>
                                        <ArrowRightIcon className="w-10 text-white font-bold"/>
                                    </div>
                                </ContainerWithRipple>

                                <div className="fold">
                                    <div className="fold-item"></div>
                                    <div className="fold-item"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CoursesCategories;