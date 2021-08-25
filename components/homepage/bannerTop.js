import Image from 'next/image';
const Banner = ({ src }) => {
  return <Image src={src} width="1320" alt="banner" objectFit="fill" className="mx-auto" />;
};

export default Banner;
