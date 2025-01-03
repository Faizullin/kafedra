"use client"

import {ReactNode} from "react";
import Icon1 from "@/../public/image/home/service-1.svg"
import Icon2 from "@/../public/image/home/service-2.svg"
import Icon3 from "@/../public/image/home/service-3.svg"

interface ServiceItem {
    icon: ReactNode;
    title: string;
    description: string;
}

const SERVICES: ServiceItem[] = [
    {
        icon: (
            <Icon1 className={"w-16 h-16 relative z-10 fill-white"}/>
        ),
        title: "Customized Training Programs",
        description: "Tailored workshops and courses for specific needs.",
    },
    {
        icon: (
            <Icon2 className={"w-16 h-16 relative z-10 fill-white"}/>
        ),
        title: "Collaborative Course Development",
        description: "Enable teachers and experts to co-create course materials and posts.",
    },
    {
        icon: (
            <Icon3 className={"w-16 h-16 relative z-10 fill-white"}/>
        ),
        title: "Interactive Study",
        description: "Our Quizzes and Design allow us to enhance student learning and engagement.",
    },
];

const OurServices = () => {
    return (
        <section id="services" className="py-10">
            <div className="container mx-auto">
                <div className="mx-auto flex justify-center">
                    <div className="w-full lg:w-1/2">
                        <div className="title-main text-center mb-16">
                        <h4 className="title">
                            What We Do
                            </h4>
                            <p className="use-text-subtitle2">
                                Our Services
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    {
                        SERVICES.map((service, index) => (
                            <div key={index}
                                className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12">
                                <div className="single-service-item text-center mt-8 mx-3">
                                    <div className="single-service-item__icon relative w-24 h-24 flex justify-center items-center">
                                        { service.icon }
                                        <svg xmlns="http://www.w3.org/2000/svg" className={"icon-bg"}
                                             viewBox="0 0 94 92">
                                            <path className="services_shape" id="Polygon_12" data-name="Polygon 12"
                                                  d="M42.212,2.315a11,11,0,0,1,9.576,0l28.138,13.6a11,11,0,0,1,5.938,7.465L92.83,54.018A11,11,0,0,1,90.717,63.3L71.22,87.842A11,11,0,0,1,62.607,92H31.393a11,11,0,0,1-8.613-4.158L3.283,63.3A11,11,0,0,1,1.17,54.018L8.136,23.383a11,11,0,0,1,5.938-7.465Z"></path>
                                        </svg>
                                    </div>
                                    <div className="single-service-item__content mt-5 xl:mt-10 px-6 py-12">
                                        <h3 className="title text-black font-semibold text-xl md:text-2xl lg:text-xl xl:text-3xl">
                                            { service.title }
                                        </h3>
                                        <p className="mt-4"> { service.description } </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default OurServices;