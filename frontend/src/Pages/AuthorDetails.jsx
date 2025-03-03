import React from 'react';

const AuthorPage = () => {
  // Sample author data - you can replace with your own data
  const author = {
    name: "Jane Austen",
    image: "/api/placeholder/300/300",
    dateOfBirth: "December 16, 1775",
    country: "United Kingdom",
    bio: "Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century. Austen's plots often explore the dependence of women on marriage in the pursuit of favorable social standing and economic security.",
    views: 1250863,
    languages: ["English", "French", "German", "Spanish", "Italian"],
    books: [
      {
        title: "Pride and Prejudice",
        year: 1813,
        pages: 432,
        description: "The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency."
      },
      {
        title: "Sense and Sensibility",
        year: 1811,
        pages: 380,
        description: "The story follows the Dashwood sisters, Elinor and Marianne, as they cope with circumstances that drive them into poverty and reduced social standing."
      },
      {
        title: "Emma",
        year: 1815,
        pages: 474,
        description: "The story follows Emma Woodhouse, a young woman who occupies herself with matchmaking in the lives of her friends and family."
      },
      {
        title: "Persuasion",
        year: 1817,
        pages: 331,
        description: "The story concerns Anne Elliot, who at 27 is no longer young and has few romantic prospects, but when her former fiancé returns after an absence of eight years, she must face the choices she made in the past."
      }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Author header section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={author.image} 
                alt={author.name} 
                className="w-full h-80 object-cover object-center"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{author.name}</h1>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{author.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium">{author.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Profile Views</p>
                  <p className="font-medium">{author.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Languages</p>
                  <p className="font-medium">{author.languages.join(", ")}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Biography</h2>
                <p className="text-gray-700">{author.bio}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Books section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Books by {author.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {author.books.map((book, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                <div className="w-1/3 bg-gray-200">
                  <img 
                    src={`/api/placeholder/200/300`} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{book.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">Published in {book.year} • {book.pages} pages</p>
                  <p className="text-gray-700 text-sm">{book.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;