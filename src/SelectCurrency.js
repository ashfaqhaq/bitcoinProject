import React ,{useState} from 'react'
import supported_currencies from "./data/currency";

const Curency = () => {
    const listItems = supported_currencies.map((items) => (
  <option value={items.currency}>{items.country}</option>
));
return listItems;
};


function SelectCurrency({selection}) {
    const [compSelection, setCompSelection] = useState('')
    setCompSelection(selection)
    const handleChange = (e) => {
        // console.log(selection);
        
          setCompSelection(e.target.value)
      
        // console.log(this.state.temp_input);
      };
    return (
        <div>
        <select value={setCompSelection} onChange={handleChange}>
        {/* <select id ="country" value={this.state.temp_input} onChange={this.handleChange}  > */}
        <option value="" disabled>
          Select an option
        </option>

      </select>
      <Curency/>
        </div>
    )
}

export default SelectCurrency
