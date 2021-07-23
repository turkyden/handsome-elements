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
        <span className="text-xl text-white">Handsome Elements</span>
      </div>
      <div className="w-full h-screen h-s flex">
        <div className="w-48 bg-gray-200 pt-10 overflow-auto">
          <div className="p-4">
            {Object.entries(getThumbnails()).map(([category, elements], i) => (
              <>
                <div className="text-xl">{category}</div>
                <div>
                  {Array.from(new Array(2), (v, i) => (
                    <div className="py-2">
                      <img
                        className="w-full rounded shadow-lg"
                        src="https://jdc.jd.com/img/160x80?text=%20"
                      />
                    </div>
                  ))}
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
                    <link
                      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css"
                      rel="stylesheet"
                    />
                    <style>{`body{ overflow: hidden }`}</style>
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
