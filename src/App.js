// related to router setup 
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// imporing Scences
import {RootLayout, ChatBoard, Home } from './scences/main';



function App() {
     // setting up router
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route exact path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route exact path="/chatboard" element={< ChatBoard />} />
    </Route>)
  );

  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
