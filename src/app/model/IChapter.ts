import { IAudioFeed } from "./IAudioFeed";

export interface IChapter {
    chapterName: string;
    title: string;
    pubDate: string;
    contentToken: string;
    number: number;
    audioFeeds?: IAudioFeed[];
}
