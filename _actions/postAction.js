"use server";

import PostModal from "../models/postModel";
import dbConnect from "../app/lib/mongodb";

export async function getPost() {
  try {
    await dbConnect();

    return { msg: "Get" };
  } catch (error) {
    return { errMsg: error.message };
  }
}
