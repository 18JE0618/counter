import React from "react";
import { Value } from "./counter";
const counterValue = () => {
    return (
        <>
            <Value.Consumer>
                {(value) => {
                    return <p className='countervalue'>Counter value : {value}</p>;
                }}
            </Value.Consumer>
        </>
    );
};
export default counterValue;