import { NextResponse } from "next/server";
import {promises as fs} from "fs";
import path from "path";
import {Post} from "@/interfaces"

export async function GET(request: Request) {
    let blogsPerPage = 3;
    let pageNumber = 1;
    const filePath = path.join(process.cwd(), "public");
    const jsonContent = await fs.readFile(filePath + "/data.json", "utf-8");
    const {posts} = JSON.parse(jsonContent);
    const {searchParams} = new URL(request.url);
    const filterKey = searchParams.get("category");
    const searchIndex = searchParams.get('search');
    pageNumber = Number(searchParams.get('page')?? 1);
    blogsPerPage = parseInt(searchParams.get("count")?? "4");
    // console.log(
    //     "request-->", searchParams,
    //     "search-->",searchIndex,
    //     "sortkey-->", filterKey, 
    //     "page-number:", pageNumber,
    //     "blogs:", blogsPerPage);
    const readiedPosts = posts
        .filter((post: Post) => 
                filterKey !==  ("" || null)? 
                    post.categories.find(item => item.toString() === filterKey)
                    : true)
        .filter((post: Post) =>
            searchIndex !== null?
                    RegExp(`${searchIndex}`, 'i')
                .test(post.title)
                : true);
    const res = readiedPosts.sort((pre: Post, next: Post) => 
            pre.title.localeCompare(next.title))
        .slice((pageNumber - 1) * blogsPerPage, pageNumber * blogsPerPage);
    const totalPageCount = Math.ceil(readiedPosts.length / blogsPerPage);

    return NextResponse.json({posts: res, page: pageNumber, totalPageCount});
}