import React from 'react'

class TableRow extends React.Component {
    render() {
        var row = this.props.row;
        console.log(row)
        return (
           
            <tr>
                {row.map(row => <td>{row.title}</td>)}
            </tr>
        )
    }
}

export default TableRow