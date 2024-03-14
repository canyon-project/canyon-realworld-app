import {useEffect, useState} from 'react'
import { codeToHtml } from 'shiki';
const App = (props: any) => {
  const code = `const a=1`
  const [html, setHtml] = useState('');
  useEffect(()=>{
    codeToHtml(code, {
      theme: 'tokyo-night',
      lang: 'js'
    }).then((h) => {
      setHtml(h);
    });
  },)
  return (
    <div>
      <div
        style={{flexGrow: 1, overflow: 'auto'}}
        dangerouslySetInnerHTML={{__html: html}}
      />
    </div>
  )
}

export default App
