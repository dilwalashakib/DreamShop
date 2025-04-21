import { connect, connection } from "mongoose";

export default function dbConnect() {
    try {
        if(connection.readyState >= 1) {
            console.log("Database Already Connected Successfully!");
            return;
        } else {
            connect(process.env.DB_URL)
                .then(() => console.log("Database Connected Successfully"))
                .catch(() => console.log("Database not connected !"))
        
            connection('disconnected', () => console.log('Database disonnected'));
        }        
    } catch(err) {
        console.log(err.messege);
        return;
    }
}