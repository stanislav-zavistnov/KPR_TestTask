import { Ball } from '../Main/Main';
import styles from './setup.module.css';


interface IProps {
    position: {
        x: number;
        y: number;
    };
    currentBall: Ball | undefined;
}

export function Setup(props: IProps) {
    function handleClick(color: string) {
        if (props.currentBall) {
            props.currentBall.color = color;
        }
    }
    return (
        <div className={styles.wrap} style={{ position: 'absolute', left: `${props.position.x}px`, top: `${props.position.y}px` }} >
            <p className={styles.title}>
                ВЫБЕРИ ЦВЕТ
            </p>
            <button className={styles.button} onClick={() => {handleClick('red')}} style={{background: 'red'}}></button>
            <button className={styles.button} onClick={() => {handleClick('white')}} style={{background: 'white'}}></button>
            <button className={styles.button} onClick={() => {handleClick('black')}} style={{background: 'black'}}></button>
            <button className={styles.button} onClick={() => {handleClick('grey')}} style={{background: 'grey'}}></button>
            <button className={styles.button} onClick={() => {handleClick('blue')}} style={{background: 'blue'}}></button>
            <button className={styles.button} onClick={() => {handleClick('brown')}} style={{background: 'brown'}}></button>
            <button className={styles.button} onClick={() => {handleClick('yellow')}} style={{background: 'yellow'}}></button>
            <button className={styles.button} onClick={() => {handleClick('pink')}} style={{background: 'pink'}}></button>
        </ div>
            );
}