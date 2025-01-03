"use client"

// @ts-ignore
import {ComposableMap, Geographies, Geography, Line, Marker, Point} from "react-simple-maps"
import {useCallback, useMemo, useState} from "react";
import {useDebounceCallback} from "usehooks-ts";
import {ChevronRightIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

const IDENTIFIER_FIELD = "name";
const MAP_URL = "/map/home/geo2.json";

interface ICountryZone {
    title: string;
    coords: Point;
    [IDENTIFIER_FIELD]: string;
    markerOffset?: number;
}

const countryZones: ICountryZone[] = [
    {
        title: "Russia",
        coords: [
            37.8169909581523,
            55.656739408787644
            ,],
        [IDENTIFIER_FIELD]: "Russia",
    },
    {
        title: "Ukraine",
        coords: [
            30.470654500730177,
            50.485578559550646,
        ],
        [IDENTIFIER_FIELD]: "Ukraine",
    },
    {
        title: "Slovakia",
        coords: [
            18.36851273469742,
            48.405070065084715
            ,],
        [IDENTIFIER_FIELD]: "Slovakia",
    },
    {
        title: "Hungary",
        coords: [
            19.00052294372972,
            47.49790641707506,
        ],
        [IDENTIFIER_FIELD]: "Hungary",
    },
    {
        title: "Czechia",
        coords: [
            14.443096686029122,
            50.06473225156262,
        ],
        [IDENTIFIER_FIELD]: "Czechia",
    },
    {
        title: "Kazakhstan",
        coords: [
            71.57935000791193,
            51.172554500320985,
        ],
        [IDENTIFIER_FIELD]: "Kazakhstan",
    },
];

interface ICountryZoneConnector {
    from: string;
    to: string;
}

const countryZonesPath: ICountryZoneConnector[] = [
    {
        from: "Kazakhstan",
        to: "Russia",
    },
    {
        from: "Russia",
        to: "Ukraine",
    },
    {
        from: "Ukraine",
        to: "Slovakia",
    },
    {
        from: "Slovakia",
        to: "Czechia",
    },
    {
        from: "Slovakia",
        to: "Hungary",
    },
];


const SupportedZones = () => {
    const countryIdentifiers = useMemo(() => {
        return countryZones.map(item => item[IDENTIFIER_FIELD])
    }, []);
    const lineIdentifiers = useMemo(() => {
        const data: Array<{
            fromCoords: Point;
            toCoords: Point;
        }> = [];
        const zonesDictData: Record<string, ICountryZone> = {}
        countryZones.forEach((item) => {
            zonesDictData[item[IDENTIFIER_FIELD]] = item;
        })
        countryZonesPath.forEach((path) => {
            data.push({
                fromCoords: zonesDictData[path.from]!.coords,
                toCoords: zonesDictData[path.to]!.coords,
            })
        })
        return data;
    }, []);
    const [highlightedCountryIdentifier, setHighlightedCountryIdentifier] = useState<string | null>(null);
    const disableHighlight = useCallback(() => {
        setHighlightedCountryIdentifier(null);
    }, []);
    const debouncedDisableHighlight = useDebounceCallback(disableHighlight, 500);
    const handleCountryZoneHighlight = useCallback((countryZone: ICountryZone | null) => {
        if (countryZone === null) {
            debouncedDisableHighlight();
        } else {
            debouncedDisableHighlight.cancel();
            setHighlightedCountryIdentifier(countryZone[IDENTIFIER_FIELD])
        }
    }, [debouncedDisableHighlight]);
    return (
        <section id={"supported-zones"}>
            <div className={"w-full pt-10 pb-40 relative"}>
                <div className={"container mx-auto"}>
                    <div className={"w-1/2"}>
                        <div className="title-main text-left mt-16 mb-16">
                            <h4 className="title">
                                International
                            </h4>
                            <p className="use-text-subtitle2">
                                Our company spreads to many counties
                            </p>
                        </div>
                        <div className={"mt-20"}>
                            <ul className={"countries-list"}>
                                {
                                    countryZones.map((country, index) => (
                                        <li key={index}
                                            onMouseEnter={() => handleCountryZoneHighlight(country)}
                                            onMouseLeave={() => handleCountryZoneHighlight(null)}
                                            className={`${highlightedCountryIdentifier === country[IDENTIFIER_FIELD] ? "highlighted" : ""}`}
                                        >
                                            <p className={"use-text-subtitle2 text-text-primary"}>{country.title}</p>
                                            <ChevronRightIcon className={"w-8 text-text-primary"}/>
                                        </li>
                                    ))
                                }
                                <Link href={"/zones"} className={"text-text-primary underline"}>View all</Link>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={"w-full sm:w-2/3 xl:w-1/2 absolute top-0 right-0 overflow-hidden pb-20"}>
                    {/*<Image src={"/image/map-vector.png"} alt={"map vector"} width={1747} height={1006}/>*/}
                    <ComposableMap
                        id={"countries-geography-renderer"}
                        projectionConfig={{
                            scale: 600,
                            center: [60, 50],
                            rotate: [0, 0, -15],
                        }}
                        // style={{ width: "100%", height: "auto" }}
                        // projection="geoAzimuthalEqualArea"
                        // projectionConfig={{
                        //     rotate: [-10.0, -52.0, 0],
                        //     center: [-5, -3],
                        //     scale: 1100
                        // }}
                    >
                        <Geographies
                            geography={MAP_URL}>
                            {({geographies}) => {
                                return geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => {
                                            const country = countryZones.find(item => item[IDENTIFIER_FIELD] === geo.properties.name);
                                            handleCountryZoneHighlight(country!);
                                        }}
                                        onMouseLeave={() => handleCountryZoneHighlight(null)}
                                        className={`${countryIdentifiers.includes(geo.properties[IDENTIFIER_FIELD]) ? "selected" : ""} ${highlightedCountryIdentifier === geo.properties[IDENTIFIER_FIELD] ? "highlighted" : ""}`}
                                    />
                                ));
                            }}
                        </Geographies>
                        {countryZones.map(({title, coords, markerOffset,}, index) => (
                            <Marker key={index} coordinates={coords}>
                                <circle r={5} fill="#fff" stroke="#fff" strokeWidth={1}/>
                                {/*<text*/}
                                {/*    textAnchor="middle"*/}
                                {/*    y={markerOffset}*/}
                                {/*    style={{fontFamily: "system-ui", fill: "#5D5A6D"}}*/}
                                {/*>*/}
                                {/*    {title}*/}
                                {/*</text>*/}
                            </Marker>
                        ))}
                        {
                            lineIdentifiers.map((line, index) => (
                                <Line
                                    key={index}
                                    from={line.fromCoords}
                                    to={line.toCoords}
                                    stroke="#FFF"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                />
                            ))
                        }
                    </ComposableMap>
                    <div className={"blur-bg"}></div>
                </div>
            </div>
        </section>
    );
}

export default SupportedZones;