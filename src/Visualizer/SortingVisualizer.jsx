import React, { useEffect, useState } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import useSound from "use-sound";
import Sound1 from "../sounds/sound1.wav";
import Sound2 from "../sounds/sound2.wav";

const ARRAY_SIZE = 100;
function SortingVisualizer() {
  const [primaryArray, setPrimaryArray] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(40);
  const [sound, setSound] = useState(true);
  const [algorithm, setAlgorithm] = useState({});

  const [playBeep1] = useSound(Sound1, { volume: sound ? 0.15 : 0 });
  const [playBeep2] = useSound(Sound2, { volume: sound ? 0.05 : 0 });

  useEffect(() => {
    randomizeArray();
  }, []);

  function randomizeArray() {
    for (var i = 0; i < primaryArray.length; i++) {
      var bar = document.getElementById(i).style;
      bar.backgroundColor = "#ff7f50";
    }
    var array = [];
    for (i = 0; i < ARRAY_SIZE; i++) {
      array.push(randomVals(20, 400));
    }
    setPrimaryArray(array);
  }

  function randomVals(min, max) {
    var randomVal = Math.floor(Math.random() * (max - min + 1) + min);
    return randomVal;
  }

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async function finishedAnimation() {
    for (var i = 0; i < primaryArray.length; i++) {
      var bar = document.getElementById(i).style;
      bar.backgroundColor = "green";
      playBeep1();
      await sleep(animationSpeed);
    }
  }

  async function bubbleSort() {
    var currentArr = primaryArray;

    var sorted = false;

    setAlgorithm({ name: "Bubble Sort", timeComplexity: "O(n^2)" });

    while (!sorted) {
      sorted = true;

      for (var i = 0; i < currentArr.length - 1; i++) {
        if (currentArr[i] > currentArr[i + 1]) {
          var swap1 = currentArr[i];
          var swap2 = currentArr[i + 1];
          currentArr[i] = swap2;
          currentArr[i + 1] = swap1;
          setPrimaryArray([...primaryArray, currentArr]);

          let bar1 = document.getElementById(i).style;
          let bar2 = document.getElementById(i + 1).style;
          bar1.backgroundColor = "#DC143C";
          bar2.backgroundColor = "#6A5ACD";

          await sleep(animationSpeed);

          bar1.backgroundColor = "#FF7F50";
          bar2.backgroundColor = "#FF7F50";

          sorted = false;
          playBeep1();
        }
        playBeep2();
      }
      if (sorted) finishedAnimation();
    }
  }

  async function heapSort() {
    var arr = primaryArray;

    var length = arr.length;
    var index = Math.floor(length / 2 - 1);
    var lastChild = length - 1;

    setAlgorithm({ name: "Heap Sort", timeComplexity: "O(nlog(n))" });

    while (index >= 0) {
      heapify(arr, length, index);
      index--;

      setPrimaryArray([...primaryArray, arr]);

      if (index >= 0) {
        let bar1 = document.getElementById(index).style;
        let bar2 = document.getElementById(index + 1).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        await sleep(animationSpeed);

        playBeep1();

        bar1.backgroundColor = "#FF7F50";
        bar2.backgroundColor = "#FF7F50";
      } else {
        await sleep(animationSpeed);
      }
    }

    while (lastChild >= 0) {
      var swap1 = arr[0];
      var swap2 = arr[lastChild];

      arr[0] = swap2;
      arr[lastChild] = swap1;
      heapify(arr, lastChild, 0);
      lastChild--;
      playBeep2();

      setPrimaryArray([...primaryArray, arr]);

      if (index >= 0) {
        let bar1 = document.getElementById(lastChild).style;
        let bar2 = document.getElementById(0).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        bar1.backgroundColor = "#FF7F50";
        bar2.backgroundColor = "#FF7F50";
      } else {
        await sleep(animationSpeed);
      }
    }

    finishedAnimation();
  }

  async function heapify(arr, length, index) {
    var largest = index;

    var leftNode = index * 2 + 1;

    var rightNode = leftNode + 1;

    if (arr[leftNode] > arr[largest] && leftNode < length) {
      largest = leftNode;
    }

    if (arr[rightNode] > arr[largest] && rightNode < length) {
      largest = rightNode;
    }

    if (largest !== index) {
      var swap1 = arr[index];
      var swap2 = arr[largest];

      arr[index] = swap2;
      arr[largest] = swap1;

      heapify(arr, length, largest);
    }

    return arr;
  }

  function mergeSort(array) {
    setAlgorithm({ name: "Merge Sort", timeComplexity: "O(nlog(n))" });
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();

    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);

    return array;
  }

  async function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray) {
    if (startIdx === endIdx) return;

    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);

    await sleep(animationSpeed);
    playBeep2();
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
  }

  function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
      playBeep1();
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        mainArray[k++] = auxiliaryArray[i++];
        setPrimaryArray([...primaryArray, mainArray]);
        let bar1 = document.getElementById(k).style;
        let bar2 = document.getElementById(i).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        setTimeout(() => {
          bar1.backgroundColor = "#ff7f50";
          bar2.backgroundColor = "#ff7f50";
        }, 800);
      } else {
        mainArray[k++] = auxiliaryArray[j++];
        setPrimaryArray([...primaryArray, mainArray]);
        let bar1 = document.getElementById(k).style;
        let bar2 = document.getElementById(i).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";
        setTimeout(() => {
          bar1.backgroundColor = "#ff7f50";
          bar2.backgroundColor = "#ff7f50";
        }, 200);
      }
    }

    mergeBack(i, j, k, middleIdx, endIdx, mainArray, auxiliaryArray);
  }

  function mergeBack(i, j, k, midIndex, endIndex, mainArray, auxiliaryArray) {
    while (i <= midIndex) {
      mainArray[k++] = auxiliaryArray[i++];
      setPrimaryArray([...primaryArray, mainArray]);
    }
    while (j <= endIndex) {
      mainArray[k++] = auxiliaryArray[j++];
      setPrimaryArray([...primaryArray, mainArray]);
    }
  }

  function quickSort() {
    setAlgorithm({ name: "Quick Sort", timeComplexity: "O(nlog(n))" });
    var currentArr = primaryArray;
    var left = 0;
    var right = currentArr.length - 1;

    sort(currentArr, left, right);
    setTimeout(finishedAnimation, 2500);
  }

  async function sort(arr, left, right) {
    if (left < right) {
      var partitionIndex = partition(arr, left, right);

      setPrimaryArray([...primaryArray, arr]);
      await sleep(animationSpeed + 100);
      playBeep2();
      sort(arr, left, partitionIndex - 1);
      sort(arr, partitionIndex + 1, right);
    }
  }

  function partition(arr, left, right) {
    var pivot = arr[right];
    var i = left - 1;
    playBeep1();
    for (var j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++;
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        let bar1 = document.getElementById(i).style;
        let bar2 = document.getElementById(j).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        setTimeout(() => {
          bar1.backgroundColor = "#ff7f50";
          bar2.backgroundColor = "#ff7f50";
        }, 200);

        setPrimaryArray([...primaryArray, arr]);
      }
    }

    temp = arr[i + 1];
    arr[i + 1] = arr[right];
    arr[right] = temp;

    return i + 1;
  }

  function radixCaller() {
    setAlgorithm({ name: "Radix Sort", timeComplexity: "O(log10(n))" });
    var currentArr = primaryArray;
    radixSort(currentArr);
  }

  async function radixSort(arr) {
    const max = getMax(arr);

    for (let i = 0; i < max; i++) {
      let buckets = Array.from({ length: 10 }, () => []);
      for (let j = 0; j < arr.length; j++) {
        buckets[getPosition(arr[j], i)].push(arr[j]);
        var bar = document.getElementById(i).style;
        bar.backgroundColor = "#6A5ACD";
      }

      await sleep(animationSpeed + 300);

      var animArr = [];
      for (var c = 0; c < ARRAY_SIZE / 10; c++) {
        animArr.push(randomVals(0, ARRAY_SIZE - 1));
      }

      animArr.forEach((val) => {
        var bar = document.getElementById(val).style;
        bar.backgroundColor = "#DC143C";
        playBeep1();
      });

      var animArr2 = [];
      for (c = 0; c < ARRAY_SIZE / 10; c++) {
        animArr2.push(randomVals(0, ARRAY_SIZE - 1));
      }

      animArr2.forEach((val) => {
        var bar = document.getElementById(val).style;
        bar.backgroundColor = "#6A5ACD";
        playBeep2();
      });

      arr = [].concat(...buckets);
      setPrimaryArray(arr);
    }

    finishedAnimation();

    return arr;
  }

  function getMax(arr) {
    let max = 0;
    for (let num of arr) {
      if (max < num.toString().length) {
        max = num.toString().length;
      }
    }
    return max;
  }

  function getPosition(num, place) {
    var result = Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
    return result;
  }

  return (
    <div className="sortingVisualizer">
      <div className="header">
        <div className="header-btn">
          <button onClick={randomizeArray}>New Array</button>
          <button onClick={bubbleSort}>Bubble Sort</button>
          <button onClick={heapSort}>Heap Sort</button>
          <button
            onClick={() => {
              mergeSort(primaryArray);
              setTimeout(finishedAnimation, 2000);
            }}
          >
            Merge Sort
          </button>
          <button onClick={quickSort}>Quick Sort</button>
          <button onClick={radixCaller}>Radix Sort</button>
        </div>
      </div>

      <div className="controllers">
        <button
          id="restart"
          onClick={() => {
            window.location.reload(false);
          }}
        >
          Restart
        </button>
        <div id="velocity">
          <button
            onClick={() => {
              setAnimationSpeed(80);
            }}
            id={animationSpeed === 80 ? "selected" : ""}
          >
            Slow
          </button>
          <button
            onClick={() => {
              setAnimationSpeed(40);
            }}
            id={animationSpeed === 40 ? "selected" : ""}
          >
            Medium
          </button>
          <button
            onClick={() => {
              setAnimationSpeed(5);
            }}
            id={animationSpeed === 5 ? "selected" : ""}
          >
            Fast
          </button>
        </div>
        <div className="toggle">
          <Toggle
            defaultChecked={sound}
            icons={false}
            onChange={() => {
              setSound(!sound);
            }}
          />
          <span id="soundLabel">Sound {sound ? "On" : "Off"}</span>
        </div>
      </div>
      <div className="array-container">
        {primaryArray &&
          primaryArray.map((val, key) => {
            return (
              <div
                className="bar"
                id={key}
                key={key}
                style={{ height: val }}
              ></div>
            );
          })}
      </div>
      {algorithm.name !== undefined && (
        <div className="algorithmInfo">
          <>
            <div id="name">Algorithm: {algorithm.name}</div>
            <div id="timeComplexity">
              Time Complexity: {algorithm.timeComplexity}{" "}
            </div>
          </>
        </div>
      )}
    </div>
  );
}

export default SortingVisualizer;
