import {makeAutoObservable} from "mobx";

export default class CNBStore {
    constructor() {
        this._cards = [
            // {id:1, limit:100, billId:5},
            // {id:9, limit:1000, billId:8},
        ]
        this._bills = [
            // {id:5, amountOfMoney:4000},
            // {id:8, amountOfMoney:4000},
        ]
        this._selectedCard = {}
        this._selectedBill = {}
        this._selectedBillTransactions = []
        makeAutoObservable(this)
    }


    get cards() {
        return this._cards;
    }

    setCards(value) {
        this._cards = value;
    }

    get bills() {
        return this._bills;
    }

    setBills(value) {
        this._bills = value;
    }


    get selectedCard() {
        return this._selectedCard;
    }

    setSelectedCard(value) {
        this._selectedCard = value;
    }

    get selectedBill() {
        return this._selectedBill;
    }

    setSelectedBill(value) {
        this._selectedBill = value;
    }


    get selectedBillTransactions() {
        return this._selectedBillTransactions;
    }

    setSelectedBillTransactions(value) {
        this._selectedBillTransactions = value;
    }
}