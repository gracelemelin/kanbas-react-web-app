import React from "react";
import { useParams } from "react-router";

function Add() {
    const{a, b} = useParams();
    return (
        <>
        <h2>Add Path Parameters</h2>
        {a} + {b} = {parseInt(a as string) + parseInt(b as string)}
        </>
    );
}
export default Add;