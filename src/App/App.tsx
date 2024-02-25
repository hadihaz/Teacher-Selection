import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { Suspense } from "react";
function App() {
  return (
    <>
      <Suspense fallback={<div>در حال بارگزاری...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
