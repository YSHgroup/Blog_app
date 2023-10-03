import BlogCard from "./childComponents/BlogCard";
import { Category, Post } from "@/interfaces";

export default function BlogsContainer({ ...props }) {
  const { posts, categories, totalPageCount } = props;
  // console.log("props-->", props.posts);
  return (
    <section className="flex flex-col">
      <h1 className="text-4xl">From the blog</h1>
      <p className="my-3 w-3/5  self-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit minus
        quia similique ipsum velit possimus reiciendis!
      </p>
      <div className="flex flex-wrap gap-x-2 justify-around">
        {posts.map((blog: Post) => (
          <BlogCard {...blog} categoriesBundle = {categories}/>
        ))}
      </div>

    </section>
  );
}
