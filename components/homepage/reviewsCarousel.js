import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import QuickContacts from './quickContacts';
import Review from './review';
import Review1 from '../../assets/images/review-1.jpeg';

const ReviewsCarousel = ({ deviceType }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      paritialVisibilityGutter: 10,
    },
  };

  const reviews = [
    {
      name: 'Ondřej Ševčík',
      location: 'Petřvald',
      title: 'Vykoupi to co nazvedám',
      text: 'Jeden den jsem zvedal ve fitku a fakt mi to ten den sedlo. Tak jsem si naložil plnou činku a zavolal panu Hrebíkovi, že se mi to železo z té činky nechce sundávat, zda by ho neodkoupil. Pan Hrebík mi se vším milerád pomohl, činku jsem nemusel sundávat a peníze mi dal hned na ruku. 100% spokojenost!',
      image: Review1,
    },
    {
      name: 'Ondřej Ševčík',
      location: 'Petřvald',
      title: 'Vykoupi to co nazvedám',
      text: 'Jeden den jsem zvedal ve fitku a fakt mi to ten den sedlo. Tak jsem si naložil plnou činku a zavolal panu Hrebíkovi, že se mi to železo z té činky nechce sundávat, zda by ho neodkoupil. Pan Hrebík mi se vším milerád pomohl, činku jsem nemusel sundávat a peníze mi dal hned na ruku. 100% spokojenost!',
      image: Review1,
    },
    {
      name: 'Ondřej Ševčík',
      location: 'Petřvald',
      title: 'Vykoupi to co nazvedám',
      text: 'Jeden den jsem zvedal ve fitku a fakt mi to ten den sedlo. Tak jsem si naložil plnou činku a zavolal panu Hrebíkovi, že se mi to železo z té činky nechce sundávat, zda by ho neodkoupil. Pan Hrebík mi se vším milerád pomohl, činku jsem nemusel sundávat a peníze mi dal hned na ruku. 100% spokojenost!',
      image: Review1,
    },
    {
      name: 'Ondřej Ševčík',
      location: 'Petřvald',
      title: 'Vykoupi to co nazvedám',
      text: 'Jeden den jsem zvedal ve fitku a fakt mi to ten den sedlo. Tak jsem si naložil plnou činku a zavolal panu Hrebíkovi, že se mi to železo z té činky nechce sundávat, zda by ho neodkoupil. Pan Hrebík mi se vším milerád pomohl, činku jsem nemusel sundávat a peníze mi dal hned na ruku. 100% spokojenost!',
      image: Review1,
    },
    {
      name: 'Ondřej Ševčík',
      location: 'Petřvald',
      title: 'Vykoupi to co nazvedám',
      text: 'Jeden den jsem zvedal ve fitku a fakt mi to ten den sedlo. Tak jsem si naložil plnou činku a zavolal panu Hrebíkovi, že se mi to železo z té činky nechce sundávat, zda by ho neodkoupil. Pan Hrebík mi se vším milerád pomohl, činku jsem nemusel sundávat a peníze mi dal hned na ruku. 100% spokojenost!',
      image: Review1,
    },
  ];

  return (
    <Carousel infinite autoPlay arrows={false} showDots autoPlaySpeed="10000" partialVisbile responsive={responsive} deviceType={deviceType}>
      {reviews.map(({ name, location, title, text, image }, i) => (
        <Review key={i} name={name} location={location} title={title} text={text} image={image} />
      ))}
    </Carousel>
  );
};

export default ReviewsCarousel;
