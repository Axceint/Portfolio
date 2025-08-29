"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Landing() {
    const [count, setCount] = useState(0);
    const router = useRouter()

    const handleClick = () => {
        const newCount = count + 1;
        setCount(newCount);
        if (newCount >= 15) {
            router.push("/black")
        }
    }


  return (
    <>
      <div className="font-mono h-screen w-screen border-2 flex items-center justify-center bg-radial-[at_50%_10%] from-black to-purple-900 to-200% overflow-hidden" onClick={handleClick}>
        <div className="flex p bg-conic-[at_50%_-10%] from-indigo-600 to-pink-700 items-center justify-center border-2 h-[80%] w-[80%] rounded-2xl">
          <div className="flex items-center justify-ceter flex-col h-[98.5%] w-[99.5%] bg-radial-[at_50%_50%] from-[#e3dac9] to-fuchsia-900 to-200% rounded-2xl ">
            <div className=" h-3/5 w-[100%] flex flex-row justify-between">
              <div className="p-2">
                <div className="text-[3rem]">
                  curiosity killed the cat but the satisfaction bought it back
                </div>
                <div className="text-[1rem]">someone who i agree with</div>
              </div>
              <div className=" w-[30%]">
                <img src="vercel.svg" alt="" className="h-fill" />
              </div>
            </div>

            <div className=" w-[100%] h-2/5">
              <div className="text-[7rem]">Hi!!</div>
              <div className="text-[5rem]">I am axce</div>
            </div>
          </div>
        </div>
      </div>
      {/* <img src="favicon.ico" alt="" className='absolute left-0 bottom-0'/>  */}
    </>
  );
}

export default Landing;
