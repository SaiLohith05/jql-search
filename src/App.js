import React, { useState } from 'react'
import "./App.css"

const App = () => {
  const [input,setInput]=useState();
  const [output,setOutput]=useState();
  const [theme,setTheme]=useState(false);
  const [showToast, setShowToast] = useState(false);
  

  const handleSubmit=()=>{
    const lines =input.split("\n").map((line)=>line.trim()).filter((line)=>line!=="")
    const ans=lines.map((line)=>'text ~ "' +line+'*" OR');
    
    setOutput("issue in ( "+ans.join("\n").slice(0, -3) +");")
  }

  const handleCopy=()=>{
     navigator.clipboard.writeText(output)
    .then(() => {
     setShowToast(true);
     setTimeout(()=>setShowToast(false),2000)
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
  }

   const handleCloseToast = () => {
    setShowToast(false);
  };



  return (
    <div className={`${"container"} ${theme ? "light" : "dark"}`}>
      <h1>JQL Search</h1>
      <button onClick={()=>setTheme((prev)=> !prev)}>{theme?"dark":"light"}</button>
      <label>Paste text</label>
      <textarea type="text" name="input" value={input} onChange={(e)=>setInput(e.target.value)}>
      </textarea>
      <div>
        <button onClick={handleSubmit}>submit</button>
        <button onClick={handleCopy}>Copy to clipboard</button>
      </div>
      <textarea type="text" name="output" value={output}>
      </textarea>
      {showToast && (
        <div className="toast-overlay">
          <div className="toast-modal">
            <p>Copied to clipboard successfully!</p>
            <button onClick={handleCloseToast}>OK</button>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default App
