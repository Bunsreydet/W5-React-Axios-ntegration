import { useEffect, useState } from 'react';
import axios from 'axios';
export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [category, setCategory] = useState([]);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:5000/articles')
      setArticles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await axios.get('http://localhost:5000/categories')
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  const applyFilters = async () => {
  try {
    let url = 'http://localhost:5000/articles';
    const queryParams = `categoryId=${selectCategory}`;
    url += `?${queryParams}`;
    const res = await axios.get(url);
    setArticles(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const resetFilter = () => {
    setSelectCategory('');
    fetchArticles();
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select 
          id="categoryFilter"
          value={selectCategory}
          onChange={(e) => setSelectCategory(e.target.value )}

        >
          <option value="">All Categories</option>
          {
            /* Options for categories */
            category.map( (c) => (
              <option key={c.id} value={c.id}>{c.name || `Category #${c.id}`}</option>
            ))
          }
        </select>

        <button
          onClick={
            applyFilters
          }
        >Apply Filters</button>
        <button
          onClick={
            resetFilter
          }
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
      {(articles.length === 0) && <div style={{color: "red"}}>Content not avialable</div>}
    </div>
  );
}