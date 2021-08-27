import BurgerIcon from '../icons/burgerIcon';

const Card = ({ children, icon, title }) => {
  return (
    <div className="card rounded border-0 shadow mb-4">
      <div className="card-body p-4">
        <div className="card-title h5">
          {icon}
          {title}
        </div>
        <div className="card-text">{children}</div>
      </div>
    </div>
  );
};

export default Card;
