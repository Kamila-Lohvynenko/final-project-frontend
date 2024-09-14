import UserBar from '../UserBar/UserBar';
import css from './UserPanel.module.css';

const UserPanel = ({ user }) => {
  return (
    <div className={css.userPanel}>
      <h2>Hello, {user?.name || "Guest"}!</h2> 
      <UserBar userName={user?.name || "Guest"} /> 
    </div>
  );
};

export default UserPanel;