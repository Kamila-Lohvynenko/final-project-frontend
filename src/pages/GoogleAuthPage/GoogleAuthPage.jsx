import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../../services/axios.config';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetToken } from '../../redux/user/slice';

const GoogleAuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const {
        data: { data },
      } = await axiosInstance.post('users/confirm-oauth', {
        code: searchParams.get('code'),
      });

      dispatch(resetToken(data.accessToken));

      navigate('/tracker');
    }
    fetch();
  }, [searchParams, dispatch, navigate]);
  return <div>GoogleAuthPage</div>;
};

export default GoogleAuthPage;
