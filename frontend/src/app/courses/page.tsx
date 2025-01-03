"use client"

import Navbar from "@/components/common/header/navbar";
import {memo} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

import BookIcon from "https://bizantheme.com/html/eduna-demo/assets/img/icons/icon-grey-book-3-line.svg";
import ProfileIcon from "https://bizantheme.com/html/eduna-demo/assets/img/icons/icon-grey-user-3-line.svg";

import Footer from "@/components/common/footer/footer";
import StarRatingView from "@/components/star-rating-view/StarRatingView";

const SearchForm = memo(() => {
    return (
        <form action="#" method="get" className="w-full">
            <div className="relative flex items-center">
                <input type="search" placeholder="Search your courses"
                       className="w-full rounded-[50px] border px-8 py-3.5 pr-36 text-sm font-medium outline-none placeholder:text-colorBlackPearl/55"/>
                <button type="submit"
                        className="absolute bottom-[5px] right-0 top-[5px] mr-[5px] inline-flex items-center justify-center gap-x-2.5 rounded-[50px] bg-colorPurpleBlue px-6 text-center text-sm text-white hover:bg-colorBlackPearl">
                    Search
                    <MagnifyingGlassIcon/>
                </button>
            </div>
        </form>
    )
})
SearchForm.displayName = "SearchForm";

interface ICourse {
    id: number;
    title: string;
    description: string;
    owner: {
        id: number;
        fullname: string;
    },
    rating: number;
    reviews_count: number;
    lessons_count: number;
    image: string;
    link: string;
}

const courses: ICourse[] = [
    {
        id: 1,
        title: "Design",
        description: "Design",
        owner: {
            id: 2,
            fullname: "John Smith",
        },
        rating: 4.0,
        reviews_count: 68,
        image: "https://bizantheme.com/html/eduna-demo/assets/img/images/th-1/course-img-3.jpg",
        lessons_count: 0,
        link: "/",
    },
    {
        id: 2,
        title: "Design",
        description: "Design",
        owner: {
            id: 2,
            fullname: "John Smith",
        },
        rating: 5.0,
        reviews_count: 0,
        image: "https://bizantheme.com/html/eduna-demo/assets/img/images/th-1/course-img-3.jpg",
        lessons_count: 10,
        link: "/",
    },
]


