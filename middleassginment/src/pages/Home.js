import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Book Management App</h1>
      <p>Manage your books efficiently and easily.</p>
      <div className="features">
        <div className="feature">
          <h2>Search Books</h2>
          <p>Find your desired books quickly with our search functionality.</p>
        </div>
        <div className="feature">
          <h2>Create and Edit Books</h2>
          <p>Add new books to your collection or update existing book details.</p>
        </div>
        <div className="feature">
          <h2>User Profiles</h2>
          <p>Manage your user profile and preferences.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;