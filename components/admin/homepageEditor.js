import axios from 'axios';
import { useState } from 'react';
import ThrashIcon from '../icons/thrashIcon';
import NewNews from '../admin/newNews';
import Loader from '../common/loader';

const HomepageEditor = ({ news }) => {
  const [newsCopy, setNewsCopy] = useState(news);
  const [loading, setLoading] = useState(false);
  const handleTextChange = (e) => {
    const { value, name } = e.target;
    const newNews = [
      ...newsCopy.map((n, i, { length, lastIndex = i === length - 1 }) => {
        if (n._id === name) n.text = value;
        if (!n._id && lastIndex) n.text = value;
        return n;
      }),
    ];
    setNewsCopy(newNews);
  };
  const handleTextChanged = async ({ _id, text }) => {
    setLoading(true);
    try {
      await axios.put('/api/news', { data: { _id: _id, text } });
      const changedArr = [...newsCopy].map((n) => {
        if (n._id === _id) n.text = text;
        return n;
      });
      setNewsCopy(changedArr);
    } catch (error) {}
    setLoading(false);
  };

  const handleDelete = async ({ _id }) => {
    if (loading) return;
    setLoading(true);
    if (confirm(`Opravdu chceš smazat novinku?`)) {
    }
    try {
      await axios.delete(`/api/news`, { data: { _id } });
      const filteredArr = [...newsCopy].filter((n) => n._id !== _id);
      setNewsCopy(filteredArr);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleSave = (news) => {
    news.date = String(new Date());
    setNewsCopy([...newsCopy, news]);
  };

  return (
    <>
      <table className="table table-striped w-100">
        <tbody>
          {newsCopy &&
            newsCopy.map((n) => (
              <tr key={n._id}>
                <td>{new Date(n.date).toLocaleString()}</td>
                <td>
                  <input
                    type="text"
                    name={n._id}
                    placeholder="Název"
                    value={n.text}
                    className="w-100 form-control"
                    disabled={loading}
                    onChange={handleTextChange}
                    onBlur={() => handleTextChanged(n)}
                  />
                </td>
                <td>
                  <ThrashIcon onClick={() => handleDelete(n)} />
                </td>
              </tr>
            ))}
          <NewNews onSave={handleSave} />
        </tbody>
      </table>
      <Loader loading={loading} />
    </>
  );
};

export default HomepageEditor;
