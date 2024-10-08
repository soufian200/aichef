"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { getAnswer } from "./actions/getAnswer";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

interface IChat{
  role: string,
      color: string,
      content: string
}
export default function Home() {
  

  const [loading,setLoading] = useState(false);
  const [msg,setMsg] = useState("")
    const [chat,setChat] = useState<IChat[]>([
    
  ])

  const handleSendingMsg =async ()=>{
    if(loading) return;
    setLoading(true);
    setChat([...chat,  {
      role: "User",
      color: "bg-sky-400",
      content: msg
    }]);
    console.log(chat);

    // clean msg input
    setMsg("");

    // TODO: MAKE AN API REQUEST

    const res = await getAnswer(msg);
    // console.log(r);
    setChat((prevChat) => [...prevChat,  {
      role: "Chef",
      color: "bg-green-400",
      content: res
    }]);
    console.log(chat);

    // 
    setLoading(false)
  }
  const bottomRef = useRef(null);

  // Function to scroll to the bottom of the page
  const scrollToBottom = () => {
    (bottomRef.current as any).scrollIntoView({ behavior: "smooth" });
  };

  useEffect(()=>{
    scrollToBottom();
  },[chat])

  return (
    <div className=" ">
      <div className=" w-full flex justify-center py-3">
      <h1 className="font-bold text-xl bg-white px-2 rounded-lg">AI <span className="text-green-400">Chef</span></h1>
      </div>

      <div className="bg-red-40 w-1/2 mx-auto">
       {
        chat.map((chat,index)=> <div key={index} className="bg-gray-50 rounded-xl p-2 my-2">
          <div className="flex items-center">
        <div className={` ${chat.color} w-4 h-4 rounded-full flex items-center justify-center`}></div>
            <p className="font-bold ml-2 text-sm">{chat.role}</p>
            </div>
            <ReactMarkdown className="mt-2" children={chat.content} rehypePlugins={[rehypeRaw as any]} />
        {/* <p className="mt-2">
          {
            chat.content
          }
        </p> */}
      </div>)
       }
       {loading&&<p>Loading...</p>}
          <div ref={bottomRef} style={{ paddingTop: "20px" }}>
        {/* <h2>You have reached the bottom!</h2> */}
      </div>
      
      </div>
      <div className="bg-red-40 sticky w-full p-2 bottom-0">
       <div className="flex justify-center ">

       <div className="bg-white rounded-xl w-1/2 overflow-hidden">
       <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="write you text here" className="bg-white outline-0 w-full p-2" />
       </div>
        <button
        onClick={handleSendingMsg}
        className="bg-green-500 ml-2 rounded-xl text-white px-2">
          Send
        </button>
       </div>
       </div>
    </div>
  );
}
