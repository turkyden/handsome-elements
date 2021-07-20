import Split from 'react-split';
import Editor from '@monaco-editor/react';
import './index.css';

export default function IndexPage() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-10 bg-indigo-500 absolute top-0 left-0 z-50 flex justify-between items-center px-4">
        <span className="text-xl text-white">Tailwind Elements</span>
      </div>
      <div className="w-full h-screen h-s flex">
        <div className="w-64 bg-gray-100 pt-10">Materials</div>
        <Split className="w-full split pt-10" minSize={[500, 400]}>
          <div>Preview</div>
          <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="// some comment code"
          />
        </Split>
      </div>
    </div>
  );
}
