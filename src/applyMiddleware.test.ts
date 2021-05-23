import applyMiddleware from "./applyMiddleware";
import {State} from "./types";


describe( "applyMiddleware must be function", () => {


    test("function type" , () => {
        expect(applyMiddleware).toBeInstanceOf(Function)
        expect(applyMiddleware(jest.fn(), jest.fn())).toBeInstanceOf(Function)
    })


    test(" test created function" , () => {

        let createStore = applyMiddleware(jest.fn(), jest.fn());

        let reducer = jest.fn();
        let state: State = {

        };

        let storeCreator = jest.fn().mockReturnValue(
            {
                dispatch: jest.fn()
            }
        )

        console.log( '*',createStore.toString())
       let store =  createStore(storeCreator);
        console.log("****************\n", JSON.stringify(store.toString() ))

        expect(1).toEqual(1);




    })


})
