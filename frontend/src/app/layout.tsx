import type {Metadata} from "next";
import {Lato, Roboto} from "next/font/google";
import {Layout} from "@/components/layout";
import {FixedPlugin} from "@/components/fixed-plugin";

import "./globals.scss";

const roboto = Roboto({
    subsets: ["latin", "cyrillic"],
    weight: ["300", "400", "500", "700", "900"],
    display: "swap",
    variable: "--font-roboto",
});
const lato = Lato({
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
    display: "swap",
    variable: "--font-lato"
});

export const metadata: Metadata = {
    title: "NextJS Tailwind Course Landing Page",
    description:
        "Introducing Tailwind Course Landing Page, a versatile and engaging landing page template designed using Tailwind CSS and Material Tailwind.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            <script
                defer
                data-site="YOUR_DOMAIN_HERE"
                src="https://api.nepcha.com/js/nepcha-analytics.js"
            ></script>
            <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
        </head>
        <body className={`${roboto.variable} ${lato.variable}`}>
        <Layout>
            {children}
            <FixedPlugin/>
        </Layout>
        </body>
        </html>
    );
}
