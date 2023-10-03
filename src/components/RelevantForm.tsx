"use client";
import { debounced } from "@/app/utils/debounce";
import { useSearchParamsHandler } from "@/hooks/paramsSetter";
import { Category } from "@/interfaces";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import _ from "lodash";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface RelevantFormProps {
  categories: Category[];
  defaultSearch?: string;
  defaultCategory?: string;
}
const RelevantForm: React.FC<RelevantFormProps> = ({
  categories,
  defaultCategory = "",
  defaultSearch = "",
}) => {
  const router = useRouter();
  const [search, setSearch] = useLocalStorage("search", "");
  const searchParamsHandler = useSearchParamsHandler();

  const handleSearchChange = (value: string) => {
    setSearch(value);
    searchFunc(value);
  };
  const handleCategoryChange = (value: string) => {
    const categoryId = categories.find(({ id, name }) => name === value)?.id
    categoryHandle(categoryId !== undefined ? categoryId.toString(): "");
  };
  const searchFunc = _.debounce((value) => {
    router.push(`?${searchParamsHandler({ search: value, page: false })}`), 200;
  });
  const categoryHandle = (value: string) => {
    router.push(`?${searchParamsHandler({ category: value, page: false })}`);
  };
  //   const searchFun = (value: string) => {
  //       setSearch(value);
  //       router.push(`?search=${search}`)
  //   }
  //   _.debounce(searchFun,200);
  //   debounced()(searchFun, 200);
  return (
    <div className="flex justify-center">
      <div className="h-10 flex flex-wrap justify-center max-sm:flex-col max-sm:h-fit sm:w-3/4">
        <label
          className="max-sm:w-full max-sm:rounded-t-md leading-10 px-2 bg-sky-500 text-white sm:rounded-l-md"
          htmlFor="search"
        >
          Search:{" "}
        </label>
        <input
          className="h-full max-sm:h-10 sm:w-1/2 sm:border-r max-sm:border-b border-gray-400 max-sm:w-full px-2"
          type="text"
          id="search"
          placeholder="Search by Title..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleSearchChange(e.target.value)
          }
        />
        <select
          className="h-full max-sm:h-10 w-32 sm:rounded-r-md max-sm:w-full max-sm:rounded-b-md"
          name="categories"
          id="categories"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleCategoryChange(e.target.value)
          }
        >
          <option value="">All</option>
          {categories
            .sort((pre: Category, next: Category) =>
              pre.name.localeCompare(next.name)
            )
            .map((opt) => (
              <option key={opt.name}>{opt.name}</option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default RelevantForm;
