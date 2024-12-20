export interface IFilterItemBaseProps {
    // key: TFilterItemKey;
}

export interface IFilterItemRangeTypeProps<T = unknown> extends IFilterItemBaseProps {
    type: "range";
    data: {
        from: T;
        to: T;
    };
}

export interface IFilterItemSelectTypeProps<T = unknown> extends IFilterItemBaseProps {
    type: "select";
    multiple: boolean,
    data: Array<T>;
}

export interface IFilterItemTextTypeProps extends IFilterItemBaseProps {
    type: "text";
    data: string;
}

export type TFilterKeyValueProps<TValue> = {
    filters: TValue;
    pagination?: {
        page: number;
        page_size: number;
    };
};