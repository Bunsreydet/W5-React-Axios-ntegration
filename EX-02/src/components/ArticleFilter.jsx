import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [ articles, setArticles ] = useState([]);
  const [ journalist, setJournalist ] = useState([]);
  const [ category, setCategory ] = useState([]);
  const [ selectJournalist, setSelectJournalist ] = useState('');
  const [ selectCategory, setSelectCategory ] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
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

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const res = await axios.get('http://localhost:5000/journalists');
      setJournalist(res.data);
    } catch (error) {
      console.log(error);
    };
  }
  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await axios.get('http://localhost:5000/categories');
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const applyFilters = async () => {
    try { 
      let url = 'http://localhost:5000/articles';
      const queryParams = [];

      if(selectJournalist) {
        queryParams.push(`journalistId=${selectJournalist}`);
        url += `?${queryParams}`;
      }
      if(selectCategory) {
        queryParams.push(`categoryId=${selectCategory}`);
        url += `?${queryParams}`;
      } 

      if(queryParams.length > 1) {
        url += `?${queryParams.join('&')}`;
      }

      

      const res = await axios.get(url);
      setArticles(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const resetFilter = () => {
    setSelectJournalist('');
    setSelectCategory('');
    fetchArticles();
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          id="journalistFilter"
          value={selectJournalist}
          onChange={(e) => setSelectJournalist(e.target.value)
          }>
          <option value="">All Journalists</option>
          {
            /* Options for journalists */
            journalist.map( (j) => (
              <option key={j.id} value={j.id}>{j.name || `Journalist #${j.id}`}</option>
            ))
          }
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select 
          id="categoryFilter"
          value={selectCategory}
          onChange={(e) => setSelectCategory(e.target.value)}
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
            // Logic to apply filters
            applyFilters
          }
        >Apply Filters</button>
        <button
          onClick={
            // Logic to reset filters
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