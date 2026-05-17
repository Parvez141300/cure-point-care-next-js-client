export interface INavItems {
    title: string;
    href: string;
    icon: string;
}

export interface INavSections {
    title?: string;
    items: INavItems[];
}