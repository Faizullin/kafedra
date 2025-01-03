import {Button, Card, CardBody} from "@material-tailwind/react";
import React from "react";

const Subscribe = () => {
    return (
        <section id={"subscribe"} className={"pt-16 pb-8"}>
            <div className="relative w-full">
                <div className="container max-w-7xl">
                    <Card>
                        <CardBody className="relative w-full">
                            <h4 className="use-text-title2 mb-6">
                                Stay in touch
                            </h4>
                            <p className="use-text-subtitle2 mb-4">
                                Subscribe to our newsletter and stay updated on the
                                latest developments and special offers!
                            </p>
                            <form action="">
                                <input type="text"/>
                                <Button variant={"filled"} color="blue">Subscribe</Button>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Subscribe;