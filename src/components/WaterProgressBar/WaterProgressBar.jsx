import css from '../WaterProgressBar/WaterProgressBar.module.css';

const WaterProgressBar =()=>{
    return(
        <div className={css.progressBarContainer}>
            <h2 className={css.progressBarTitle}>Today</h2>
            <div className={css.progressBar}>
                <div className={css.progressBarFill}></div>
                <p className={css.percentNumber}></p>
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