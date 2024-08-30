// src/pages/Bookmarked.jsx
import React, { useState, useEffect } from "react";

const Bookmarked = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedMovies")) || [];
    setBookmarkedMovies(storedBookmarks);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="flex-1 p-6 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-red-500">
          Bookmarked Movies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarkedMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              <img
                src={movie.poster?.url}
                alt={movie.name}
                className="w-full h-48 object-cover transition-transform hover:scale-105"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {movie.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {movie.year} - {movie.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarked;
