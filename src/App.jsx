
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import BanquetHall from "./pages/banquetHall/BanquetHall";
import Layout from "./pages/layout/Layout";
import Garden from "./pages/garden/Garden";
import Hospital from "./pages/hospital/Hospital";
import Hotel from "./pages/hotel/Hotel";
import Mall from "./pages/mall/Mall";
import School from "./pages/school/School";
import TrafficHotspot from "./pages/traffichotspot/TrafficHotspot";
import Diversion from "./pages/diversion/Diversion";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage/>,
        },
        {
          path: "/banquethall",
          element: <BanquetHall/>
        },
        {
          path: "/garden",
          element: <Garden />,
        },
        {
          path: "/hospital",
          element: <Hospital />,
        },
        {
          path: "/hotel",
          element: <Hotel />,
        },
        {
          path: "/mall",
          element: <Mall />,
        },
        {
          path: "/school",
          element: <School />,
        },
        {
          path: "/traffichotspot",
          element: <TrafficHotspot />,
        },
        {
          path:"/diversion",
          element: <Diversion/>
        }
        /*{
          path: "/event",
          element: <Register />,
        },
        {
          path: "/constrution",
          element: <Register />,
        },
        {
          path: "/complaint",
          element: <Register />,
        },
        {
          path: "/parkingbuilding",
          element: <Register />,
        },*/

      ]
    },
   
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
