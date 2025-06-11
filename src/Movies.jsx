import React, { useState } from 'react';
import { Star, Plus, Search, Filter as FilterIcon } from 'lucide-react';

// MovieCard Component
const MovieCard = ({ movie }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={movie.posterURL}
          alt={movie.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400/6b7280/ffffff?text=No+Image';
          }}
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
          {movie.rating}/5
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{movie.description}</p>
        <div className="flex items-center space-x-1">
          {renderStars(movie.rating)}
        </div>
      </div>
    </div>
  );
};

// Filter Component
const Filter = ({ onFilterChange, titleFilter, ratingFilter }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FilterIcon size={20} className="text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filter Movies</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Title
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter movie title..."
              value={titleFilter}
              onChange={(e) => onFilterChange('title', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <select
            value={ratingFilter}
            onChange={(e) => onFilterChange('rating', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Ratings</option>
            <option value="1">1+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// MovieList Component
const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM6 8v11a2 2 0 002 2h8a2 2 0 002-2V8M10 12v4M14 12v4" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">No movies found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

// AddMovieForm Component
const AddMovieForm = ({ onAddMovie, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onAddMovie({
        ...formData,
        id: Date.now() + Math.random()
      });
      setFormData({ title: '', description: '', posterURL: '', rating: 1 });
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Add New Movie</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Movie Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter movie title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                placeholder="Enter movie description"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Poster URL
              </label>
              <input
                type="url"
                value={formData.posterURL}
                onChange={(e) => handleInputChange('posterURL', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/poster.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <select
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Movie
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const MovieApp = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
      rating: 5
    },
    {
      id: 2,
      title: "The Godfather",
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      rating: 5
    },
    {
      id: 3,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological and physical tests.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      rating: 4
    },
    {
      id: 4,
      title: "Pulp Fiction",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      rating: 4
    },
    {
      id: 5,
      title: "Forrest Gump",
      description: "The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      rating: 4
    },
    {
      id: 6,
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      rating: 5
    }
  ]);

  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'title') {
      setTitleFilter(value);
    } else if (filterType === 'rating') {
      setRatingFilter(value);
    }
  };

  const handleAddMovie = (newMovie) => {
    setMovies(prev => [...prev, newMovie]);
  };

  const filteredMovies = movies.filter(movie => {
    const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesRating = ratingFilter === '' || movie.rating >= parseInt(ratingFilter);
    return matchesTitle && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎬 My Movie Collection</h1>
          <p className="text-gray-600">Discover and manage your favorite movies and TV shows</p>
        </div>

        {/* Add Movie Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsAddMovieOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
          >
            <Plus size={20} />
            Add New Movie
          </button>
        </div>

        {/* Filter Component */}
        <Filter
          onFilterChange={handleFilterChange}
          titleFilter={titleFilter}
          ratingFilter={ratingFilter}
        />

        {/* Results Counter */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredMovies.length} of {movies.length} movies
          </p>
        </div>

        {/* Movie List */}
        <MovieList movies={filteredMovies} />

        {/* Add Movie Form Modal */}
        <AddMovieForm
          onAddMovie={handleAddMovie}
          isOpen={isAddMovieOpen}
          onClose={() => setIsAddMovieOpen(false)}
        />
      </div>
    </div>
  );
};

export default MovieApp;