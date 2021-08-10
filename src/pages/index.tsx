import { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import Frame from 'react-frame-component';
import Split from 'react-split';
import Editor from '@monaco-editor/react';
import { Resizable } from 're-resizable';
import prettier from 'prettier/standalone';
import parserHTML from 'prettier/parser-html';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSessionStorageState } from 'ahooks';
import { useHotkeys } from 'react-hotkeys-hook';
import { Modal, message } from 'antd';
import getThumbnails from '@/thumbnails';
import getMaterials from '@/materials';

import 'antd/dist/antd.css';
import './index.css';
import 'pattern.css/dist/pattern.css';

const getCode = (category: string, componentName: string): string => {
  return prettier.format(
    ReactDOMServer.renderToStaticMarkup(
      getMaterials()[category][componentName],
    ),
    {
      semi: false,
      parser: 'html',
      plugins: [parserHTML],
    },
  );
};

export default function IndexPage() {
  const [size, setSize] = useState({
    width: 500,
    height: 300,
  });

  const [headerVisible, setHeaderVisible] = useState(true);

  const [category, setCategory] = useState('Block');

  const [componentName, setComponentName] = useState('BlockA');

  const [code, setCode] = useState(getCode(category, componentName));

  const [donation, setDonation] = useSessionStorageState('user-message', '0');

  useHotkeys('up', () => {
    message.success('Up');
  });

  useHotkeys('down', () => {
    message.success('Down');
  });

  const onChange = (code: string) => setCode(code);

  const onResizeStop = (e, direction, ref, d) => {
    setSize({
      width: size.width + d.width,
      height: size.height + d.height,
    });
  };

  const onClick = (category, componentName) => {
    setCategory(category);
    setComponentName(componentName);
    setCode(getCode(category, componentName));
  };

  const onCopy = (e: Event) => {
    if (donation !== '1') {
      Modal.info({
        title: '🎉 有你支持，我们会做的更好！',
        icon: null,
        content: (
          <div className="">
            <div className="pt-6"># 方式 1</div>
            <div className="px-4 text-gray-500 py-2 flex items-center contents-center">
              <a
                href="https://github.com/Turkyden/handsome-elements"
                target="_blank"
              >
                <img
                  className=""
                  alt="GitHub Repo stars"
                  src="https://img.shields.io/github/stars/Turkyden/handsome-elements?style=social"
                />
              </a>
              <div className="pl-4">帮忙点个 Star ⭐</div>
            </div>
            <div className="pt-6"># 方式 2</div>
            <img
              className="w-48"
              src="https://watermark-pro.vercel.app/static/wechat.22a540b9.png"
            />
          </div>
        ),
        okText: '下次再说',
        maskClosable: true,
      });
      setDonation('1');
    } else {
      message.success('Copyed !');
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-10 bg-blue-500 absolute top-0 left-0 z-50 flex justify-between items-center px-4 shadow">
        <div className="text-xl text-white font-mono">💠 Handsome Elements</div>

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

          <CopyToClipboard text={code} onCopy={onCopy}>
            <div id="copy_to_clipboard">
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
          </CopyToClipboard>
        </div>
      </div>
      <div className="w-full h-screen h-s flex">
        <div className="w-48 bg-gray-200 pt-10 overflow-auto">
          <div className="p-4">
            {Object.entries(getThumbnails()).map(([category, elements], i) => (
              <>
                <div className="text-xl">{category}</div>
                <div className="shadow-xl rounded">
                  {Array.from(Object.entries(elements), ([com, element], i) => (
                    <div
                      className="my-2 rounded relative cursor-pointer"
                      onClick={onClick.bind(this, category, com)}
                    >
                      {element}
                      {componentName === com && (
                        <div className="absolute rounded border-blue-400 border-solid border-2 top-0 left-0 w-full h-full bg-blue-100 bg-opacity-25" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
        <Split className="w-full split pt-10 " minSize={[500, 400]}>
          <div className="flex justify-center items-center bg-gray-100 relative overflow-auto | pattern-checks-sm text-gray-300">
            <div className="absolute top-0 left-0 w-full flex justify-center items-center py-2 text-gray-500">
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
                <div className="py-2 px-4 border-0 border-solid border-b border-gray-100 font-bold text-gray-700">
                  Handsome Elements
                </div>
              )}
              <Frame
                className="w-full h-full border-0 overflow-hidden"
                head={
                  <>
                    {/* <link
                      rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css"
                    />*/}
                    <style>{`body{ font-size: 12px }`}</style>
                  </>
                }
              >
                <div dangerouslySetInnerHTML={{ __html: code }} />
              </Frame>
            </Resizable>
          </div>
          <Editor
            height="90vh"
            defaultLanguage="html"
            value={code}
            onChange={onChange}
            onMount={(editor, monaco) => {
              console.log(editor, monaco);
              editor.addCommand(
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_C,
                () => {
                  document.querySelector('#copy_to_clipboard')?.click();
                },
              );
              editor.onContextMenu((e, a) => {
                console.log(e, a);
              });
            }}
          />
        </Split>
      </div>
    </div>
  );
}
