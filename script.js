// Toggle navbar visibility on mobile
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

// Toggle the 'active' class when the hamburger is clicked
hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
});





// Function to visualize Fibonacci series
function visualizeFibonacci() {
  const n = document.getElementById('terms').value;
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';  // Clear previous output

  if (n <= 1) {
      outputDiv.innerHTML = 'Please enter a number greater than 1.';
      return;
  }

  let fib = [0, 1];
  let i = 2;

  outputDiv.innerHTML += `<button class="fibonacci-step">0</button>`;
  setTimeout(() => {
      outputDiv.innerHTML += `<button class="fibonacci-step">1</button>`;
      outputDiv.scrollTop = outputDiv.scrollHeight;  // Auto-scroll to the latest element
  }, 1000);

  function displayNextStep() {
      if (i < n) {
          fib[i] = fib[i - 1] + fib[i - 2];
          outputDiv.innerHTML += `<button class="fibonacci-step">${fib[i - 2]} + ${fib[i - 1]} = ${fib[i]}</button>`;
          i++;
          outputDiv.scrollTop = outputDiv.scrollHeight;  // Auto-scroll to the latest element
          setTimeout(displayNextStep, 500); 
      } else {
          outputDiv.innerHTML += `<button class="fibonacci-step">Fibonacci Series : ${fib.join(', ')}</button>`;
          outputDiv.scrollTop = outputDiv.scrollHeight;  // Auto-scroll to the final element
      }
  }
  
  setTimeout(displayNextStep, 2000); 
}

  // Function to check palindrome
  function checkPalindrome() {
    const inputValue = document.getElementById('inputValue').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML="";
    if (!inputValue) {
      outputDiv.innerHTML = '<p class="palindrome-step">Please enter a valid string or number.</p>';
      return;
    }
   // Convert to lowercase
   let inputValue1 = inputValue.toLowerCase();

   // Reverse the string
   const reversedValue = inputValue1.split('').reverse().join('');
    outputDiv.innerHTML += `<p class="palindrome-step">Original: ${inputValue1}</p>`;
    
    setTimeout(() => {
      outputDiv.innerHTML += `<p class="palindrome-step">Reversed: ${reversedValue}</p>`;
    }, 1000);
  
    setTimeout(() => {
      if (inputValue1 === reversedValue) {
        outputDiv.innerHTML += `<p class="palindrome-step">It's a Palindrome!</p>`;
      } else {
        outputDiv.innerHTML += `<p class="palindrome-step">It's not a Palindrome.</p>`;
      }
    }, 2000);
  }
  


  // Function to generate matrices
  function generateMatrices() {
    let n = parseInt(document.getElementById('n').value);
    let m = parseInt(document.getElementById('m').value);
    let p = parseInt(document.getElementById('p').value);

    let matrixA = document.getElementById('matrixA');
    matrixA.innerHTML = '<h3>Matrix A (' + n + ' x ' + m + ')</h3>';
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        matrixA.innerHTML += `<input type="number" id="a${i}${j}" value="0">`;
      }
      matrixA.innerHTML += '<br>';
    }

    let matrixB = document.getElementById('matrixB');
    matrixB.innerHTML = '<h3>Matrix B (' + m + ' x ' + p + ')</h3>';
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < p; j++) {
        matrixB.innerHTML += `<input type="number" id="b${i}${j}" value="0">`;
      }
      matrixB.innerHTML += '<br>';
    }
  }

  async function multiplyMatrices() {
    let n = parseInt(document.getElementById('n').value);
    let m = parseInt(document.getElementById('m').value);
    let p = parseInt(document.getElementById('p').value);

    let resultMatrix = document.getElementById('resultMatrix');
    resultMatrix.innerHTML = '<h3>Result Matrix (' + n + ' x ' + p + ')</h3>';
    let result = Array.from({ length: n }, () => Array(p).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < p; j++) {
        result[i][j] = 0;
        for (let k = 0; k < m; k++) {
          let aElement = document.getElementById(`a${i}${k}`);
          let bElement = document.getElementById(`b${k}${j}`);
          let a = parseFloat(aElement.value);
          let b = parseFloat(bElement.value);

          aElement.classList.add('highlight');
          bElement.classList.add('highlight');
          result[i][j] += a * b;
          await new Promise(r => setTimeout(r, 1000));

          aElement.classList.remove('highlight');
          bElement.classList.remove('highlight');
        }
        resultMatrix.innerHTML += `<input type="number" value="${result[i][j]}" readonly> `;
      }
      resultMatrix.innerHTML += '<br>';
    }
  }


  // stressen Matrix Multiplication

  function highlightInputs(ids) {
    // Remove highlight from all inputs
    document.querySelectorAll('.matrix input').forEach(input => {
        input.classList.remove('highlight');
    });
    // Add highlight to the specified inputs
    ids.forEach(id => {
        document.getElementById(id).classList.add('highlight');
    });
}

