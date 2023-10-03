import Image from "next/image";
import { headers } from "next/headers";
import { Post } from "../interfaces";
import BlogsContainer from "@/components/BlogsContainer";
import SearchForm from "@/components/RelevantForm";
import Pagination from "@/components/Pagination";
import { URLSearchParams } from "url";

type SEARCH_PARAMS = Record<string, string | readonly string[]>;

async function getPosts(searchParams: SEARCH_PARAMS) {
  const headerList = headers();
  const paramsString = new URLSearchParams(searchParams)
  const domain = headerList.get("host") || "";
  const res = await fetch(`http://${domain}/api/posts?${paramsString.toString()}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const getCategories = async () => {
  const headerList = headers();
  const domain = headerList.get("host") || "";
  const res = await fetch(`http://${domain}/api/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export default async function Home({
  searchParams,
}: {
  searchParams: SEARCH_PARAMS;
}) {
  // console.log("searchParams:", searchParams);
  
  const categories = await getCategories();
  const { posts, page, totalPageCount } = await getPosts(searchParams);
  const props = { posts, categories, totalPageCount };
  return (
    <main className="container flex flex-col min-h-screen min-w-min mx-auto p-6 border-x-2 justify-around text-center">
      <SearchForm categories={categories} />
      <Pagination totalCount = {totalPageCount} pageNum = {page}/>
      <BlogsContainer {...props} />
    </main>
  );
}
