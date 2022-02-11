import React from 'react'
import TableRow from './TableRow';

class Table extends React.Component {
    render() {
        var heading = this.props.heading;
        var body = this.props.body;
        console.log(heading);
        console.log(body);
        return (
            <table style={{ width: 500 }}>
                <thead>
                    <tr>
                        {heading.map(head => <th>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {body.map(row => <TableRow row={row} />)}
                </tbody>
            </table>
        );
    }
}

export default Table