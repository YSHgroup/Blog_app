"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSearchParamsHandler } from "@/hooks/paramsSetter";

export default function Pagination({
  pageNum,
  totalCount,
}: {
  pageNum: number;
  totalCount: number;
}) {
  const disabledBtn = "bg-gray-400 hover:opacity-30 hover:cursor-not-allowed ";
  const activeBtn = "bg-sky-400 ";
  const clsAlias = "text-white font-bold p-1  cursor-pointer hover:bg-rose-500";

  const router = useRouter();
  const searchParamsHandler = useSearchParamsHandler();

  const paginationHandle = useCallback((() => {
    let value = pageNum;
    return (parameter: number | Function) => {
      if (typeof parameter === "number") {
        value = parameter;
      } else if (typeof parameter === "function") {
          // console.log("page-state--->", value);
        value = parameter(value);
      }
      router.push(`?${searchParamsHandler({ page: value })}`);
    };
  })(),[pageNum]);
  return (
    <ul className="grid grid-cols-5 w-1/2 max-sm:w-full self-center my-2">
      <li
        className={`${
          pageNum <= 1 ? disabledBtn : activeBtn
        }${clsAlias} border-r border-white rounded-l-md`}
        onClick={() => pageNum > 1 && paginationHandle(1)}
      >
        First
      </li>
      <li
        className={`${pageNum <= 1 ? disabledBtn : activeBtn}${clsAlias}`}
        onClick={() =>
          pageNum > 1 && paginationHandle((pre: number) => pre - 1)
        }
      >
        {"<"}
      </li>
      <li className=" leading-8">{pageNum} / {totalCount}</li>
      <li
        className={`${
          pageNum >= totalCount ? disabledBtn : activeBtn
        }${clsAlias}`}
        onClick={() =>
          pageNum < totalCount && paginationHandle((pre: number) => pre + 1)
        }
      >
        {">"}
      </li>
      <li
        className={`${
          pageNum >= totalCount ? disabledBtn : activeBtn
        }${clsAlias} border-l border-white rounded-r-md`}
        onClick={() => pageNum < totalCount && paginationHandle(totalCount)}
      >
        Last
      </li>
    </ul>
  );
}
