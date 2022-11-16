import React from 'react';

import './AboutProject.css';

function AboutProject() {
    return (
        <section className='about-project'>
            <div className='about-project__section'>
                <h2 className='project-title'>О проекте</h2>
                <ul className='project-list'>
                    <li className='project-list__item'>
                        <h3 className='project-list__heading'>Дипломный проект включал 5 этапов</h3>
                        <p className='project-list__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </li>
                    <li className='project-list__item'>
                        <h3 className='project-list__heading'>На выполнение диплома ушло 5 недель</h3>
                        <p className='project-list__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </li>
                </ul>

                <ul className='project-blocks'>
                    <li className='project-block'>1 неделя</li>
                    <li className='project-block project-block_color_black'>4 недели</li>
                </ul>

                <ul className='project-blocks'>
                    <li className='project-block project-block_type_text'>Back-end</li>
                    <li className='project-block project-block_type_text'>Front-end</li>
                </ul>
            </div>
        </section>
    );
}

export default AboutProject;