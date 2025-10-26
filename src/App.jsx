import { Home, Layout } from "lucide-react"
import Dashboard from "./pages/Dashboard"
import { Routes } from "react-router-dom"
import ResumeBuilder from "./pages/ResumeBuilder"
import { Route } from "react-router-dom"
import Preview from "./pages/Preview"
import Login from "./pages/Login"


function App() {
 

  return (
    <>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='app' element={<Layout/>  }>
      <Route index element={<Dashboard/>}/>
      <Route path='builder/:resumeId' element={<ResumeBuilder/>}/>
    </Route>
    <Route>
    <Route path='view/:resumeId' element={<Preview/>}/>
      <Route path='login' element={<Login/>}/>
    </Route>
   </Routes>
    </>
  )
}

export default App
