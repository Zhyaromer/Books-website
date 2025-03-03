import { useState, useEffect } from "react";
import AuthorCard from "../Components/layout/AuthorCard";
import axios from "axios";
const Authors = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [authors, setAuthors] = useState([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
        try {
            const response = await axios.get("http://localhost:3000/authors/getallauthors");
            setAuthors(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchAuthors();
  }, [isLoaded]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      
      <div className="container mx-auto py-12 px-4 relative z-10">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author, index) => (
            <div 
              key={author.id} 
              className={`transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
              style={{ transitionDelay: `${150 * index}ms` }}
            >
              <AuthorCard
                name={author.name}
                imageUrl={author.imgURL}
                bio={author.bio}
                id={author.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Authors;
