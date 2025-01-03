import {FC} from "react";
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import Image from "next/image";

interface FeatureItem {
    title: string;
    subtitle: string;
    img: string;
}

const FeatureItem: FC<FeatureItem> = ({title, subtitle, img}) => {
    return (
        <Card className="border relative">
            <div className={"absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 "}>
                <div className={"w-12 lg:w-14 bg-primary-dark rounded-full aspect-square p-3"}>
                    <Image
                        width={70}
                        height={70}
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover bg-primary-dark"
                    />
                </div>
            </div>
            <CardBody className={"text-center"}>
                <div className={"mb-7"}></div>
                <Typography variant="h5" className="mb-2 text-primary-dark">
                    {title}
                </Typography>
                <Typography className="mb-6 font-normal">
                    {subtitle}
                </Typography>
            </CardBody>
        </Card>
    )
}

export default FeatureItem;