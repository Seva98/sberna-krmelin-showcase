const News = ({ news }) => {
  return (
    <div className="container py-5 text-center text-white single-col-max-width">
      <div className="h3 text-white">Novinky</div>
      <div className="my-0">
        <table className="mx-auto">
          <tbody>
            {news &&
              news.map(({ _id, text, date }) => (
                <tr key={_id} style={{ height: '2em' }}>
                  <td className="text-end px-2">{new Date(date).toLocaleDateString()}</td>
                  <td className="text-start px-2">
                    <strong>{text}</strong>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default News;
