import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';
import { TbFaceIdError } from 'react-icons/tb';
import { MdOutlineArrowBackIos } from 'react-icons/md';
// import Loader from '../../components/Loader/Loader';

const NotFoundPage = () => {
  return (
    <div className={css.page}>
      <div className={css.backHome}>
        <TbFaceIdError size={80} />
        <div className={css.text}>Page is not found</div>
        <Link to="/" className={css.link}>
          Back to home
          <MdOutlineArrowBackIos size={30} className={css.icon} />
        </Link>
      </div>
      <div className={css.wrapper}></div>
      {/* <Loader /> */}
    </div>
  );
};

export default NotFoundPage;
