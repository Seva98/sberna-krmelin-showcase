import Image from 'next/image';
import PhoneIcon from '../icons/phoneIcon';
import MailIcon from '../icons/mailIcon';

const ContactsCard = ({ name, subtitle, phone, email, image, children }) => {
  return (
    <div className="card border-0 shadow-lg pt-5 my-5 position-relative">
      <div className="card-body">
        <div className="member-profile position-absolute w-100 text-center" style={{ top: '-50px', left: '0px', height: '100px' }}>
          <Image src={image} width="100" height="100" className="rounded-circle mx-auto d-inline-block shadow-sm" alt={name} />
        </div>
        <div className="card-text pt-1">
          <h5 className="member-name mb-0 text-center text-primary font-weight-bold">{name}</h5>
          <div className="mb-3 text-center">{subtitle}</div>
          <div>
            {children}
            {phone && email && (
              <table className="table mx-auto w-auto table-contact">
                <tbody>
                  <tr>
                    <th>Telefon</th>
                    <td>
                      <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>
                      <a href={`mailto:${email}`}>{email}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {phone && email && (
        <div className="card-footer theme-bg-primary border-0 text-center">
          <ul className="social-list list-inline mb-0 mx-auto">
            <li className="list-inline-item">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="me-1">
                <PhoneIcon style={{ height: '24px', width: '24px' }} />
              </a>
            </li>
            <li className="list-inline-item">
              <a href={`mailto:${email}`}>
                <MailIcon style={{ height: '24px', width: '24px' }} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactsCard;
