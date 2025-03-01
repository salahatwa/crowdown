import { FONT_FAMILY, FontBackgroundColor, FontBackgroundColorUI } from "@ckeditor/ckeditor5-font";
import Adapter from "./ckeditorAdapter";

import Font from '@ckeditor/ckeditor5-font/src/font';

// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// ClassicEditor.builtinPlugins.push(Font);

export const config = {
  toolbar: [
    'undo',
    'redo',
    'insertTable',
    'bold',
    'italic', 'heading', 'fontFamily','fontSize', 'fontColor',
    '|',
    'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
    '|',
    'link', 'uploadImage', 'mediaEmbed', 'blockQuote',
  ],
  language: 'id',

  fontSize: {
    options: [
      9,
      11,
      13,
      'default',
      17,
      19,
      21,
      25,
      30,
    ]
  },
  fontFamily: {
    options: [
      'default',
      'Arial, Helvetica, sans-serif',
      'Courier New, Courier, monospace',
      'Georgia, serif',
      'Lucida Sans Unicode, Lucida Grande, sans-serif',
      'Tahoma, Geneva, sans-serif',
      'Times New Roman, Times, serif',
      'Trebuchet MS, Helvetica, sans-serif',
      'Verdana, Geneva, sans-serif'
    ]
  },
  fontColor: {
    colors: [
      {
        color: 'hsl(0, 0%, 0%)',
        label: 'Black',
      },
      {
        color: 'hsl(0, 75%, 60%)',
        label: 'Red',
      },
      {
        color: 'hsl(120, 75%, 60%)',
        label: 'Green',
      },
      {
        color: 'hsl(240, 75%, 60%)',
        label: 'Blue',
      },
    ],
    columns: 4,
  },
  image: {
    toolbar: [
      'imageTextAlternative',
      'imageStyle:full',
      'imageStyle:side'
    ]
  },
  extraPlugins: [customAdapterPlugin],
  // builtinPlugins: [
  //   // Other default plugins
  //   Font,
  // ]
}

// "uploadImage"

// import Adapter from "./ckeditorAdapter";

// export const config = {
//    extraPlugins: [customAdapterPlugin],
//   language:'id'
// }


export function customAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new Adapter(loader);
  };
}