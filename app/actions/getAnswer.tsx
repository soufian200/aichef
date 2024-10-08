'use server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getAnswer(q:string,apikey:string){
    // console.log(process.env.API_KEY);

    const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const result = await model.generateContent([q]);
return result.response.text();

}