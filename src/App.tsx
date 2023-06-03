import React, { useEffect, useState } from "react";
import { fabric } from "fabric"; // this also installed on your project
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./App.css";
import default_bg from './assets/defaultbg.avif';
import { addImage, onAddCircle, onAddRectangle, onAddText, onDeleteAll, onDeleteSelected } from "./components/fabricHooks";

import { BsCircle, BsChatLeftText, BsFillImageFill } from 'react-icons/bs'
import { BiRectangle } from 'react-icons/bi'
import { TbRectangleFilled } from 'react-icons/tb'
import { RxReset } from 'react-icons/rx'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdAdd } from 'react-icons/md'
import { GoDesktopDownload } from 'react-icons/go'

// const DEFAULT_IMAGE = "example.jpg";

export default function App() {
  const [backgroundImage, setBackgroundImage] = useState<any>(null);
  const [objectImage, setObjectImage] = useState<any>(null);
  const [text, setText] = useState<any>("");
  const [showTextField, setShowTextField] = useState<boolean>(false)
  const [showUploadField, setShowUploadField] = useState<boolean>(false)

  const { selectedObjects, editor, onReady } = useFabricJSEditor();

  // useEffect(() => {
  //   setBackgroundImage(default_bg);
  //   console.log(backgroundImage)
  // }, [backgroundImage])

  console.log("IUIMAGEINF: ", backgroundImage)
  const _onReady = (canvas: any) => {
    let DEFAULT_IMAGE = backgroundImage
    fabric.Image.fromURL(DEFAULT_IMAGE, (img) => {
      console.log("editor canvas: ", canvas);
      console.log("editor image: ", img);

      canvas.set("backgroundImage", img);
      canvas.renderAll();
      onReady(canvas);
    });
  };

  function download() {
    if (editor) {
      const canvas = editor?.canvas;
      if (canvas) {
        // Convert canvas to data URL
        const dataURL = canvas.toDataURL({
          format: "png",
          multiplier: 2, // Increase multiplier for higher resolution
        });

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "canvas.png";

        // Simulate a click event to trigger the download
        link.click();
      }
    }
  }

  return (
    <div className="w-fit mx-auto">
      <div className="flex justify-start items-start">
        <div className="flex flex-col gap-y-3 text-3xl p-3">
          <button
            className="border border-zinc-200 rounded-lg p-2 w-fit hover:bg-cyan-50 hover:text-cyan-500 hover:border-cyan-500 transition-all"
            onClick={() => onAddCircle(editor)}>
            <BsCircle />
          </button>
          <button
            className="border border-zinc-200 rounded-lg p-2 w-fit hover:bg-cyan-50 hover:text-cyan-500 hover:border-cyan-500 transition-all"
            onClick={() =>
              onAddRectangle(editor)}>
            <BiRectangle />
          </button>

          {/* add text  */}
          <div className="relative">
            <button
              onClick={() => setShowTextField(!showTextField && true)}
              className=" border border-zinc-200 rounded-lg p-2 w-fit hover:bg-cyan-50 hover:text-cyan-500 hover:border-cyan-500 transition-all"
            >
              <BsChatLeftText />
            </button>
            {showTextField &&
              <fieldset className="absolute z-10 top-0 -right-[14rem] flex justify-start items-center gap-x-1">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-1.5 "
                  name={`text`}
                  type={`text`}
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
                <button
                  className="border border-zinc-200 rounded-full p-2 w-fit hover:bg-cyan-50 hover:text-cyan-500 hover:border-cyan-500 transition-all"
                  onClick={() => onAddText(editor, text, setText, setShowTextField)}>
                  <MdAdd />
                </button>
              </fieldset>
            }
          </div>
          {/* add image  */}
          <div className="relative">
            <button
              className="border border-zinc-200 rounded-lg p-2 w-fit hover:bg-cyan-50 hover:text-cyan-500 hover:border-cyan-500 transition-all"
              onClick={() => setShowUploadField(prev => !prev)}>
              <BsFillImageFill />
            </button>
            {showUploadField &&
              <fieldset className="absolute z-10 top-0 -right-[21rem] flex justify-start items-center gap-x-1">
                <input
                  className="text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
                  type="file"
                  onChange={(event) => { if (event.target.files) setObjectImage(event.target.files[0]) }}
                />
                <button
                  className="border border-zinc-200 rounded-full p-2 w-fit hover:bg-cyan-50 hover:text-cyan-500 hover:border-cyan-500 transition-all"
                  onClick={() => addImage(fabric, editor, objectImage, setShowUploadField)}>
                  <MdAdd />
                </button>
              </fieldset>
            }
          </div>
          {/* revert changes */}
          <button
            className="border border-zinc-200 rounded-lg p-2 w-fit hover:bg-cyan-50 hover:text-cyan-500 hover:border-cyan-500 transition-all"
            onClick={() => onDeleteAll(editor, setText)}>
            <RxReset />
          </button>

          {/* Delete selected  */}
          <button
            className="border border-red-200 text-red-500 rounded-lg p-2 w-fit hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-all"
            onClick={() => onDeleteSelected(editor)}>
            <RiDeleteBin5Line />
          </button>
          {/* download  */}
          <button
            className="border border-green-200 rounded-lg p-2 w-fit text-green-500 hover:bg-green-50 hover:text-green-500 hover:green-cyan-500 transition-all"
            onClick={download}
          >
            <GoDesktopDownload />
          </button>
        </div>
        <div className=" border border-zinc-200 rounded-lg">
          <FabricJSCanvas className="h-[30rem] w-[70rem]" onReady={_onReady} />
        </div>

      </div>
    </div>
  );
}
