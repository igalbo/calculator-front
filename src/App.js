import { useRef, useState } from "react";
import "./App.css";

function App() {
  const formEl = useRef();
  const [result, setResult] = useState();

  const url = "http://localhost:5000";

  const calculate = async (request) => {
    const response = await fetch(`${url}/calc/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    console.log(data);
    setResult(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formEl.current.elements);

    const reqData = {
      num1: formEl.current.elements[0].value,
      num2: formEl.current.elements[2].value,
      oper: formEl.current.elements[1].value,
    };

    console.log(reqData);
    calculate(reqData);
  };
  return (
    <div className="App">
      <h1>Calculator</h1>
      <form ref={formEl} onSubmit={handleSubmit}>
        <input type="text" id="first" />
        <select id="operation" name="operation">
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input type="text" id="second" />
        <input type="submit" value="Submit" />
      </form>
      <h1>{result}</h1>
    </div>
  );
}

export default App;
