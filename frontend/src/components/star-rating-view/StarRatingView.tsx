import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {StarIcon} from "@heroicons/react/24/solid";
import "./StarRatingView.scss";

interface StarRatingViewProps {
    value: number,
    starCount?: number,
    editable?: boolean;
}

const StarRatingView: FC<StarRatingViewProps> = memo(
    ({
         value,
         starCount = 5,
         editable,
     }) => {
        const data = useMemo(() => {
            const intValue = Math.round(value);
            const arr: Array<{
                active: boolean;
                index: number;
            }> = [];
            for (let i = 0; i < intValue; i++) {
                arr.push({
                    active: true,
                    index: i,
                })
            }
            for (let i = intValue; i < starCount; i++) {
                arr.push({
                    active: false,
                    index: i,
                })
            }
            return arr;
        }, [value, starCount]);
        const [currentEditableValue, setCurrentEditableValue] = useState<number | null>(null)
        const handleMouseEnter = useCallback((val: number) => {
            if (editable) {
                setCurrentEditableValue(val);
            }
        }, [editable])
        const handleMouseLeave = useCallback(() => {
            if (editable) {
                setCurrentEditableValue(null);
            }
        }, [editable])
        return (
            <div className={"star-rating-view inline-flex items-center gap-x-1"}>
                {
                    data.map((item) => {
                        const editableHighlighted = (editable && currentEditableValue && (
                            item.index <= currentEditableValue
                        ));
                        return (
                            <a
                                key={item.index}
                                className={`star-icon ${item.active ? "selected" : ""} ${editable ? "editable" : ""} ${editableHighlighted ? "editable-highlighted" : ""}`}
                                onMouseEnter={() => handleMouseEnter(item.index)}
                                onMouseLeave={() => handleMouseLeave()}>
                                <StarIcon/>
                            </a>
                        );
                    })
                }
            </div>
        );
    });

StarRatingView.displayName = 'StarRatingView';

export default StarRatingView;