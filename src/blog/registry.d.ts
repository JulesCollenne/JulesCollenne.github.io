import type { ComponentType } from "react";
export type PostMeta = {
    slug?: string;
    title: string;
    date: string;
    summary?: string;
    tags?: string[];
    cover?: string;
};
export type PostModule = {
    default: ComponentType<any>;
    frontmatter: PostMeta;
};
export type PostItem = {
    slug: string;
    title: string;
    date: string;
    summary?: string;
    tags?: string[];
    cover?: string;
    Component: ComponentType<any>;
};
export declare const posts: PostItem[];
