import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import QuickContacts from './quickContacts';
import Review from './review';
import Review1 from '../../assets/images/review-1.png';
import Review2 from '../../assets/images/review-2.png';
import Review3 from '../../assets/images/review-3.png';
import Review4 from '../../assets/images/review-4.jpg';

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
      name: 'Petr Ševčík',
      location: 'Petřvald',
      title: 'Profi obsluha',
      text: 'Přijel jsem s nákladem, kluci ze sběrny vše vysvětlili a pomohli mi. Určitě se zde ještě vrátím!',
      image: Review1,
    },
    {
      name: 'Tonda Harmečko',
      location: 'Ostrava',
      title: 'Férový přístup',
      text: 'Férová sběrna s velice ochotným personálem, chlapi byli ochotní + mají přehledný ceník',
      image: Review2,
    },
    {
      name: 'Josef Zedník',
      location: 'Brušperk',
      title: 'Blesková rychlost ⚡',
      text: 'Pekelně rychlí zaměstnanci, nikdy jsem nečekal. Jinam už nepojedu. 👍',
      image: Review3,
    },
    {
      name: 'Jan Pavlosek',
      location: 'Krmelín',
      title: '100% zdvořilost',
      text: 'Obsluha za mě super, byly slušní, nemusel jsem se za nic stydět, přijel jsem, ukázali kde, co, jak a proč, vlastně jsem se o nic nestaral, za mě OK a určitě se tady při další příležitosti vrátím znovu.',
      image: Review4,
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
