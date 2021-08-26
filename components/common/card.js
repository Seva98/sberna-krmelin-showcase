import BurgerIcon from '../icons/burgerIcon';

const Card = ({ children, icon, title }) => {
  return (
    <div className="card rounded border-0 shadow">
      <div className="card-body p-4">
        <div className="card-title h5">
          {icon}
          {title}
        </div>
        <p className="card-text">{children}</p>
      </div>
    </div>
  );
};

export default Card;
