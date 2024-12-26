export interface IFile {
    name: string;
    path?: string;
    size?: number;
    url: string;
    alt: string;
}

export interface IImageFile extends IFile {
    width?: number;
    height?: number;
}