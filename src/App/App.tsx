import { RouterProvider } from "react-router-dom";
import router from "./Router";
function App() {
  return (
    <>
      <header className=" bg-green-400 p-3" >
        <h1 className="w-auto text-2xl font-bold text-green-900">
          پلتفرم اتتخاب استاد
        </h1>
      </header>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
