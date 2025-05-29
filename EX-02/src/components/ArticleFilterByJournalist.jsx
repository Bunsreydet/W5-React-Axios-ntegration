import { useEffect, useState } from 'react';
import axios from 'axios'
export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalist, setJournalist] = useState([]);
  const [selectJournalist, setSelectJournalist] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
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
    }
  };

  const applyFilters = async () => {
    try {
      let url = 'http://localhost:5000/articles';
      const queryParams = `journalistId=${selectJournalist}`;
      url += `?${queryParams}`;
      const res = await axios.get(url);
      setArticles(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const resetFilter = () => {
    setSelectJournalist('');
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
          onChange={(e) => setSelectJournalist(e.target.value)}  
        >
          <option value="">All Journalists</option>
          {
          /* Options for journalists */
            journalist.map((j) => (
              <option key={j.id} value={j.id}>{j.name || `Journalist #${j.id}`}</option>
            ))
          }
        </select>

        <button
          onClick={applyFilters}
        >Apply Filters</button>
        <button
          onClick={resetFilter}
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
    </div>
  );
}