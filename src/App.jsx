import "./App.css";
import CategoryList from "./components/CategoryList";
import Header from "./components/Header";
import Loading from "./components/Loading";
import FastFoodList from "./components/FastFoodList";
import SearchBar from "./components/searchBar";
import notFound from "./assets/images/404.png";
import useAxios from "./useAxios";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("/FastFood/list");

  const [fastFoodItems, , loading] = useAxios({
    url: url,
  });

  const filterItems = (categoryId) => {
    setUrl(`/FastFood/list/${categoryId ? "?categoryId=" + categoryId : ""}`);
  };

  const searchItems = async (term) => {
    setUrl(`/FastFood/search/${term ? "?term=" + term : " "}`);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading theme="dark" />;
    }
    if (fastFoodItems.length === 0) {
      return (
        <>
          <div className="alert alert-warning text-center">
            برای کلید واژه فوق هیچ آیتمی یافت نشد
          </div>
          <img src={notFound} className="mx-auto mt-5 d-block fade-in-horiz" />
        </>
      );
    }

    return <FastFoodList fastFoodItems={fastFoodItems} />;
  };

  return (
    <div className="wrapper bg-faded-dark">
      <Header></Header>
      <CategoryList filterItems={filterItems}>
        <SearchBar searchItems={searchItems} />
      </CategoryList>
      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
}

export default App;
