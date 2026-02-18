import { useState } from "react";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("popular");

  const handleSearch = (query, newCategory) => {
    setSearchQuery(query);
    if (newCategory) {
      setCategory(newCategory);
    }
  };

  return (
    <div className="min-h-screen bg-primary text-white font-sans">
      <Navbar onSearch={handleSearch} />
      <Home searchQuery={searchQuery} category={category} />
    </div>
  );
}

export default App;