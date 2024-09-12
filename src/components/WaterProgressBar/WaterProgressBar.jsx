import css from '../WaterProgressBar/WaterProgressBar.module.css';

const WaterProgressBar =()=>{
    return(
        <div className={css.progressBarContainer}>
            <h2 className={css.progressBarTitle}>today</h2>
            <div className={css.progressBar}></div>
        </div>
    )
};

export default WaterProgressBar;