import {observer} from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {Card} from "react-bootstrap";
import {Context} from "../index";
import {createBill, getBills} from "../http/billApi";
import {getCards} from "../http/cardApi";
import {useNavigate} from "react-router-dom";
import {BILL_ROUTE, MAIN_ROUTE} from "../utils/costants";


const BillBar = observer( () =>{
    const {cnb} = useContext(Context)
    const nav = useNavigate()

    const onStart = async()=>{

        getBills().then(data => cnb.setBills(data))
        console.log(cnb)
    }

    useEffect(() => {
        onStart()
    }, []);

    return (
        <Card className='p-2 d-flex flex-row flex-wrap' style={{minHeight:"50"}}>
            {cnb.bills.map(bill =>
                <div className='d-flex justify-content-between align-content-center flex-column p-2' onClick={()=> { cnb.setSelectedBill(bill); nav(BILL_ROUTE)}} key={bill.id} style={{cursor:"pointer",backgroundColor:"gray", width:140, height:60, color:"white", borderRadius:12, margin:10}} >
                    <div>№{bill.id}</div>
                    <div className='w-100' style={{textAlign:"right"}}>{bill.amountOfMoney}$</div>
                </div>
            )}
            <div className='d-flex justify-content-center align-content-center flex-column p-2' onClick={()=> {}} style={{cursor:"pointer",backgroundColor:"gray", width:140, height:60, color:"white", borderRadius:12, margin:10}} >
                <div className='w-100 d-flex align-content-center justify-content-center' style={{fontSize:"50px"}} onClick={async () => {
                    let data
                    try {
                        data = await createBill();
                        cnb.setSelectedBill(data)
                        nav(BILL_ROUTE)
                    } catch (e) {
                        alert(e.response.data.message)
                    };
                }}>+</div>
            </div>
        </Card>
    )
})
export default BillBar