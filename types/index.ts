export interface Drama {
    bookId: string;
    title: string;
    cover: string;
    vertical_cover?: string;
    author?: string; // Not seen in sample
    category?: string; // Use first tag
    tags?: string[];
    intro?: string;
    score?: string; // Using hotCode as score/popularity since no rating found
    status?: string; // Derive from chapterCount?
    total_episodes?: number;
}

export interface Episode {
    name: string;
    url: string;
}

// Raw API types
export interface APIDrama {
    bookId: string;
    bookName: string;
    coverWap: string;
    introduction: string;
    tags?: string[];
    chapterCount?: number;
    rankVo?: {
        hotCode: string;
    }
}
