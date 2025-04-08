"use client";

import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconsButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

type Shape="circle"| "rect" |"pencil" 
export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool,setSelectedTool]=useState<Shape>("circle")

  useEffect(()=>{
    // @ts-ignore
    window.selectedTool=selectedTool
  },[selectedTool])

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
}

function TopBar({selectedTool,setSelectedTool}:{
  selectedTool:Shape,
  setSelectedTool:( s:Shape )=>void
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
      }}
    >
      <div className="flex gap-2 ">
        <IconButton onClick={()=>{
          setSelectedTool("pencil")
        }}
         activated={selectedTool==="pencil"}  
         icon={<Pencil />}></IconButton>
        <IconButton onClick={() => {
          setSelectedTool("rect")
          }}
          activated={selectedTool==="rect"}
          icon={<RectangleHorizontalIcon />}
          
        ></IconButton>
        <IconButton onClick={() => {
          setSelectedTool("circle")
        }}
        activated={selectedTool==="circle"}
        icon={<Circle />} 
        ></IconButton>
      </div>
    </div>
  );
}
