"use client";

import {memo} from "react";
import {Button} from "@material-tailwind/react";

const About = memo(() => {
    return (
        <section id="about" className={""}>
            <div
                className={"w-full py-24 relative"}
                style={{
                    backgroundImage: `url(/image/bg-pattern1.png)`,
                }}>
                <div className="container max-w-7xl mx-auto">
                    <div className={"w-full flex"}>
                        <div className="md:w-5/12">
                            <div>
                                <figure className="illustration w-[180px] -top-[10px] left-[300px] ">
                                    <img
                                        src="https://res.cloudinary.com/imajin/image/upload/v1592702765/education/about_class_eng2pq.jpg"
                                        alt="about"/>
                                </figure>
                                <figure className="illustration w-[160px] top-[130px] left-[50px]">
                                    <img
                                        src="https://res.cloudinary.com/imajin/image/upload/v1592702764/education/about_learn_ykpm08.jpg"
                                        alt="about"/>
                                </figure>
                                <figure className="illustration w-[210px] -bottom-[30px] left-[250px]">
                                    <img
                                        src="https://res.cloudinary.com/imajin/image/upload/v1592702764/education/about_student_getuwg.jpg"
                                        alt="about"/>
                                </figure>
                                <div
                                    className="illustration -bottom-[30px] right-[10px] !rounded-[15px] w-[60px]"></div>
                            </div>
                        </div>
                        <div className="md:w-7/12">
                            <div>
                                <div className="title-main text-left">
                                    <h4 className="title mb-8">
                                        About Us
                                    </h4>
                                    <p className="use-text-subtitle2">
                                        Our mission is to diversify the tech industry
                                        through accessible education and apprenticeship, unlocking the door to
                                        opportunity and empowering people to achieve their dreams.
                                    </p>
                                </div>
                                <div className={"mt-10"}>
                                    <Button variant={"filled"} color={"white"}>Join</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
})

About.displayName = "About";

export default About;