async function showStrassenCalculation() {
    // Get values from Matrix A
    let a00 = parseFloat(document.getElementById('a00').value);
    let a01 = parseFloat(document.getElementById('a01').value);
    let a10 = parseFloat(document.getElementById('a10').value);
    let a11 = parseFloat(document.getElementById('a11').value);

    // Get values from Matrix B
    let b00 = parseFloat(document.getElementById('b00').value);
    let b01 = parseFloat(document.getElementById('b01').value);
    let b10 = parseFloat(document.getElementById('b10').value);
    let b11 = parseFloat(document.getElementById('b11').value);

    // Calculation details container
    const calculationDetails = document.getElementById('calculationDetails');
    calculationDetails.innerHTML = '';

    // M1 calculation
    let M1 = (a00 + a11) * (b00 + b11);
    calculationDetails.innerHTML += `<p class="mt-1">M<sub>1</sub> = (a<sub>00</sub> + a<sub>11</sub>) * (b<sub>00</sub> + b<sub>11</sub>) = (${a00} + ${a11}) * (${b00} + ${b11}) = ${M1}</p>`;
    highlightInputs(['a00', 'a11', 'b00', 'b11']);
    await new Promise(resolve => setTimeout(resolve, 2000));
    calculationDetails.scrollTop = calculationDetails.scrollHeight;

    // M2 calculation
    let M2 = (a10 + a11) * b00;
    calculationDetails.innerHTML += `<p>M<sub>2</sub> = (a<sub>10</sub> + a<sub>11</sub>) * b<sub>00</sub> = (${a10} + ${a11}) * ${b00} = ${M2}</p>`;
    highlightInputs(['a10', 'a11', 'b00']);
    await new Promise(resolve => setTimeout(resolve, 2000));
    calculationDetails.scrollTop = calculationDetails.scrollHeight;

    // M3 calculation
    let M3 = a00 * (b01 - b11);
    calculationDetails.innerHTML += `<p>M<sub>3</sub> = a<sub>00</sub> * (b<sub>01</sub> - b<sub>11</sub>) = ${a00} * (${b01} - ${b11}) = ${M3}</p>`;
    highlightInputs(['a00', 'b01', 'b11']);
    await new Promise(resolve => setTimeout(resolve, 2000));
    calculationDetails.scrollTop = calculationDetails.scrollHeight;

    // M4 calculation
    let M4 = a11 * (b10 - b00);
    calculationDetails.innerHTML += `<p>M<sub>4</sub> = a<sub>11</sub> * (b<sub>10</sub> - b<sub>00</sub>) = ${a11} * (${b10} - ${b00}) = ${M4}</p>`;
    highlightInputs(['a11', 'b10', 'b00']);
    await new Promise(resolve => setTimeout(resolve, 2000));
    calculationDetails.scrollTop = calculationDetails.scrollHeight;

    // M5 calculation
    let M5 = (a00 + a01) * b11;
    calculationDetails.innerHTML += `<p>M<sub>5</sub> = (a<sub>00</sub> + a<sub>01</sub>) * b<sub>11</sub> = (${a00} + ${a01}) * ${b11} = ${M5}</p>`;
    highlightInputs(['a00', 'a01', 'b11']);
    await new Promise(resolve => setTimeout(resolve, 2000));
    calculationDetails.scrollTop = calculationDetails.scrollHeight;

    // M6 calculation
    let M6 = (a10 - a00) * (b00 + b01);
    calculationDetails.innerHTML += `<p>M<sub>6</sub> = (a<sub>10</sub> - a<sub>00</sub>) * (b<sub>00</sub> + b<sub>01</sub>) = (${a10} - ${a00}) * (${b00} + ${b01}) = ${M6}</p>`;
    highlightInputs(['a10', 'a00', 'b00', 'b01']);
    await new Promise(resolve => setTimeout(resolve, 2000));
    calculationDetails.scrollTop = calculationDetails.scrollHeight;

    // M7 calculation
    let M7 = (a01 - a11) * (b10 + b11);
    calculationDetails.innerHTML += `<p>M<sub>7</sub> = (a<sub>01</sub> - a<sub>11</sub>) * (b<sub>10</sub> + b<sub>11</sub>) = (${a01} - ${a11}) * (${b10} + ${b11}) = ${M7}</p>`;
    highlightInputs(['a01', 'a11', 'b10', 'b11']);
    await new Promise(resolve => setTimeout(resolve, 2000));
    calculationDetails.scrollTop = calculationDetails.scrollHeight;

    // Calculate C matrix
    let c00 = M1 + M4 - M5 + M7;
    let c01 = M3 + M5;
    let c10 = M2 + M4;
    let c11 = M1 - M2 + M3 + M6;

    // Display results one by one with delay
    calculationDetails.innerHTML += `<p>C<sub>00</sub> = M<sub>1</sub> + M<sub>4</sub> - M<sub>5</sub> + M<sub>7</sub> = ${M1} + ${M4} - ${M5} + ${M7} = ${c00}</p>`;
    highlightInputs(['a00', 'a11', 'b00', 'b11']);
    await new Promise(resolve => setTimeout(resolve, 1000));
    calculationDetails.scrollTop = calculationDetails.scrollHeight; // Wait 1 second before displaying C01

    calculationDetails.innerHTML += `<p>C<sub>01</sub> = M<sub>3</sub> + M<sub>5</sub> = ${M3} + ${M5} = ${c01}</p>`;
    highlightInputs(['a00', 'a01', 'b11']);
    await new Promise(resolve => setTimeout(resolve, 1000));
    calculationDetails.scrollTop = calculationDetails.scrollHeight; // Wait 1 second before displaying C10

    calculationDetails.innerHTML += `<p>C<sub>10</sub> = M<sub>2</sub> + M<sub>4</sub> = ${M2} + ${M4} = ${c10}</p>`;
    highlightInputs(['a10', 'a11', 'b00']);
    await new Promise(resolve => setTimeout(resolve, 1000));
    calculationDetails.scrollTop = calculationDetails.scrollHeight; // Wait 1 second before displaying C11

    calculationDetails.innerHTML += `<p>C<sub>11</sub> = M<sub>1</sub> - M<sub>2</sub> + M<sub>3</sub> + M<sub>6</sub> = ${M1} - ${M2} + ${M3} + ${M6} = ${c11}</p>`;
    highlightInputs(['a10', 'a11', 'b01']);
    await new Promise(resolve => setTimeout(resolve, 1000));
    calculationDetails.scrollTop = calculationDetails.scrollHeight; // Final wait before removing highlights

    // Display results in the result matrix
    document.getElementById('c00').value = c00;
    document.getElementById('c01').value = c01;
    document.getElementById('c10').value = c10;
    document.getElementById('c11').value = c11;

    // Remove highlights after calculation
    highlightInputs([]);
}
