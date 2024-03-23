import styles from './description.module.css';





export function Description() {
    return (
        <div className={styles.descrWrap}>
            <p className={styles.descr}>
                Тестовое задание<br />
                Необходимо выполнить в отдельном проекте и залить на сервер демку, в котором его можно потрогать. В качестве ответа приложить URL демки и открытый репозиторий с кодом.
                Напишите демку "биллиард" на canvas, без использования сторонних библиотек отрисовки и физики.

                Технологии: Canvas, TS, React

                Суть игры:
                - Есть прямоугольное поле Canvas, на прямоугольном поле расположены шары разного размера
                - Я могу толкнуть мышкой шар в сторону
                - Шар упруго соударяется с другими шарами и стенками, часть импульса при соударении теряется.
                - Если шар кликнуть, то появляется менюшка, выполненная с помощью React, с помощью которой можно поменять цвет заливки шара.
            </p>
            <p className={styles.descr}>
                Реализация<br />
                Делал только под десктоп.
                С Canvas никогда до этого не работал. Немного не понял "Я могу толкнуть мышкой шар в сторону".
                Если бы я оставил клики на каждый шар, то они бы пинались и вызывали меню, если сделать толкание курсором,
                то мышкой пришлось бы догонять каждый шарик. Я оставил клик только по изначально белому шарику. 
                Цвет других шаров можно выбрать в меню, которое открывается по клику на шар.
                P.s. Вероятно код выглядит ужасным, но до этого тестового задания я еще никогда Canvas не использовал.
                Сперва я реализовал все на голом html, а после уже приступил к созданию React-приложения.
                При написании всего, что связано с Canvas я пользовался ИИ. Вникал, уточнял, корректировал. Ставил console.log 
                и на основе данных из log уточнял запросы и двигал приложение вперед. Ушло 2 вечера.
                Было интересно. Спасибо.
            </p>
        </div>
    );
}