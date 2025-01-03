"use client";

import React from "react";

function Hero() {
    return (
        <section id="hero" className={"bg-primary-light sm:bg-transparent"}>
            <div className="container mx-auto relative">
                <div className="w-full flex">
                    <div className="w-full md:w-1/2">
                        <div className="banner-text py-12 mt-24 relative z-20">
                            <div className="title-main text-left">
                                <h1 className="title use-text-title">
                                    Welcome
                                </h1>
                            </div>
                            <h5 className="text-2xl text-text-primary mb-10 md:pr-16">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus quam vel magna
                                placerat, vel aliquet eros laoreet.
                            </h5>
                            <div className="h-20"></div>
                        </div>
                    </div>
                    <div className="hidden md:block w-1/2">
                        <div className="deco-banner">
                            <div className="artwork-bg">
                                <div className="oval"/>
                                <div className="parallax-scene back">
                                    <div
                                        id="scene1"
                                        style={{
                                            transform: "translate3d(0px, 0px, 0px) rotate(0.0001deg)",
                                            transformStyle: "preserve-3d",
                                            backfaceVisibility: "hidden",
                                            position: "relative",
                                            pointerEvents: "none"
                                        }}
                                    >
                                        <div
                                            data-depth="0.3"
                                            style={{
                                                transform: "translate3d(13.2px, 7.1px, 0px)",
                                                transformStyle: "preserve-3d",
                                                backfaceVisibility: "hidden",
                                                position: "relative",
                                                display: "block",
                                                left: 0,
                                                top: 0
                                            }}
                                        >
                                            <span className="icon-three"/>
                                        </div>
                                        <div
                                            data-depth="0.2"
                                            style={{
                                                transform: "translate3d(8.8px, 4.8px, 0px)",
                                                transformStyle: "preserve-3d",
                                                backfaceVisibility: "hidden",
                                                position: "absolute",
                                                display: "block",
                                                left: 0,
                                                top: 0
                                            }}
                                        >
                                            <span className="icon-four"/>
                                        </div>
                                    </div>
                                </div>
                                {/*<img src="../assets/images/education/banner-artwork.png" alt="artwork"/>*/}
                                <div className="parallax-scene front">
                                    <div
                                        id="scene2"
                                        style={{
                                            transform: "translate3d(0px, 0px, 0px) rotate(0.0001deg)",
                                            transformStyle: "preserve-3d",
                                            backfaceVisibility: "hidden",
                                            position: "relative",
                                            pointerEvents: "none"
                                        }}
                                    >
                                        <div
                                            data-depth="0.1"
                                            style={{
                                                transform: "translate3d(4.4px, 2.4px, 0px)",
                                                transformStyle: "preserve-3d",
                                                backfaceVisibility: "hidden",
                                                position: "relative",
                                                display: "block",
                                                left: 0,
                                                top: 0
                                            }}
                                        >
                                            <span className="icon-two"/>
                                        </div>
                                        <div
                                            data-depth="0.15"
                                            style={{
                                                transform: "translate3d(6.6px, 3.6px, 0px)",
                                                transformStyle: "preserve-3d",
                                                backfaceVisibility: "hidden",
                                                position: "absolute",
                                                display: "block",
                                                left: 0,
                                                top: 0
                                            }}
                                        >
                                            <span className="icon-one"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
