import { observer} from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {Card} from "react-bootstrap";
import {Context} from "../index";
import {getBills} from "../http/billApi";
import {getCards} from "../http/cardApi";
import {useNavigate} from "react-router-dom";
import {CARD_ROUTE} from "../utils/costants";


const CardsBar = observer( () =>{
    const {cnb} = useContext(Context)
    const nav = useNavigate()
    const onStart = async() =>{

        getCards().then(data => cnb.setCards(data))
    }
    useEffect(() => {
        onStart()
    }, []);
    return (
        <Card className='p-2 d-flex flex-row flex-wrap' style={{minHeight:"50"}}>
            {cnb.cards.map(card =>
                <div className='d-flex justify-content-between align-content-center flex-column p-2' key={card.id} onClick={()=> {cnb.setSelectedCard(card); nav(CARD_ROUTE)}} style={{ cursor:"pointer",backgroundColor:"gray", width:140, height:60, color:"white", borderRadius:12, margin:10}} >
                    <div >№{card.id}</div>
                    <div className='w-100' style={{textAlign:"right"}} >{card.limit}$</div>
                </div>
            )}
        </Card>
    )
})
export default CardsBar;