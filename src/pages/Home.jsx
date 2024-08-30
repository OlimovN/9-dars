// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const moviesPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10&page=${currentPage}&limit=${moviesPerPage}`,
          {
            headers: {
              "X-API-KEY": "C468V0F-RBAMN1W-QQTJNMF-2Q04XRY",
            },
          }
        );
        setMovies(response.data.docs);
        setTotalPages(Math.ceil(response.data.total / moviesPerPage));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [currentPage]);

  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedMovies")) || [];
    setBookmarkedMovies(storedBookmarks);
  }, []);

  const handleBookmark = (movie) => {
    const isAlreadyBookmarked = bookmarkedMovies.some(
      (bookmarkedMovie) => bookmarkedMovie.id === movie.id
    );

    if (isAlreadyBookmarked) {
      alert("This movie is already bookmarked.");
      return;
    }

    const updatedBookmarks = [...bookmarkedMovies, movie];
    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem("bookmarkedMovies", JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (movieId) => {
    return bookmarkedMovies.some((movie) => movie.id === movieId);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="flex-1 p-6 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-red-500">
          Recommended for you
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 bg-gray-700"
            >
              <img
                src={movie.poster?.url}
                alt={movie.name}
                className="w-full h-48 object-cover transition-transform hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <FaBookmark
                  size={24}
                  className={`cursor-pointer ${
                    isBookmarked(movie.id)
                      ? "text-red-500"
                      : "text-white opacity-50"
                  }`}
                  onClick={() => handleBookmark(movie)}
                />
              </div>
              <div className="p-4">
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
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Previous
          </button>
          <span className="text-white font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
