import {
    BILL_ROUTE,
    CARD_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    TRANSACTIONS_ROUTE
} from "./utils/costants";
import Transactions from "./pages/Transactions";
import Card from "./pages/Card";
import Bill from "./pages/Bill";
import Main from "./pages/Main";
import Auth from "./pages/Auth";

export const authRoutes = [
    // {
    //     path: MAIN_ROUTE,
    //     Component: Main
    // },


    {
        path: BILL_ROUTE,
        Component: Bill
    },
    {
        path: CARD_ROUTE,
        Component: Card
    },
    {
        path: TRANSACTIONS_ROUTE,
        Component: Transactions
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    }
]

export const publicRoutes = [

    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]