import express from "express";
import cors from "cors";

export const apiCore = express();

apiCore.use(express.json());
apiCore.use(cors());

apiCore.listen(8800, (err) => {
    console.log(`http://localhost:8800`)
});
