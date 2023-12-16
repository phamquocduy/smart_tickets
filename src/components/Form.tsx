/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef } from "react";
import { NumericFormat } from "react-number-format";

import TinyEditor, { TinyEditorMethods } from "./TinyEditor";

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setElements: (elements: any) => void;
  onExportHTMLClick: () => void;
  onExportToImageClick: () => void;
}

export default function Form({ setElements, onExportHTMLClick, onExportToImageClick }: FormProps) {
  const nameRef = useRef<TinyEditorMethods>(null);
  const nameXRef = useRef();
  const nameYRef = useRef();

  const companyRef = useRef<TinyEditorMethods>(null);
  const companyXRef = useRef();
  const companyYRef = useRef();

  const handleApplyClick = () => {
    const name = nameRef.current?.getContent();
    // @ts-ignore
    const nameX = nameXRef.current?.value;
    // @ts-ignore
    const nameY = nameYRef.current?.value;

    const company = companyRef.current?.getContent();
    // @ts-ignore
    const companyX = companyXRef.current?.value;
    // @ts-ignore
    const companyY = companyYRef.current?.value;

    setElements([
      {
        id: "name",
        text: name,
        x: nameX,
        y: nameY,
      },
      {
        id: "company",
        text: company,
        x: companyX,
        y: companyY,
      },
    ]);
  };

  return (
    <div>
      <div className="flex flex-col gap-16 p-8">
        <div className="">
          <label htmlFor="name" className="block text-lg font-semibold leading-6 text-gray-900">
            Name
          </label>
          <div id="name" className="mt-2">
            <TinyEditor
              ref={nameRef}
              initialValue={`<p><span style="color: rgb(22, 145, 121); background-color: rgb(241, 196, 15);"><strong>Mr. Adam</strong></span></p>`}
            />
          </div>

          <div className="flex flex-row justify-start gap-6 mt-4">
            <div>
              <label htmlFor="x-coordinate" className="block text-sm font-medium leading-6 text-gray-900">
                X-coordinate (1 - 1000)
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <NumericFormat
                  id="x-coordinate"
                  getInputRef={nameXRef}
                  defaultValue={130}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return floatValue ? floatValue > 0 && floatValue <= 1000 : false;
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm" id="x-coordinate-pixel">
                    px
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="y-coordinate" className="block text-sm font-medium leading-6 text-gray-900">
                Y-coordinate (1 - 1000)
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <NumericFormat
                  id="y-coordinate"
                  getInputRef={nameYRef}
                  defaultValue={240}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return floatValue ? floatValue > 0 && floatValue <= 1000 : false;
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm" id="y-coordinate-pixel">
                    px
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <label htmlFor="companyName" className="block text-lg font-semibold leading-6 text-gray-900">
            Company name
          </label>
          <div id="companyName" className="mt-2">
            <TinyEditor
              ref={companyRef}
              initialValue={`<p><span style="text-decoration: underline;"><em>Company ABC</em></span></p>`}
            />
          </div>

          <div className="flex flex-row justify-start gap-6 mt-4">
            <div>
              <label htmlFor="x-coordinate" className="block text-sm font-medium leading-6 text-gray-900">
                X-coordinate (1 - 1000)
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <NumericFormat
                  id="x-coordinate"
                  getInputRef={companyXRef}
                  defaultValue={130}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return floatValue ? floatValue > 0 && floatValue <= 1000 : false;
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm" id="x-coordinate-pixel">
                    px
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="y-coordinate" className="block text-sm font-medium leading-6 text-gray-900">
                Y-coordinate (1 - 1000)
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <NumericFormat
                  id="y-coordinate"
                  getInputRef={companyYRef}
                  defaultValue={325}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return floatValue ? floatValue > 0 && floatValue <= 1000 : false;
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm" id="y-coordinate-pixel">
                    px
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-4 border-t gap-x-6 border-gray-900/10 sm:px-8">
        <button
          type="button"
          className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleApplyClick}
        >
          Apply to image
        </button>

        <div className="flex gap-4">
          <button
            type="button"
            className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onExportHTMLClick}
          >
            Export HTML
          </button>

          <button
            type="button"
            className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onExportToImageClick}
          >
            Export to PNG image
          </button>
        </div>
      </div>
    </div>
  );
}
