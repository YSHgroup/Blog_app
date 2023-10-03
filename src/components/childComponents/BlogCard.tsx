import Image from "next/image";
import { Category } from "@/interfaces";
export default function BlogCard({...props}) {
    const {imageUrl, title, excerpt, categories, categoriesBundle} = props;

    return (
        <figure className="card w-80 rounded-xl p-0 h-96 hover:-translate-y-2 transition-all my-4">
        <div className="w-full relative h-40">
          <Image
            // className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            className="object-cover"
            src={imageUrl}
            alt={imageUrl}
            sizes="100% 100%"
            fill={true}
            priority
          />
        </div>

        <figcaption className="p-4 text-start">
          <ul className="flex gap-4">
            {categories.map((categoryId: number, i: number) => (
              <li key={categoryId} className="text-blue-600 text-xs">{
                categoriesBundle
                .find((item: Category) => item.id === categoryId).name}</li>
            ))}
          </ul>
          <p className="py-2 font-bold">{title}</p>
          <p className="text-sm opacity-75">{excerpt}</p>
        </figcaption>
      </figure>
    )
}