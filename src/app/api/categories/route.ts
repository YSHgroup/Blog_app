import { NextResponse } from "next/server";
import {promises as fs} from "fs";
import path from "path";

// type Categories = object[];
export async function GET() {
    const filePath = path.join(process.cwd(), "public");
    const jsonContent = await fs.readFile(filePath + "/data.json", "utf-8");
    const dataObject = JSON.parse(jsonContent);
    // const res = JSON.stringify(dataObject.categories)
    return NextResponse.json(dataObject.categories);
}