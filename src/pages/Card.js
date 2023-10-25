import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {deleteCard, getCard, getCards, setLimit} from "../http/cardApi";
import {CARD_ROUTE, MAIN_ROUTE} from "../utils/costants";
import {observer, Observer} from "mobx-react-lite";
// import {Container, Card} from "react-bootstrap";

const BCard = observer( () => {
    const {cnb} = useContext(Context)
    const nav = useNavigate()

    const [limit, setLimitl] = useState('')


    useEffect(() => {
        try {

            getCard(cnb.selectedCard.id).then(data => cnb.setSelectedCard(data))
        } catch (e){
            alert(e.response.data.message)
        }
    }, []);

    return (
        <body className="mt-5">
            <Container>
                <Card className='d-flex justify-content-between flex-row p-3'><h2 className='d-flex'>Карта</h2> <h3 className='d-flex'>№{cnb.selectedCard.id}</h3></Card>

                <Card className='d-flex mt-5 p-3'>
                    <div>
                        <h6>Лимит {cnb.selectedCard.limit}$</h6>
                    </div>
                    <div className='d-flex align-content-center justify-content-between'>
                        <Form className='d-flex'>
                        <Form.Control className='' type="number" style={{width:160}} placeholder='Введите число(лимит) $'
                                      value={limit}
                                      onChange={e=> {setLimitl(e.target.value); }}
                        ></Form.Control>
                        <Button
                            onClick={ async ()=> {
                                await setLimit(cnb.selectedCard.id, Number(limit));
                                nav(MAIN_ROUTE)}}>
                            Изменить лимит
                        </Button>
                        </Form>
                        <Form className='d-flex'>
                        <Button style={{backgroundColor:"red"}} onClick={async ()=> { await deleteCard(cnb.selectedCard.id); nav(MAIN_ROUTE)}}>Удалить карту
                        </Button>
                        </Form>
                    </div>
                </Card>
            </Container>
        </body>
    );
});

export default BCard;