import { useState } from "react";

function Size({setSize}) {
    let [size,Size]=useState('');
    let [inputErr, setInputErr] = useState(false);

    function handleSizeChange(e) {
        Size(e.target.value);
    }
    
    function checkInput() {
        const intSize = parseInt(size, 10);
        if (isNaN(intSize) || intSize < 3) {
          setInputErr(true);
        } else {
          setInputErr(false);
          setSize(intSize);
        }
    }

    return(
        <div className="size">
          <h3 className="size_name">
            <span className="Enter_size">Enter size:{' '}</span>
            <input
              value={size}
              onChange={handleSizeChange}
              placeholder="________"
              className="size_input"
              type="text"
            />
            <span onClick={checkInput} className="go_btn">→</span>
          </h3>
          {inputErr && <h1 className='error'>Size must be at least 3</h1>}
        </div>
    )
}

export default Size;