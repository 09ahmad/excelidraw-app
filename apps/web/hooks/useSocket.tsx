import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading,setLoading]=useState(true);
    const [socket,setSocket]=useState<WebSocket>();
    
    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjM1MWM0MC0wODE0LTQ3MDAtYTRhZC03NDBlMDEyYTZmMTYiLCJpYXQiOjE3NDIxNjA2NTR9.PU8zHFOR5YGsOmkyVaO9xf6LHcw8LP55sqeNVeSFeEE`)
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws)
        }
    },[]);
    return {
        socket,
        loading
    }
}