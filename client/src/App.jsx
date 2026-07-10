import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "@clerk/react";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";

const App = () => {

  const { getToken } = useAuth();

  useEffect(() => {

    const fetchToken = async () => {

      try {

        const token = await getToken();

        console.log("================================");
        console.log("CLERK SESSION TOKEN");
        console.log(token);
        console.log("================================");

      } catch (error) {

        console.error(error);

      }

    };

    fetchToken();

  }, [getToken]);

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/ai" element={<Layout />}>

        <Route index element={<Dashboard />} />

        <Route
          path="write-article"
          element={<WriteArticle />}
        />

        <Route
          path="blog-titles"
          element={<BlogTitles />}
        />

        <Route
          path="generate-images"
          element={<GenerateImages />}
        />

        <Route
          path="remove-background"
          element={<RemoveBackground />}
        />

        <Route
          path="remove-object"
          element={<RemoveObject />}
        />

        <Route
          path="review-resume"
          element={<ReviewResume />}
        />

        <Route
          path="community"
          element={<Community />}
        />

      </Route>

    </Routes>

  );

};

export default App;