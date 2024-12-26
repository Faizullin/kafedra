import Header from "@/components/common/header/Header";

import "./Home.scss";

export default function Home() {
    return (
        <main>
            <Header/>
            <section id="home">
                <div className={"container mx-auto"}>
                    <div className={"w-1/2"}>
                        <div className="banner-text">
                            <div className="title">
                                <h3 className="use-text-title">Welcome</h3>
                            </div>
                            <h5 className="subtitle">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus quam vel magna
                                placerat, vel aliquet eros laoreet.
                            </h5>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
