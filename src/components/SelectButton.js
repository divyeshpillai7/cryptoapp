import React from 'react'
import { styled } from '@mui/material'

const SelectButton = ({ children, selected, onClick }) => {

    const Button = styled('span')(({ theme }) => ({
        border: "2px solid #01141B",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Poppins",
        cursor: "pointer",
        backgroundColor: selected ? "#01141B" : "",
        color: selected ? "white" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
            backgroundColor: "#01141B",
            color: "white",
        },
        width: "22%",
        margin: 5,

    }))

    return (
        <Button onClick={onClick}>{children}</Button>
    )
}

export default SelectButton