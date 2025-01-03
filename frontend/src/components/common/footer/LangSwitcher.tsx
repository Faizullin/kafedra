"use client";

import {memo, useState} from "react";
import {Select, Option} from "@material-tailwind/react";

interface ILanguageItem {
    text:string;
    value:string;
}

const LangSwitcher = memo(() => {
    const languages: ILanguageItem[] = [
        {
            text: "English",
            value: "en",
        },
        {
            text: "Russian",
            value: "ru",
        },
    ];

    const [value, setValue] = useState<string>("en")

    return (
        <div id={"footer-lang-switcher"} className="w-72">
            <Select onChange={(e) => setValue(e!)} value={value}>
                {
                    languages.map((item) => (
                        <Option key={item.value} value={value}>{ item.text }</Option>
                    ))
                }
            </Select>
        </div>
    )
});

LangSwitcher.displayName = "LangSwitcher";

export default LangSwitcher;