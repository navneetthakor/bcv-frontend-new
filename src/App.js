// related to router setup 
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// imporing Scences
import {RootLayout, ChatBoard, Home } from './scences/main';
import { UserLogedProvider } from "./context/UserLogedContext";



function App() {
     // setting up router
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route exact path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route exact path="/result" element={< ChatBoard />} />
    </Route>)
  );

  return (
    <>
    <UserLogedProvider>
    <RouterProvider router={router} />
    </UserLogedProvider>
    </>
  );
}

export default App;
