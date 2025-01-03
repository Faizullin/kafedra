"use client"

import {memo} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import Image from "next/image";
import {Button, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import StarRatingView from "@/components/star-rating-view/StarRatingView";

interface IPopularPost {
    id: number;
    title: string;
    description: string;
    image: string;
    rating: number;
}

const popularPosts: IPopularPost[] = [
    {
        id: 1,
        title: "Instant Kendo UI Mobile",
        description: "Filled with practical, step-by-step instructions and clear explanations for the most important and useful tasks.",
        image: "/image/blogs/blog-10.jpeg",
        rating: 4.5,
    },
    {
        id: 2,
        title: "Post 2",
        description: "This is the second post.",
        image: "/image/blogs/blog-10.jpeg",
        rating: 4.19,
    },
    {
        id: 3,
        title: "Post 3",
        description: "This is the third post.",
        image: "/image/blogs/blog-10.jpeg",
        rating: 0,
    },
    {
        id: 4,
        title: "Post 4",
        description: "This is the third post.",
        image: "/image/blogs/blog-10.jpeg",
        rating: 2.89,
    },
    {
        id: 5,
        title: "Post 4",
        description: "This is the third post.",
        image: "/image/blogs/blog-10.jpeg",
        rating: 2.89,
    },
    {
        id: 6,
        title: "Post 4",
        description: "This is the third post.",
        image: "/image/blogs/blog-10.jpeg",
        rating: 2.89,
    },
    {
        id: 7,
        title: "Post 4",
        description: "This is the third post.",
        image: "/image/blogs/blog-10.jpeg",
        rating: 2.89,
    },
    {
        id: 8,
        title: "Post 8",
        description: "This is the third post.",
        image: "/image/blogs/blog-10.jpeg",
        rating: 2.89,
    },
];

const PopularPosts = memo(() => {
    return (
        <section id="popular-posts" className="relative pt-16">
            <div className={"root py-16"}>
                {/*<div className="parallax-wrap">*/}
                {/*    <div className="parallax-wrap dots-wrap">*/}
                {/*        <div className="inner-parallax">*/}
                {/*            <div className="figure">*/}
                {/*                <div data-enllax-ratio="-0.2" data-enllax-type="foreground"*/}
                {/*                     style="transform: translateY(-132px);"><img*/}
                {/*                    className="parallax-vertical parallax-dot"*/}
                {/*                    src="../assets/images/decoration/dot-deco.svg"*/}
                {/*                    alt="dot"/></div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="container mx-auto relative z-10">
                    <div className="floating-title absolute top-4 lg:-ml-8">
                        <div className="title-main align-left dark w-1/2">
                            <h4 className="title">
                                Popular Courses
                            </h4>
                            <p className="use-text-subtitle2">
                                Choose from many options of popular course at a breakthrough price.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="carousel-wrap z-10">
                    <div className={"carousel-nav-arrows"}>
                        <Button id={"carousel-nav-left-btn"} variant={"filled"} color={"white"}>
                            <ChevronLeftIcon className={"text-text-primary w-8"}/>
                        </Button>
                        <Button id={"carousel-nav-right-btn"} variant={"filled"} color={"white"}>
                            <ChevronRightIcon className={"text-text-primary w-8"}/>
                        </Button>
                    </div>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={16}
                        slidesPerView={"auto"}
                        navigation={{
                            prevEl: "#carousel-nav-left-btn",
                            nextEl: "#carousel-nav-right-btn",
                        }}
                        pagination={{clickable: true}}
                        // breakpoints={{
                        //     640: {slidesPerView: 1},
                        //     768: {slidesPerView: 2},
                        //     1024: {slidesPerView: 3},
                        // }}
                    >
                        <SwiperSlide className={"spacer-slide"}/>
                        {popularPosts.map((post) => (
                            <SwiperSlide key={post.id}
                                         className="shadow-lg rounded-lg overflow-hidden">
                                {/*<div className={"thumbnail-image w-full h-32"}>*/}
                                {/*    <Image*/}
                                {/*        src={post.image}*/}
                                {/*        alt={post.title}*/}
                                {/*        className="w-full h-full object-cover"*/}
                                {/*        width={280}*/}
                                {/*        height={150}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                {/*<div className="p-4">*/}
                                {/*    <h3 className="title text-lg font-semibold">{post.title}</h3>*/}
                                {/*    <p className="description text-gray-600 text-sm">{post.description}</p>*/}
                                {/*</div>*/}
                                <Card className="card border relative">
                                    <CardHeader className={"thumbnail-image w-full h-32 m-0"} floated={false}>
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover"
                                            width={280}
                                            height={150}
                                        />
                                    </CardHeader>
                                    <CardBody className={"text-left p-4"}>
                                        <Typography variant="h5" className="mb-2 text-black title">
                                            {post.title}
                                        </Typography>
                                        <Typography className="mb-4 font-normal description">
                                            {post.description}
                                        </Typography>
                                        <StarRatingView value={post.rating} />
                                    </CardBody>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/*<div className="slider-wrap">*/}
                {/*    <div className="carousel">*/}
                {/*        <div className="slick-carousel slick-initialized slick-slider" id="course_carousel"*/}
                {/*             data-length="6">*/}
                {/*            <div className="slick-list draggable">*/}
                {/*                <div className="slick-track"*/}
                {/*                     style="opacity: 1; width: 40000px; transform: translate3d(0px, 0px, 0px);">*/}
                {/*                    <div*/}
                {/*                        className="props item-props-first show-md-up slick-slide slick-current slick-active"*/}
                {/*                        tabIndex="0" style="" data-slick-index="0" aria-hidden="false">*/}
                {/*                        <div></div>*/}
                {/*                    </div>*/}
                {/*                    <div className="item slick-slide slick-active" tabIndex="0" style=""*/}
                {/*                         data-slick-index="1" aria-hidden="false">*/}
                {/*                        <div className="card general-card">*/}
                {/*                            <figure><img*/}
                {/*                                src="https://res.cloudinary.com/imajin/image/upload/v1592702766/education/design_mfqgit.jpg"*/}
                {/*                                alt="title"/></figure>*/}
                {/*                            <div className="desc"><h6 className="title pb-2">Instant Kendo UI*/}
                {/*                                Mobile</h6><p*/}
                {/*                                className="use-text-paragraph">Filled with practical, step-by-step*/}
                {/*                                instructions and clear explanations for the most important and useful*/}
                {/*                                tasks.</p>*/}
                {/*                                <div className="property">*/}
                {/*                                    <div className="rating"><i className="material-icons star-icon"*/}
                {/*                                                               title="1">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="2">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="3">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="4">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="5">star</i></div>*/}
                {/*                                    <strong>$50</strong></div>*/}
                {/*                                <a className="button btn btn-outlined primary waves-effect" href="#"*/}
                {/*                                   tabIndex="0">Explore</a></div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="item slick-slide slick-active" tabIndex="0" style=""*/}
                {/*                         data-slick-index="2" aria-hidden="false">*/}
                {/*                        <div className="card general-card">*/}
                {/*                            <figure><img*/}
                {/*                                src="https://res.cloudinary.com/imajin/image/upload/v1592702766/education/cook_bsillr.jpg"*/}
                {/*                                alt="title"/></figure>*/}
                {/*                            <div className="desc"><h6 className="title pb-2">Joy of Cooking in the*/}
                {/*                                House</h6><p*/}
                {/*                                className="use-text-paragraph">The famously irreverent chef also offers*/}
                {/*                                playful riffs on classics, reimagining tuna-and-rice bowls.</p>*/}
                {/*                                <div className="property">*/}
                {/*                                    <div className="rating"><i className="material-icons star-icon"*/}
                {/*                                                               title="1">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="2">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="3">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="4">star</i></div>*/}
                {/*                                    <strong>$10</strong></div>*/}
                {/*                                <a className="button btn btn-outlined primary waves-effect" href="#"*/}
                {/*                                   tabIndex="0">Explore</a></div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="item slick-slide slick-active" tabIndex="0" style=""*/}
                {/*                         data-slick-index="3" aria-hidden="false">*/}
                {/*                        <div className="card general-card">*/}
                {/*                            <figure><img*/}
                {/*                                src="https://res.cloudinary.com/imajin/image/upload/v1592702766/education/music_nmw3mb.jpg"*/}
                {/*                                alt="title"/></figure>*/}
                {/*                            <div className="desc"><h6 className="title pb-2">Face the Music: A Life*/}
                {/*                                Exposed</h6>*/}
                {/*                                <p className="use-text-paragraph">Face the Music is the shocking*/}
                {/*                                    inspirational story of one of rock’s most enduring icons.</p>*/}
                {/*                                <div className="property">*/}
                {/*                                    <div className="rating"><i className="material-icons star-icon"*/}
                {/*                                                               title="1">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="2">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="3">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="4">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="5">star</i></div>*/}
                {/*                                    <strong>$50</strong></div>*/}
                {/*                                <a className="button btn btn-outlined primary waves-effect" href="#"*/}
                {/*                                   tabIndex="0">Explore</a></div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="item slick-slide" tabIndex="-1" style="" data-slick-index="4"*/}
                {/*                         aria-hidden="true">*/}
                {/*                        <div className="card general-card">*/}
                {/*                            <figure><img*/}
                {/*                                src="https://res.cloudinary.com/imajin/image/upload/v1592702766/education/game_pa63b3.jpg"*/}
                {/*                                alt="title"/></figure>*/}
                {/*                            <div className="desc"><h6 className="title pb-2">Metaverse For*/}
                {/*                                Beginners</h6><p*/}
                {/*                                className="use-text-paragraph">When people talk about the future, they*/}
                {/*                                usually mean virtual reality.</p>*/}
                {/*                                <div className="property">*/}
                {/*                                    <div className="rating"><i className="material-icons star-icon"*/}
                {/*                                                               title="1">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="2">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="3">star</i></div>*/}
                {/*                                    <strong>$25</strong></div>*/}
                {/*                                <a className="button btn btn-outlined primary waves-effect" href="#"*/}
                {/*                                   tabIndex="-1">Explore</a></div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="item slick-slide" tabIndex="-1" style="" data-slick-index="5"*/}
                {/*                         aria-hidden="true">*/}
                {/*                        <div className="card general-card">*/}
                {/*                            <figure><img*/}
                {/*                                src="https://res.cloudinary.com/imajin/image/upload/v1592702767/education/sport_ilndwv.jpg"*/}
                {/*                                alt="title"/></figure>*/}
                {/*                            <div className="desc"><h6 className="title pb-2">Practical Ethics in Sport*/}
                {/*                                Management</h6><p className="use-text-paragraph">Leaders and managers*/}
                {/*                                throughout the sporting world face many ethical challenges on a daily*/}
                {/*                                basis.</p>*/}
                {/*                                <div className="property">*/}
                {/*                                    <div className="rating"><i className="material-icons star-icon"*/}
                {/*                                                               title="1">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="2">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="3">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="4">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="5">star</i></div>*/}
                {/*                                    <strong>$50</strong></div>*/}
                {/*                                <a className="button btn btn-outlined primary waves-effect" href="#"*/}
                {/*                                   tabIndex="-1">Explore</a></div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="item slick-slide" tabIndex="-1" style="" data-slick-index="6"*/}
                {/*                         aria-hidden="true">*/}
                {/*                        <div className="card general-card">*/}
                {/*                            <figure><img*/}
                {/*                                src="https://res.cloudinary.com/imajin/image/upload/v1592702766/education/geo_pgt0fz.jpg"*/}
                {/*                                alt="title"/></figure>*/}
                {/*                            <div className="desc"><h6 className="title pb-2">Economic Geography: Past*/}
                {/*                                Present*/}
                {/*                                Future</h6><p className="use-text-paragraph">The impact of economic*/}
                {/*                                geography both within the field of geography.</p>*/}
                {/*                                <div className="property">*/}
                {/*                                    <div className="rating"><i className="material-icons star-icon"*/}
                {/*                                                               title="1">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="2">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="3">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="4">star</i> <i*/}
                {/*                                        className="material-icons star-icon" title="5">star</i></div>*/}
                {/*                                    <strong>$40</strong></div>*/}
                {/*                                <a className="button btn btn-outlined primary waves-effect" href="#"*/}
                {/*                                   tabIndex="-1">Explore</a></div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="props item-props-last show-md-up slick-slide" tabIndex="-1" style=""*/}
                {/*                         data-slick-index="7" aria-hidden="true">*/}
                {/*                        <div></div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <button className="btn-floating nav prev waves-effect" id="prev_project"><i*/}
                {/*            className="ion-ios-arrow-back"></i></button>*/}
                {/*        <button className="btn-floating nav next waves-effect" id="next_project"><i*/}
                {/*            className="ion-ios-arrow-forward"></i></button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </section>
    )
});

PopularPosts.displayName = "PopularPosts";

export default PopularPosts;