/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ImageEditor.js
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PhotoIcon } from "@heroicons/react/20/solid";
import Modal from "./Modal";

interface ImageEditorProps {
  elements: any;
}

const ImageEditor = ({ elements }: ImageEditorProps) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (elements.length > 0 && image == null) {
      setOpen(true);
    }
  }, [elements, image]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleResetClick = () => {
    setImage(null);
  };

  return (
    <div className="flex flex-col justify-between h-full py-4">
      <div className="col-span-full">
        {!image && (
          <div
            className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25"
            {...getRootProps()}
          >
            <div className="text-center">
              <PhotoIcon className="w-12 h-12 mx-auto text-gray-300" aria-hidden="true" />
              <div className="flex mt-4 text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" {...getInputProps()} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        )}
      </div>

      {image && (
        <div>
          <div className="relative" id="canvas-container">
            <img className="max-w-full" src={image} alt="Uploaded" />

            {/* render added HTML elements */}
            {elements.map((element: any) => (
              <div
                key={element.id}
                style={{ position: "absolute", top: `${element.y}px`, left: `${element.x}px` }}
                dangerouslySetInnerHTML={{ __html: element.text }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {image && (
        <div>
          <button
            type="button"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handleResetClick}
          >
            Reset image
          </button>
        </div>
      )}

      <Modal open={open} setOpen={setOpen} />
    </div>
  );
};

export default ImageEditor;
