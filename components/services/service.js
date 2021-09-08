import Image from 'next/image';

const Service = ({ title, text, image, leftImg }) => {
  return (
    <section className="feature-item feature-item-1 pt-5" style={{ borderBottom: '1px solid #efefef' }}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-7 align-self-center">
            <h4>{title}</h4>
            <div className="mb-5" style={{ lineHeight: '1.75rem' }}>
              {text.split(/\r?\n|\r/g).map((t) => (
                <div key={Math.random()}>{t}</div>
              ))}
            </div>
          </div>
          <div className={`col-12 col-lg-5 ${leftImg && 'order-lg-first'}`}>
            <div className="shadow" style={{ fontSize: '0' }}>
              <Image src={image} alt={title} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
