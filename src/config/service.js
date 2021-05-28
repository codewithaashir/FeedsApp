/* eslint-disable handle-callback-err */
/* eslint-disable prettier/prettier */
import { Apis } from './apis';

export const Service = {
    getNews: async (page,setLoading) => {
        setLoading(true);
        try {
            let Data = await fetch(Apis.getNews + `${page}.json`);
            setLoading(false);
            Data = await Data.json();
            return Data;
        } catch (error) {
            console.log(error);
        }
    },
    getNewest: async (page,setLoading) => {
        setLoading(true);
        try {
            let Data = await fetch(Apis.getNewest + `${page}.json`);
            setLoading(false);
            Data = await Data.json();
            return Data;
        } catch (error) {
            console.log(error);
        }

    },
};
