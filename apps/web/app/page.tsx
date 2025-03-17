"use client"
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter();
  const [roomId,setRoomId]=useState("");
  return <div style={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    width:"100vw"
  }}>
    <div>
    <input style={{
      padding:10
    }} value={roomId} onChange={(e)=>{
      setRoomId(e.target.value)
    }} type="text" placeholder="Room id" />

    <button style={{
      padding:10
    }} onClick={()=>{
      router.push(`/room/${roomId}`)
    }} > Join room </button>
    </div>
  </div>
}
