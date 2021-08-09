import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import Frame from 'react-frame-component';
import Split from 'react-split';
import Editor from '@monaco-editor/react';
import { Resizable } from 're-resizable';
import prettier from 'prettier/standalone';
import parserHTML from 'prettier/parser-html';
import BlockA from '../materials/block/a';
import getThumbnails from '../thumbnails';

import './index.css';

const initailDatas = [
  {
    title: '',
    category: 'block',
    code: prettier.format(ReactDOMServer.renderToStaticMarkup(<BlockA />), {
      semi: false,
      parser: 'html',
      plugins: [parserHTML],
    }),
  },
];

export default function IndexPage() {
  const [size, setSize] = useState({
    width: 500,
    height: 300,
  });

  const [headerVisible, setHeaderVisible] = useState(true);

  const [datas, setDatas] = useState(initailDatas);

  const [index, setIndex] = useState(0);

  const onChange = (code: string) => {
    setDatas(
      datas.map((v, i) => {
        return i === index ? { ...v, code } : v;
      }),
    );
  };

  const onResizeStop = (e, direction, ref, d) => {
    setSize({
      width: size.width + d.width,
      height: size.height + d.height,
    });
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-10 bg-blue-500 absolute top-0 left-0 z-50 flex justify-between items-center px-4">
        <div className="text-xl text-white">Handsome Elements</div>

        <div className="flex items-center">
          <div className="bg-blue-600 pr-2">
            <select className="bg-transparent px-4 text-white rounded-lg border-0 form-select p-0 pl-3.5 pr-[1.875rem] h-9 w-full sm:text-sm font-medium focus:shadow-none focus-visible:ring-2 focus-visible:ring-teal-500">
              <option className="text-gray-900" value="html">
                HTML
              </option>
              <option className="text-gray-900" value="react">
                React
              </option>
              <option className="text-gray-900" value="vue">
                Vue
              </option>
            </select>
          </div>

          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="#fff"
            className="stroke-current cursor-pointer transform group-hover:rotate-[-4deg] transition"
          >
            <path
              d="M12.9975 10.7499L11.7475 10.7499C10.6429 10.7499 9.74747 11.6453 9.74747 12.7499L9.74747 21.2499C9.74747 22.3544 10.6429 23.2499 11.7475 23.2499L20.2475 23.2499C21.352 23.2499 22.2475 22.3544 22.2475 21.2499L22.2475 12.7499C22.2475 11.6453 21.352 10.7499 20.2475 10.7499L18.9975 10.7499"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M17.9975 12.2499L13.9975 12.2499C13.4452 12.2499 12.9975 11.8022 12.9975 11.2499L12.9975 9.74988C12.9975 9.19759 13.4452 8.74988 13.9975 8.74988L17.9975 8.74988C18.5498 8.74988 18.9975 9.19759 18.9975 9.74988L18.9975 11.2499C18.9975 11.8022 18.5498 12.2499 17.9975 12.2499Z"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M13.7475 16.2499L18.2475 16.2499"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M13.7475 19.2499L18.2475 19.2499"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
      <div className="w-full h-screen h-s flex">
        <div className="w-48 bg-gray-200 pt-10 overflow-auto">
          <div className="p-4">
            {Object.entries(getThumbnails()).map(([category, elements], i) => (
              <>
                <div className="text-xl">{category}</div>
                <div>
                  {Array.from(
                    Object.entries(elements),
                    ([componentName, element], i) => (
                      <div className="py-2">
                        {/* <img
                        className="w-full rounded shadow-lg"
                        src="/assets/block.svg"
                      /> */}
                        {element}
                      </div>
                    ),
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
        <Split className="w-full split pt-10" minSize={[500, 400]}>
          <div className="flex justify-center items-center bg-gray-100 relative overflow-auto">
            <div className="absolute top-0 left-0 w-full flex justify-center items-center py-2">
              <input
                className="w-12 h-6 text-center border-0"
                value={size.width}
              />
              <span className="px-2">x</span>
              <input
                className="w-12 h-6 text-center border-0"
                value={size.height}
              />
            </div>
            <Resizable
              className="bg-white border-solid border border-transparent hover:border-blue-400 hover:shadow-lg overflow-hidden"
              size={size}
              onResizeStop={onResizeStop}
            >
              {headerVisible && (
                <div className="py-2 px-4 border-0 border-solid border-b border-gray-100 font-bold">
                  Handsome Elements
                </div>
              )}
              <Frame
                className="w-full h-full border-0 overflow-hidden"
                head={
                  <>
                    <style>{`
                      body{ overflow: hidden }`}</style>
                  </>
                }
              >
                <div dangerouslySetInnerHTML={{ __html: datas[index].code }} />
              </Frame>
            </Resizable>
          </div>
          <Editor
            height="90vh"
            defaultLanguage="html"
            defaultValue={datas[index].code}
            onChange={onChange}
          />
        </Split>
      </div>
    </div>
  );
}
