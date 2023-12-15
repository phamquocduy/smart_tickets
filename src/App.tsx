import { useState } from "react";
import { toPng } from "html-to-image";

import Form from "./components/Form";
import ImageEditor from "./components/ImageEditor";

export default function Example() {
  const [elements, setElements] = useState([]);

  const handleConvertToImage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    toPng(document.getElementById("canvas-container"), { cacheBust: true })
      .then((dataUrl: string) => {
        const link = document.createElement("a");
        link.download = "ticket.png";
        link.href = dataUrl;
        link.click();
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <main>
      <div className="px-8 py-6 mx-auto max-w-[100rem] grid grid-cols-2 gap-x-8">
        <div className="col-span-1 px-4 py-6 bg-white shadow-sm sm:p-8 ring-1 ring-gray-900/5">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">Cover photo</h2>
          <ImageEditor elements={elements} />
        </div>

        <div className="col-span-1 bg-white shadow-sm ring-1 ring-gray-900/5">
          <Form setElements={setElements} onExportClick={handleConvertToImage} />
        </div>
      </div>
    </main>
  );
}
