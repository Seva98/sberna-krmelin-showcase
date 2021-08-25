const GoogleMap = () => {
  return (
    <div className="text-center">
      <div className="mb-2">
        <div className="h2">Kde nás najdete?</div>
        <div>Staroveská 567</div>
        <div>739 24 Krmelín</div>
      </div>
      <div style={{ position: 'relative', textAlign: 'center', height: '500px', width: '600px', margin: '0 auto' }}>
        <iframe
          width="600"
          height="500"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=Starovesk%C3%A1%20567,%20739%2024%20Krmel%C3%ADn&t=&z=12&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          style={{ overflow: 'hidden', background: 'none!important', height: '500px', width: '600px' }}
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleMap;
