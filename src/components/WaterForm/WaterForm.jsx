import css from '../WaterForm/WaterForm.module.css';
import sprite from '../../images/sprite.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {addWater} from '../../redux/water/operations.js';


const WaterForm =({handleClose})=>{
     const [waterValue, setWaterValue] = useState(50);
     const [recordingTime, setRecordingTime] = useState('');
     const dispatch = useDispatch();

     
// Функция для получения текущего времени в формате HH:MM
     const getCurrentTime = () =>{
        const now = new Date();
        return now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
     };

//монтаж установка времени
     useEffect(()=>{
        setRecordingTime(getCurrentTime());
     }, []);

//отправка
     const handleSubmit =(e)=>{
        e.preventDefault();
        const formData = {
            time: recordingTime,
            amount: waterValue
        };
        dispatch(addWater(formData));
        handleClose();
     };

    return(
        <form className={css.waterForm} onSubmit={handleSubmit}>
            <p className={css.amountOfWater}>
                Amount of water:            
            </p>
            <div className={css.addWaterWrapper}>
                <button type="button" className={css.addWaterBtn}
                    onClick={()=>setWaterValue(prev => Math.max(prev - 50, 0))}>
                    <svg>
                    <use xlinkHref={sprite + "#icon-remove"}></use>
                    </svg>
                </button>
                <p className={css.addWaterValue}>{waterValue} ml</p>
                <button type="button" className={css.addWaterBtn} 
                    onClick={()=> setWaterValue(prev => prev + 50)}>
                    <svg>
                    <use xlinkHref={sprite + "#icon-add"}></use>
                    </svg>                    
                </button>                
            </div>
            {/* Ввод времени записи */}
            <label className={css.recordingTimeLabel}>
                Recording time:            
            <input
                type="text" 
                className={css.recordingTime} 
                placeholder="HH:MM"
                value={recordingTime}
                onChange={(e)=>setRecordingTime(e.target.value)} />            
            </label>
            {/* Ввод количества воды */}
            <label className={css.waterValueLabel}>
                Enter the value of the water used:
            <input type="text"
            className={css.waterValue}
            value={waterValue === 0 ? '' : waterValue}
            onChange={(e)=>{
                const newValue = e.target.value;
                if(/^[ 0-9]*$/.test(newValue)){
                    setWaterValue(Number(newValue));
                }
            }} />
            </label>
            <button type="submit" className={css.saveBtn}>
                Save
            </button>
        </form>
    );
};


export default WaterForm;
