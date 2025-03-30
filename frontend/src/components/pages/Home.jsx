import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { CATEGORIES } from "@/constants/categories";
import { COUNTRIES } from "@/constants/countries";

const categories = [
  { title: "All", image: "/all.jpg" },
  { title: "Categorical", image: "/categorical.png" },
  { title: "Country", image: "/country.jpg" },
  { title: "Editorial", image: "/editorial.jpg" },
];

function Home() {
  return (
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 pt-5 w-full max-w-6xl gap-y-5 md:gap-y-10 lg:gap-y-15 gap-x-0 md:gap-x-10 lg:gap-x-30">
          {categories.map((category, index) =>
            category.title === "All" ? (
              <Link key={index} to="/news/all-news">
                <Card image={category.image} title={category.title} />
              </Link>
            ) : category.title === "Categorical" ? (
              <Card 
                key={index} 
                image={category.image} 
                title={category.title}
                items={CATEGORIES}
                basePath="/news/category-news"
                isScrollable={true}
              >
              </Card>
            ) : category.title === "Country" ? (
              <Card 
                key={index} 
                image={category.image} 
                title={category.title}
                items={COUNTRIES}
                basePath="/news/country-news"
                isScrollable={true}
              >
              </Card>
            ) : null
          )}
        </div>
      </main>
  );
}

export default Home;