import { BiBorderRight } from "react-icons/bi";

export const tableCustomStyles = {

    
    headCells: {
        style: {
            backgroundColor: 'gray',
            color: 'white',
            borderBottom: '2px solid #282c34',
            borderRight: '2px solid #282c34',
            borderLeft: '2px solid #282c34',
            fontSize: '20px',
        }
    },
    rows: {
        style: {
            backgroundColor: 'white',
            color: 'black',
            borderBottom: '2px solid #282c34',
            borderRight: '2px solid #282c34',
            borderLeft: '2px solid #282c34',
            fontSize: '18px',
        },
        pagination: {
            style: {
                backgroundColor: 'black',
                color: 'black',
                borderTop: '2px solid #282c34'
            },
            pageButtonsStyle: {
                color: 'black', // Gri închis
            }
        },
    }
}