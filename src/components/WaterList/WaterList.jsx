import css from "./WaterList.module.css";
import WaterItem from "../WaterItem/WaterItem";

const WaterList = () => {
  const dummyWaterList = [{id: 1, volume: 100, time: '12:00'}, {id: 2, volume: 250, time: '6:00'}, {id: 3, volume: 250, time: '6:00'}, {id: 4, volume: 250, time: '6:00'}, {id: 5, volume: 250, time: '6:00'}]
  return (
      <>
          <ul className={css.waterList}>
              {dummyWaterList.map((item) => (
                  <li key={item.id} className={css.waterItem}>
                      <WaterItem volume={item.volume} time={item.time} />
                  </li>
              ))}
          </ul>
      </>
  );
};

export default WaterList;