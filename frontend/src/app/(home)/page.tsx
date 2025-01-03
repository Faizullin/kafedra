"use client"

// components
import Navbar from "@/components/common/header/navbar";
import Footer from "@/components/common/footer/footer";

// sections
import CoursesCategories from "./components/courses-categories";
import OurServices from "./components/our-services";
import MainFeatures from "./components/main-features";
import Hero from "./components/hero";
import SupportedZones from "./components/SupportedZones";
import About from "./components/about";
import PopularPosts from "./components/popular-posts";

import "@/styles/home.scss";


export default function HomePage() {
    return (
        <main className="home-page">
            <Navbar/>
            <Hero/>
            <MainFeatures/>
            <OurServices/>
            <About/>
            <SupportedZones/>
            <PopularPosts />
            <CoursesCategories/>
            <Footer className={"mt-20"}/>
        </main>
    );
}
