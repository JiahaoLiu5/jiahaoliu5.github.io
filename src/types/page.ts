export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardItem {
    id?: string;
    title: string;
    subtitle?: string;
    title_keep_together?: string;
    authors?: string;
    highlight_author?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
    image_alt?: string;
    status?: 'published' | 'under-review';
    authorship?: 'first' | 'co-first' | 'contributor';
    doi?: string;
    abstract?: string;
    abstract_url?: string;
    bibtex?: string;
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    layout?: 'research';
    items: CardItem[];
}
