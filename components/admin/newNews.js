import axios from 'axios';
import { useState } from 'react';
import CrossIcon from '../icons/crossIcon';

const NewNews = ({ onSave }) => {
  const [text, setText] = useState('');

  const saveNewNews = async () => {
    try {
      const data = {
        text,
        date: new Date(),
      };
      await axios.post('/api/news', { data });
      setText('');
      onSave(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <tr>
      <td>
        <input name="name" placeholder="Text" value={text} className="w-100 form-control" onChange={({ target: { value } }) => setText(value)} />
      </td>

      <td>
        <button className="btn btn-primary w-100" onClick={() => saveNewNews()} disabled={!text}>
          Uložit novinku
        </button>
      </td>
    </tr>
  );
};

export default NewNews;
