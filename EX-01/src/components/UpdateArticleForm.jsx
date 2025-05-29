import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });

  const { id } = useParams();
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');

  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    axios
      .get(`http://localhost:5000/articles/${id}`)
      .then( (res) => setForm(res.data) )
      .catch( (err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try{
      axios.put(`http://localhost:5000/articles/${id}`, form)
      setSuccess("Article have been successfully updated");
      setError('');
    } catch (err) {
      setError('Fail to update article: ' + err.message);
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {success && <p style={{color: 'green'}}>{success}</p>}
    </form>
  );
}
