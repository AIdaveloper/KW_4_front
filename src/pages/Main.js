import React, {useContext, useEffect} from 'react';
import {Card, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getBills} from "../http/billApi";
import {getCards} from "../http/cardApi";
import CardsBar from "../components/CardsBar";
import BillBar from "../components/BillBar";

const Main = () => {
    // const {cnb} = useContext(Context)
    //
    // useEffect(() => {
    //     getBills().then(data => cnb.setBills(data))
    //     getCards().then(data => cnb.setCards(data))
    //     console.log(cnb)
    // }, []);

    return (
        <body className="mt-5">
            <Container>
                <h2>Здравствуйте!</h2>
                <Card>
                </Card>
            </Container>
            <Container className='mt-3'>
                <h4>Карты</h4>
                <CardsBar/>
            </Container>
            <Container className='mt-3'>
                <h4>Счета</h4>
                <BillBar/>
            </Container>
        </body>
    );
};

export default Main;