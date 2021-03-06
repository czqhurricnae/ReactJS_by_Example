import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import $ from "jquery";

// function Heading(props) {
//         return (<th>{props.heading}</th>);
// }

// function Row(props) {
//         return (
//                 <tr>
//                 <td>{props.changeSet.when}</td>
//                 <td>{props.changeSet.who}</td>
//                 <td>{props.changeSet.description}</td>
//                 </tr>
//         );
// }

// function Headings(props) {
//         let headings = props.headings;
//         headings = headings.map((value, index) => (
//             <Heading heading={value}/>
//         ));
//         return (
//                 <thead>
//                 <tr>
//                 {headings}
//                 </tr>
//                 </thead>
//         );
// }

// function Rows(props) {
//         let rows = props.rows;
//         rows = rows.map((value, index) => (
//             <Row changeSet={value}/>
//         ));
//         return (
//                 <tbody>
//                 {rows}
//                 </tbody>
//         );
// }

RecentChangesTable.Heading = class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<th>{this.props.heading}</th>);
    }
};

RecentChangesTable.Row = class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <tr>
                <td>{this.props.changeSet.when}</td>
                <td>{this.props.changeSet.who}</td>
                <td>{this.props.changeSet.description}</td>
                </tr>
        );
    }
};

RecentChangesTable.Headings = class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let headings = this.props.headings.map((heading, index) =>
                           {return (<RecentChangesTable.Heading
                                    key={index}
                                    heading={heading} />);}
        );

        return (
            <thead className="tableHeadings">
                <tr>
                    {headings}
                </tr>
            </thead>
        );
    }
};

RecentChangesTable.Rows = class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rows = this.props.rows.map((value, index) =>
                       {return (<RecentChangesTable.Row
                                key={index}
                                changeSet={value} />);}
        );

        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
};

function RecentChangesTable(props) {
    return (<table className="recentChangesTable">{props.children}</table>);
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state  = {"changeSets": this.props.data};
        // this.mapOpenLibraryDataToChangeSet.bind(this);
    }

    mapOpenLibraryDataToChangeSet(data) {
        return data.map(function(change, index) {
            return ({"when": change.timestamp,
                    "who": change.author.key,
                    "description": change.comment});
        });
    }

    render() {
        return (
                <div>
                    <h1>
                        {this.props.title}
                    </h1>
                    <RecentChangesTable>
                        <RecentChangesTable.Headings />
                        <RecentChangesTable.Rows rows={this.state.changeSets} />
                    </RecentChangesTable>
                </div>
        );
    }

    componentDidMount() {
        $.ajax({
            url: "http://openlibrary.org/recentchanges.json?limit=20",
            dataType: "json",
            type: "GET"
        }).done((data) => {
            var changeSets = this.mapOpenLibraryDataToChangeSet(data);
            this.setState({"changeSets": changeSets});
            console.log(changeSets);
        });
    }
};

RecentChangesTable.Headings.defaultProps = {
    headings: ["When happened", "Who did it", "What they change"]
};

export default App;
