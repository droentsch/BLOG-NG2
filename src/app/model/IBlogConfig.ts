import { IChapter } from './IChapter';

export interface IBlogConfig {
    blogTitle: string;
    emphasizeFirstWord: boolean;
    blogByline: string;
    chapters: IChapter[];
}
