"use client"
import {Card, CardBody, Typography} from "@material-tailwind/react";
import Icon1 from "@/../public/image/home/feature-1.svg"
import Icon2 from "@/../public/image/home/feature-2.svg"
import Icon3 from "@/../public/image/home/feature-3.svg"
import Icon4 from "@/../public/image/home/feature-4.svg"
import Icon5 from "@/../public/image/home/feature-5.svg"
import {GlobeAltIcon} from "@heroicons/react/24/solid";


const FEATURES = [
    {
        icon: (
            <Icon1 className="h-full w-full object-cover bg-primary-dark fill-white"/>
        ),
        title: "Expert-Led Courses",
        subtitle: " Learn from industry experts and seasoned educators.",
    },
    {
        icon: (
            <Icon2 className="h-full w-full object-cover bg-primary-dark fill-white"/>
        ),
        title: "Comprehensive Resources",
        subtitle: " Access a wide range of teaching and learning materials.",
    },
    {
        icon: (
            <Icon3 className="h-full w-full object-cover bg-primary-dark stroke-white"/>
        ),
        title: "Flexible Learning",
        subtitle: "Study at your own pace with online and offline options.",
    },
    {
        icon: (
            <Icon4 className="h-full w-full object-cover bg-primary-dark fill-white"/>
        ),
        title: "Community Support",
        subtitle: "Engage with a supportive network of peers and mentors.",
    },
    {
        icon: (
            <Icon5 className="h-full w-full object-cover bg-primary-dark fill-white"/>
        ),
        title: "Innovative Tools",
        subtitle: "Utilize cutting-edge tools to enhance educational outcomes.",
    },
    {
        icon: (
            <GlobeAltIcon className="h-full w-full object-cover bg-primary-dark text-white"/>
        ),
        title: "Global Reach",
        subtitle: "Connect with an international community through multilingual resources and collaborations.",
    },
];

const MainFeatures = () => {
    return (

        <section id={"main-features"} className="pt-40 pb-10">
            <div>
                <div className="container max-w-5xl mx-auto relative">
                    <div className="title-main text-center mb-16">
                        <h4 className="title">
                            Main Feature
                        </h4>
                        <p className="use-text-subtitle2">
                            The world s largest selection of courses
                        </p>
                    </div>
                </div>
            </div>
            <div className={"relative"}>
                <div
                    className={"container mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14 "}>
                    {
                        FEATURES.map((item, index) => (
                            <Card key={index} className="border relative">
                                <div className={"absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 "}>
                                    <div className={"w-12 lg:w-14 bg-primary-dark rounded-full aspect-square p-4 text-white"}>
                                        {
                                            item.icon
                                        }
                                    </div>
                                </div>
                                <CardBody className={"text-center"}>
                                    <div className={"mb-7"}></div>
                                    <Typography variant="h5" className="mb-2 text-primary-dark">
                                        {item.title}
                                    </Typography>
                                    <Typography className="mb-6 font-normal">
                                        {item.subtitle}
                                    </Typography>
                                </CardBody>
                            </Card>
                        ))
                    }
                </div>
                <div className={"deco-banner-bg"}></div>
            </div>
        </section>
    )
}

export default MainFeatures;