import React from 'react'

export default class CaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onCaseChange(e.target.value);
    };
  
    render() {
        const casus = this.props.case;
        return (
            <div>
            Casus 
            <select value={casus} onChange={this.handleChange}>
                  <option value="1">Casus 1</option>
                  <option value="2">Casus 2</option>
                  <option value="10">Casus 10</option>
                  <option value="11">Casus 11</option>
                  <option value="12">Casus 12</option>
              </select>
            </div>
      );
    }
}