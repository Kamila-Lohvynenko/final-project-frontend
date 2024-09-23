import { useSelector } from 'react-redux';
import css from '../WaterProgressBar/WaterProgressBar.module.css';
import { selectTotalWaterByDay } from '../../redux/water/selectors.js';
import { selectDailyIntake } from '../../redux/user/selectors.js';
import ChooseDate from '../ChooseDate/ChooseDate.jsx';

const WaterProgressBar = ({ chosenDate }) => {
  const currentWater = useSelector(selectTotalWaterByDay);
  const dailyWaterGoal = useSelector(selectDailyIntake);
  const waterIntakeProgress = Math.round((currentWater / dailyWaterGoal) * 100);

  const displayedPercentage =
    waterIntakeProgress >= 100 ? 100 : waterIntakeProgress;

  return (
    <div className={css.progressBarContainer}>
      <div className={css.dataFix}>
      <ChooseDate chosenDate={chosenDate} classCss="progressBarTitle" />
      </div>
  
      <div className={css.progressBar}>
        <div
          className={css.progressBarFill}
          style={{
            width: `${displayedPercentage}%`,
            backgroundColor: displayedPercentage >= 100 ? '#7fffd4' : '#9be1a0',
          }}
        >
          {displayedPercentage < 100 && (
            <p className={css.percentNumber} style={{ color: '#9be1a0' }}>
              {`${displayedPercentage}%`}
            </p>
          )}
        </div>
        <div
          className={css.slider}
          style={{
            left: `${displayedPercentage}%`,
            border:
              displayedPercentage >= 100
                ? 'solid 1px #7fffd4'
                : 'solid 1px #9be1a0',
            transform: `translate(-50%, -50%)`,
          }}
        ></div>
      </div>
      <div className={css.percentContainer}>
        <p className={css.percent}>0%</p>
        <p className={css.percent}>50%</p>
        <p className={css.percent}>100%</p>
      </div>
    </div>
  );
};

export default WaterProgressBar;
