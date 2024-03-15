import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import items from "../items";
import axios from "axios";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);

  const getSearchData = async (query) => {
    if (query) {
      const res = await axios.get("http://localhost:4001/search", {
        params: {
          query: query,
        },
      });

      console.log(res.data.data);
      setResults(res.data.data);
    }
  };

  useEffect(() => {
    const query = searchParams.get("query");
    getSearchData(query);
  }, [searchParams]);

  return (
    <>
      {results.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            rowGap: "10vh",
            padding: "5vh",
            paddingTop: "10vh",
          }}
        >
          {results.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              imageUrl={product.image_url[0]}
              title={product.title}
              description={product.description}
              price={`${product.price.toFixed(2)}`}
              rating={product.rating}
            />
          ))}
        </div>
      ) : (
        <div>No results found.</div>
      )}
    </>
  );
};

export default SearchResults;
