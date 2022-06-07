/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
export declare enum bookmarkStatuses {
    'disabled' = 0,
    'active' = 1
}
export declare enum categories {
    'politics' = 0,
    'general' = 1,
    'sports' = 2
}
export declare class Bookmark {
    name: string;
    url: string;
    category: string;
    user: {};
    status: string;
}
export declare const BookmarkSchema: import("mongoose").Schema<import("mongoose").Document<Bookmark, any, any>, import("mongoose").Model<import("mongoose").Document<Bookmark, any, any>, any, any, any>, {}, {}>;
