import Image from 'next/image';
import StarIcon from '../icons/starIcon';
import Review1 from '../../assets/images/review-1.jpeg';

const Review = ({ name, location, title, text, image }) => {
  return (
    <div className="item-inner shadow rounded p-4 m-sm-3 my-0 mb-2 review-card">
      <div className="h4 mb-2">{title}</div>
      <div className="ratings text-primary mb-3">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>
      <div className="mb-3">{text}</div>
      <div className="row">
        <div className="col-auto">
          <Image className="source-profile rounded-circle mr-3" src={Review1} alt="" height="96" width="96" />
        </div>
        <div className="col">
          <div className="source-info media-body pt-4">
            <div>{name}</div>
            <div>{location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