const CoursesPage = (
    props: {
        searchParams?: Promise<{
            query?: string;
            page?: string;
        }>;
    }
) => {
    // const searchParams = useSearchParams();
    // const pathname = usePathname();
    // const { replace } = useRouter();
    // const [inputValue, setInputValue] = useState<string>("");
    // useEffect(() => {
    //     const query = searchParams.get('query')?.toString();
    //     console.log("query change")
    //     setInputValue(query || "");
    // }, [searchParams])
    // useEffect(() => {
    //     const searchParams =props.searchParams;
    //     const query = searchParams?.query || '';
    //     const currentPage = Number(searchParams?.page) || 1;
    //     const totalPages = fetchInvoicesPages(query);
    // }, []);

    // const handleSearch = useDebounceCallback((term: string) => {
    //     console.log(`Searching... ${term}`);
    //
    //     const params = new URLSearchParams(searchParams);
    //     if (term) {
    //         params.set('query', term);
    //     } else {
    //         params.delete('query');
    //     }
    //     replace(`${pathname}?${params.toString()}`);
    // }, 300);
    return (
        <main className="courses-page">
            <Navbar/>
            <section className="section-breadcrum-hero">
                <div className="relative z-10 overflow-hidden bg-[#FAF9F6]">
                    <div className="py-[60px] lg:py-[90px]">
                        <div className="container">
                            <div className="text-center">
                                <h1 className="mb-5 text-4xl capitalize tracking-normal">
                                    Our Courses
                                </h1>
                                <nav className="text-base font-medium uppercase">
                                    <ul className="flex justify-center">
                                        <li className="relative has-[a]:text-colorJasper has-[a]:after:text-colorCarbonGrey has-[a]:after:content-['/']">
                                            <a href="/">HOME</a>
                                        </li>
                                        <li>our courses</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -left-48 top-0 -z-10 h-[327px] w-[371px] bg-[#BFC06F] blur-[250px]"></div>
                    <div
                        className="absolute -right-36 bottom-20 -z-10 h-[327px] w-[371px] bg-[#AAC3E9] blur-[200px]"></div>
                    <img src="https://bizantheme.com/assets/img/abstracts/abstract-purple-dash-1.svg"
                         alt="abstract-purple-dash-1"
                         className="absolute left-56 top-1/2 -z-10 hidden -translate-y-1/2 sm:inline-block"/>
                    <img src="https://bizantheme.com/assets/img/abstracts/abstract-element-regular.svg"
                         alt="abstract-element-regular"
                         className="absolute -bottom-14 right-[100px] -z-10 hidden sm:inline-block"/>
                </div>
            </section>
            <section className={"py-[100px]"}>
                <div className="container mx-auto">
                    <div
                        className="mb-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:mb-10 md:justify-between">
                        <div className="order-2 md:order-1">showing 1-6 of 15 Result</div>
                        <div className="order-1 w-full md:order-2 md:w-[436px]">
                            <SearchForm/>
                        </div>
                    </div>
                    <div className={"grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-3"}>
                        {
                            courses.map((course, index) => (
                                <div key={course.id} className="">
                                    <div
                                        className="group overflow-hidden rounded-lg transition-all duration-300 hover:shadow-md">
                                        <div className="relative block overflow-hidden">
                                            <Image src={course.image} alt={course.title}
                                                   width={370} height={270}
                                                   className="h-auto w-full transition-all duration-300 group-hover:scale-105"/>
                                            <Link href={course.link}
                                                  className="absolute left-3 top-3 inline-block rounded-[40px] bg-colorBrightGold px-3.5 py-1.5 text-sm leading-none text-colorBlackPearl hover:bg-colorBlackPearl hover:text-colorBrightGold">
                                                {course.title}
                                            </Link>
                                        </div>
                                        <div className="bg-[#F5F5F5] px-5 py-8">
                                            <div className="flex gap-9">
                                                <span className="inline-flex items-center gap-1.5 text-sm">
                                                    <BookIcon width={17} height={17}/>
                                                    <span className="flex-1">{course.lessons_count} Lessons</span>
                                                </span>
                                                <Link href={course.link}
                                                      className="inline-flex items-center gap-1.5 text-sm hover:underline">
                                                    <ProfileIcon width="17" height="18"/>
                                                    <span className="flex-1">{course.owner.fullname}</span>
                                                </Link>
                                            </div>
                                            <Link
                                                href={course.link}
                                                className="my-6 block font-title text-xl font-bold text-colorBlackPearl hover:text-colorPurpleBlue">Data
                                                Competitive Strategy law and Organization Course
                                            </Link>
                                            <div className="inline-flex gap-x-[10px] text-sm">
                                                <StarRatingView value={course.rating}/>
                                                <span>({course.reviews_count} Reviews)</span>
                                            </div>
                                            <div className="my-6 h-px w-full bg-[#E9E5DA]"></div>
                                            <div className="flex items-center justify-between">
                                                {/*<span*/}
                                                {/*    className="font-title text-xl font-bold text-colorPurpleBlue">$674.00</span>*/}
                                                {/*        <div className="inline-flex items-center gap-1.5 text-sm">*/}
                                                {/*            <img src="assets/img/icons/icon-grey-graduation-cap-line.svg"*/}
                                                {/*                 alt="icon-grey-graduation-cap-line" width="17" height="17"/>*/}
                                                {/*            <span className="flex-1">673 Students</span>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <Footer/>
        </main>
    )
}

export default CoursesPage;