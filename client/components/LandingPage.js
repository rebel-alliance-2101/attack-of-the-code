import React, { useState } from 'react';
import 'materialize-css';
import { Container, Button, TextInput, Dropdown, Divider, Icon, Card, Row, Col, Select } from 'react-materialize';
import Cycle from './Cycle';
import styles from './css/LandingPage.module.css'


const LandingPage = () => {

    const [wobble, setWobble] = useState(0)

    return (
        <Container className={styles.container}>
            {/* <Row className={styles.innerContainer} style={{backgroundImage: `url(/attackOfTheCodeLOGO.png)`}}>
            </Row> */}
            <img className={styles.logo}src='/attackOfTheCodeLOGO.png' />
            <Row className={styles.cube}>
                <form className={styles.name}>
                    <input type='text' placeholder='name' />
                </form>
            </Row>
            <Row className={styles.cubeImg}>
                <img 
                    onClick={() => setWobble(1)}
                    onAnimationEnd={() => setWobble(0)}
                    wobble={wobble}
                    src='/change_cube_transparent.png' 
                />
                <Cycle /> 
            </Row>
                <TextInput id="TextInput-4" placeholder='Room Code'/>
                <Button
                    style={{color: 'black', backgroundColor: 'rgb(245, 245, 12)'}}
                    className="col l2 offset-l1 offset-s4 s4"
                    node="button"
                    waves="red"
                >
                    Join
                </Button>
                <select className={styles.selectLanguage}>
                    <option>Language</option>
                    <option>English</option>
                    <option>Aurebesh</option>
                </select>
        </Container>
    )
}

export default LandingPage
