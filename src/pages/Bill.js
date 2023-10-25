import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {observer, Observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {createCard, getCard, setLimit} from "../http/cardApi";
import {deleteBill, fillBill, getBill} from "../http/billApi";
import {getBillTransactions, transferMoney} from "../http/transactionApi";
import {MAIN_ROUTE} from "../utils/costants";

const Bill = observer( () => {
    const {cnb} = useContext(Context)
    const nav = useNavigate()

    const [fillMoney, setFillMoney] = useState('')
    const [billToNumber, setBillToNumber] = useState('')
    const [billMoneyToMove, setBillMoneyToMove] = useState('')
    const [cardLimit, setCardLimit] = useState('')
    const onStart = async() =>{
        try {

            await getBill(cnb.selectedBill.id).then(data => cnb.setSelectedBill(data))
            console.log(cnb.selectedBill)
            await getBillTransactions(cnb.selectedBill.id).then(data => cnb.setSelectedBillTransactions(data))
            console.log("asd")
            console.log(cnb.selectedBillTransactions)
        } catch (e) {
            alert(e.response.data.message)
            // console.log(cnb.selectedBill)
        }
    }


    useEffect( () => {
        onStart()
        // return ()=>{}
    }, []);

    return (
        <body className="mt-5">
        <Container>
            <Card className='d-flex justify-content-between flex-row p-3'><h2 className='d-flex'>Счет</h2> <h3 className='d-flex'>№{cnb.selectedBill.id}</h3></Card>

            <Card className='d-flex mt-5 p-3'>
                <div>
                    <h6>Количество денег {cnb.selectedBill.amountOfMoney}$</h6>
                </div>
                <div className='d-flex align-content-center justify-content-between mt-3'>
                    <Form className='d-flex'>
                        <Form.Control className='' type="number" style={{width:160}} placeholder='Пополнить $'
                                      value={fillMoney}
                                      onChange={e=>setFillMoney(e.target.value)}
                        ></Form.Control>
                        <Button onClick={async ()=>{
                            await fillBill(cnb.selectedBill.id, Number(fillMoney)); nav(MAIN_ROUTE)}}>
                            Пополнить
                        </Button>
                    </Form>
                    <Form className='d-flex '>
                        <Form.Control className='' type="number" style={{width:160}} placeholder='Номер счета'
                                      value={billToNumber}
                                      onChange={e=>setBillToNumber(e.target.value)}
                        ></Form.Control>
                        <Form.Control className='' type="number" style={{width:160}} placeholder='Перевести $'
                                      value={billMoneyToMove}
                                      onChange={e=>setBillMoneyToMove(e.target.value)}
                        ></Form.Control>
                        <Button onClick={async ()=>{
                            try {
                                await transferMoney(cnb.selectedBill.id, Number(billToNumber), billMoneyToMove)
                                nav(MAIN_ROUTE)
                            }catch (e) {
                                alert(e.response.data.message)
                            }
                            }}>
                            Перевести
                        </Button>
                    </Form>
                </div>
                <div className='d-flex align-content-center justify-content-between mt-3'>

                    <Form className='d-flex '>

                        <Form.Control className='' type="number" style={{width:160}} placeholder='Лимит $'
                                      value={cardLimit}
                                      onChange={e=>setCardLimit(e.target.value)}
                        ></Form.Control>
                        <Button onClick={async ()=> {
                            try {
                                await createCard(cnb.selectedBill.id, Number(cardLimit));
                                nav(MAIN_ROUTE)
                            }catch (e) {
                                alert(e.response.data.message)
                            }
                            }}>
                            создать новую карту
                        </Button>
                    </Form>

                    <Form className='d-flex'>
                        <Button style={{backgroundColor:"red"}} onClick={async ()=>{
                            try {

                                await deleteBill(cnb.selectedBill.id);
                            }catch (e) {
                                alert(e.response.data.message)
                            }
                            nav(MAIN_ROUTE)
                        }}>Закрыть счет
                        </Button>
                    </Form>
                </div>
            </Card>
            <Card className='p-3'>
                <div className='d-flex align-content-center justify-content-between mt-3'>
                    <h6>№</h6>
                    <h6>from</h6>
                    <h6>to</h6>
                    <h6>money</h6>
                </div>
                {cnb.selectedBillTransactions.map((t, i)=>
                    <div className='d-flex align-content-center justify-content-between mt-3'>
                        <h6>{i}</h6>
                        <h6>{t.BillToId}</h6>
                        <h6>{t.BillFromId}</h6>
                        <h6>{t.money}$</h6>
                    </div>

                )}
            </Card>
        </Container>
        </body>
    );
});

export default Bill;