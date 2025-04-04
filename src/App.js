import { cloneDeep, isEqual } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import BlogBox from './components/blog-box'
import BlogCard from './components/blog-card'
// import AdSense from 'react-adsense'
import { makepuzzle } from 'sudoku'
import './App.css'

const BLOGS = [
  {
    title: "Sudoku 101",
    img: "/blog-heros/begginers_guide.jpeg",
    link: "/blogs/beginners-guide"
  },
  {
    title: "The Benefits of Sudoku",
    img: "/blog-heros/benefits.jpeg",
    link: "/blogs/benefits"
  },
  {
    title: "The History of Sudoku",
    img: "/blog-heros/history.jpeg",
    link: "blogs/history"
  },
  {
    title: "Advanced Sudoku Solving Techniques",
    img: "/blog-heros/advanced_techniques.jpeg",
    link: "blogs/advanced-techniques"
  }
]

const DEFAULT_STATE = Array(9)
  .fill([])
  .map(() => Array(9)
    .fill({})
    .map(() => ({ value: "", possibilities: [] }))
  )

let backupStates = []

const App = () => {
  const [state, setState] = useState(DEFAULT_STATE)
  const [invalidRow, setInvalidRow] = useState(9)
  const [invalidCol, setInvalidCol] = useState(9)
  const [invalidBox, setInvalidBox] = useState(9)
  const [showHelp, setShowHelp] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState(0)
  const inputRefs = useRef([])

  useEffect(() => {
    for (let i = 0; i < 9; i += 1) {
      const row = []
      for (let j = 0; j < 9; j += 1) {
        if (state[i][j].value) {
          row.push(+state[i][j].value)
        }
      }
      const validateRow = [...new Set(row)]
      if (row.length !== validateRow.length) {
        setInvalidRow(i)
        break
      } else {
        setInvalidRow(9)
      }
    }

    for (let j = 0; j < 9; j += 1) {
      const col = []
      for (let i = 0; i < 9; i += 1) {
        if (state[i][j].value) {
          col.push(+state[i][j].value)
        }
      }
      const validateCol = [...new Set(col)]
      if (col.length !== validateCol.length) {
        setInvalidCol(j)
        break
      } else {
        setInvalidCol(9)
      }
    }

    for (let boxNumber = 0; boxNumber < 9; boxNumber += 1) {
      const { boxRow, boxCol } = getBoxRowCol(boxNumber)
      const box = []
      for (let i = boxRow * 3; i < (boxRow + 1) * 3; i += 1) {
        for (let j = boxCol * 3; j < (boxCol + 1) * 3; j += 1) {
          if (state[i][j].value) {
            box.push(+state[i][j].value)
          }
        }
      }
      const validateBox = [...new Set(box)]
      if (box.length !== validateBox.length) {
        setInvalidBox(boxNumber)
        break
      } else {
        setInvalidBox(9)
      }
    }
  }, [state])

  const setCellValue = ({ value, i, j }) => {
    if ((+value > 0 && +value < 10) || value === "") {
      const currentState = cloneDeep(state)
      currentState[i][j].value = value
      setSelectedNumber(value)
      setState(currentState)
      if (showHelp) {
        addPossibilities({
          currentState: cloneDeep(currentState),
          showHelp: true
        })
      }
    }
  }

  const getBoxRowCol = (num) => {
    const boxRow = Math.floor(num / 3)
    const boxCol = (num % 3)
    return { boxRow, boxCol }
  }

  const getBoxNumber = ({ boxRow, boxCol }) => boxRow * 3 + boxCol

  const removePossibilities = ({
    currentState,
    rowNumber,
    colNumber,
    value
  }) => {
    for (let j = 0; j < 9; j += 1) {
      currentState[rowNumber][j].possibilities =
        currentState[rowNumber][j].possibilities.filter((p) => p !== +value)
    }
    for (let i = 0; i < 9; i += 1) {
      currentState[i][colNumber].possibilities =
        currentState[i][colNumber].possibilities.filter((p) => p !== +value)
    }
    const boxRow = Math.floor(rowNumber / 3)
    const boxCol = Math.floor(colNumber / 3)
    for (let i = boxRow * 3; i < (boxRow + 1) * 3; i += 1) {
      for (let j = boxCol * 3; j < (boxCol + 1) * 3; j += 1) {
        currentState[i][j].possibilities =
          currentState[i][j].possibilities.filter((p) => p !== +value)
      }
    }
  }

  const tryFirstTwoPossibilities = (inputState, first) => {
    const currentState = cloneDeep(inputState)
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        const { possibilities } = currentState[i][j]
        if (possibilities.length === 2) {
          if (first) {
            currentState[i][j] = {
              value: `${possibilities[0]}`,
              possibilities: []
            }
            removePossibilities({
              currentState,
              rowNumber: i,
              colNumber: j,
              value: `${possibilities[0]}`
            })
          } else {
            currentState[i][j] = {
              value: `${possibilities[1]}`,
              possibilities: []
            }
            removePossibilities({
              currentState,
              rowNumber: i,
              colNumber: j,
              value: `${possibilities[1]}`
            })
          }
          solve(currentState)
          return
        }
      }
    }
    setState(currentState)
  }

  const validateSolution = (inputState) => {
    const currentState = cloneDeep(inputState)
    let valid = true
    for (let i = 0; i < 9; i += 1) {
      const rowNums = []
      const colNums = []
      for (let j = 0; j < 9; j += 1) {
        if (currentState[i][j].value) {
          rowNums.push(+currentState[i][j].value)
        }
        for (const num of currentState[i][j].possibilities) {
          rowNums.push(num)
        }
        if (currentState[j][i].value) {
          colNums.push(+currentState[j][i].value)
        }
        for (const num of currentState[j][i].possibilities) {
          colNums.push(num)
        }
      }
      if (!isEqual([...new Set(rowNums)].sort(), [1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        valid = false
      }
      if (!isEqual([...new Set(colNums)].sort(), [1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        valid = false
      }
    }
    for (let boxNumber = 0; boxNumber < 9; boxNumber += 1) {
      const { boxRow, boxCol } = getBoxRowCol(boxNumber)
      const boxNums = []
      for (let i = boxRow * 3; i < ((boxRow + 1) * 3); i += 1) {
        for (let j = boxCol * 3; j < ((boxCol + 1) * 3); j += 1) {
          if (currentState[i][j].value) {
            boxNums.push(+currentState[i][j].value)
          }
          for (const num of currentState[i][j].possibilities) {
            boxNums.push(num)
          }
        }
      }
      if (!isEqual([...new Set(boxNums)].sort(), [1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        valid = false
      }
    }
    return valid
  }

  const removeValueFromRowPositions = ({
    currentState,
    rowNumber,
    exceptions,
    value
  }) => {
    for (let j = 0; j < 9; j += 1) {
      if (!exceptions.includes(j)) {
        currentState[rowNumber][j].possibilities =
          currentState[rowNumber][j].possibilities.filter((p) => p !== +value)
      }
    }
  }

  const removeValueFromColPositions = ({
    currentState,
    colNumber,
    exceptions,
    value
  }) => {
    for (let i = 0; i < 9; i += 1) {
      if (!exceptions.includes(i)) {
        currentState[i][colNumber].possibilities =
          currentState[i][colNumber].possibilities.filter((p) => p !== +value)
      }
    }
  }

  const shootInSameLine = ({ currentState, boxNumber, value }) => {
    const { boxRow, boxCol } = getBoxRowCol(boxNumber)
    const occurrencesPositions = []
    for (let i = boxRow * 3; i < (boxRow + 1) * 3; i += 1) {
      for (let j = boxCol * 3; j < (boxCol + 1) * 3; j += 1) {
        if (currentState[i][j].possibilities.includes(+value)) {
          occurrencesPositions.push({ i, j })
        }
      }
    }
    if (occurrencesPositions[0].i === occurrencesPositions[1].i) {
      removeValueFromRowPositions({
        currentState,
        rowNumber: occurrencesPositions[0].i,
        exceptions: [occurrencesPositions[0].j, occurrencesPositions[1].j],
        value
      })
    }
    if (occurrencesPositions[0].j === occurrencesPositions[1].j) {
      removeValueFromColPositions({
        currentState,
        colNumber: occurrencesPositions[0].j,
        exceptions: [occurrencesPositions[0].i, occurrencesPositions[1].i],
        value
      })
    }
  }

  const setTheFinalState = (currentState) => {
    setState(currentState)
  }

  const addPossibilities = ({ currentState, showHelp = false }) => {
    setShowHelp(showHelp)
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        currentState[i][j].possibilities = []
      }
    }
    // Add possibilities - iterate through row, col and box for each cell
    //   - all nine numbers is the possibility
    //   - remove numbers found in corresponding row, col and box
    //   - check if possibilities array already includes the possibility
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        if (currentState[i][j].value) {
          continue
        }
        const rowNumber = i
        const colNumber = j
        const boxNumber = getBoxNumber({
          boxRow: Math.floor(i / 3),
          boxCol: Math.floor(j / 3)
        })
        const possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        for (let rowIterator = 0; rowIterator < 9; rowIterator += 1) {
          if (colNumber !== rowIterator) {
            const value = +currentState[rowNumber][rowIterator].value
            const presenceIndex = possibilities.findIndex((v) => v === value)
            if (presenceIndex !== -1) {
              possibilities.splice(presenceIndex, 1)
            }
          }
        }
        for (let colIterator = 0; colIterator < 9; colIterator += 1) {
          if (rowNumber !== colIterator) {
            const value = +currentState[colIterator][colNumber].value
            const presenceIndex = possibilities.findIndex((v) => v === value)
            if (presenceIndex !== -1) {
              possibilities.splice(presenceIndex, 1)
            }
          }
        }
        const { boxRow, boxCol } = getBoxRowCol(boxNumber)
        for (let iMini = boxRow * 3; iMini < (boxRow + 1) * 3; iMini += 1) {
          for (let jMini = boxCol * 3; jMini < (boxCol + 1) * 3; jMini += 1) {
            if (!(rowNumber === iMini && colNumber === jMini)) {
              const value = +currentState[iMini][jMini].value
              const presenceIndex = possibilities.findIndex((v) => v === value)
              if (presenceIndex !== -1) {
                possibilities.splice(presenceIndex, 1)
              }
            }
          }
        }
        currentState[rowNumber][colNumber].possibilities =
          [...new Set([
            ...currentState[rowNumber][colNumber].possibilities,
            ...possibilities
          ])]
      }
    }
    if (showHelp) {
      setState(currentState)
    }
  }

  const solve = (inputState, firstTime = false) => {
    const currentState = cloneDeep(inputState)
    if (firstTime) {
      backupStates = []
      addPossibilities({ currentState })
    }
    // Apply single length possibilities and empty the array
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        const { value, possibilities } = currentState[i][j]
        if (value === "" && possibilities.length === 1) {
          currentState[i][j] = {
            value: `${possibilities[0]}`,
            possibilities: []
          }
          removePossibilities({
            currentState,
            rowNumber: i,
            colNumber: j,
            value: `${possibilities[0]}`
          })
        }
      }
    }
    // Check all rows
    //   - find single occurrences and store it in uniqRow
    //   - Iterate through row again, fix value and remove from possibilities
    for (let rowNumber = 0; rowNumber < 9; rowNumber += 1) {
      const numberHashMap = {}
      for (let rowIterator = 0; rowIterator < 9; rowIterator += 1) {
        for (const num of currentState[rowNumber][rowIterator].possibilities) {
          if (numberHashMap[num]) {
            numberHashMap[num] += 1
          } else {
            numberHashMap[num] = 1
          }
        }
      }
      const uniq = Object.entries(numberHashMap).reduce((acc, [num, occurrences]) => {
        if (occurrences === 1) {
          return [...acc, +num]
        }
        return acc
      }, [])
      for (let rowIterator = 0; rowIterator < 9; rowIterator += 1) {
        const { value, possibilities } = currentState[rowNumber][rowIterator]
        if (!value) {
          const found = possibilities.find((p) => uniq.includes(p))
          if (found) {
            currentState[rowNumber][rowIterator] = {
              value: `${found}`,
              possibilities: []
            }
            removePossibilities({
              currentState,
              rowNumber,
              colNumber: rowIterator,
              value: `${found}`
            })
          }
        }
      }
    }
    // Check all cols
    //   - find single occurrences and store it in uniqCol
    //   - Iterate through col again, fix value and remove from possibilities
    for (let colNumber = 0; colNumber < 9; colNumber += 1) {
      const numberHashMap = {}
      for (let colIterator = 0; colIterator < 9; colIterator += 1) {
        for (const num of currentState[colIterator][colNumber].possibilities) {
          if (numberHashMap[num]) {
            numberHashMap[num] += 1
          } else {
            numberHashMap[num] = 1
          }
        }
      }
      const uniq = Object.entries(numberHashMap).reduce((acc, [num, occurrences]) => {
        if (occurrences === 1) {
          return [...acc, +num]
        }
        return acc
      }, [])
      for (let colIterator = 0; colIterator < 9; colIterator += 1) {
        const { value, possibilities } = currentState[colIterator][colNumber]
        if (!value) {
          const found = possibilities.find((p) => uniq.includes(p))
          if (found) {
            currentState[colIterator][colNumber] = {
              value: `${found}`,
              possibilities: []
            }
            removePossibilities({
              currentState,
              rowNumber: colIterator,
              colNumber,
              value: `${found}`
            })
          }
        }
      }
    }
    // Check all boxes
    //   - find single occurrences and store it in uniqBox
    //   - Iterate through box again, fix value and remove from possibilities
    for (let boxNumber = 0; boxNumber < 9; boxNumber += 1) {
      const { boxRow, boxCol } = getBoxRowCol(boxNumber)
      const numberHashMap = {}
      for (let i = boxRow * 3; i < (boxRow + 1) * 3; i += 1) {
        for (let j = boxCol * 3; j < (boxCol + 1) * 3; j += 1) {
          for (const num of currentState[i][j].possibilities) {
            if (numberHashMap[num]) {
              numberHashMap[num] += 1
            } else {
              numberHashMap[num] = 1
            }
          }
        }
      }
      const uniq = Object.entries(numberHashMap).reduce((acc, [num, occurrences]) => {
        if (occurrences === 1) {
          return [...acc, +num]
        }
        if (occurrences === 2) {
          shootInSameLine({ currentState, boxNumber, value: num })
        }
        return acc
      }, [])
      for (let i = boxRow * 3; i < (boxRow + 1) * 3; i += 1) {
        for (let j = boxCol * 3; j < (boxCol + 1) * 3; j += 1) {
          const { value, possibilities } = currentState[i][j]
          if (!value) {
            const found = possibilities.find((p) => uniq.includes(p))
            if (found) {
              currentState[i][j] = {
                value: `${found}`,
                possibilities: []
              }
              removePossibilities({
                currentState,
                rowNumber: i,
                colNumber: j,
                value: `${found}`
              })
            }
          }
        }
      }
    }
    // Check if all 81 cells are filled
    //   - if yes, set the State
    //   - if not, call solve again with the currentState object
    if (
      currentState.every((row) => row.every((cell) => cell.value))
    ) {
      setTheFinalState(currentState)
    } else {
      if (isEqual(currentState, inputState)) {
        if (backupStates.length) {
          const isValid = validateSolution(currentState)
          if (isValid) {
            backupStates.push({ state: cloneDeep(currentState), first: true })
            tryFirstTwoPossibilities(currentState, true)
          } else {
            const lastBackup = backupStates.pop()
            if (lastBackup.first) {
              const revertState = cloneDeep(lastBackup.state)
              backupStates.push({ state: revertState, first: false })
              tryFirstTwoPossibilities(revertState, false)
            } else {
              solve(currentState)
            }
          }
        } else {
          backupStates.push({ state: cloneDeep(currentState), first: true })
          tryFirstTwoPossibilities(currentState, true)
        }
      } else {
        solve(currentState)
      }
    }
  }

  const getHelp = () => {
    addPossibilities({ currentState: cloneDeep(state), showHelp: !showHelp })
  }

  const reset = () => {
    setState(DEFAULT_STATE)
    setInvalidRow(9)
    setInvalidCol(9)
    setInvalidBox(9)
    setShowHelp(false)
    backupStates = []
  }

  const handleGenerate = () => {
    reset()
    const newSudoku = makepuzzle()
    const newState = cloneDeep(DEFAULT_STATE)
    newSudoku.forEach((v, index) => {
      const rowNumber = Math.floor(index / 9)
      const colNumber = index % 9
      newState[rowNumber][colNumber].value = v || ""
    })
    setState(newState)
  }

  return (
    <div className="app">
      <div className="container">
        {state.map((row, i) => (
          <div key={i} className="row">
            {row.map(({ value, possibilities }, j) => (
              <div
                key={j}
                className={`cell ${
                  !((i + 1) % 3) && i !== 8 && "mb-4"
                  } ${
                  !((j + 1) % 3) && j !== 8 && "mr-4"
                  } ${
                  (
                    invalidRow === i ||
                    invalidCol === j ||
                    invalidBox === getBoxNumber({
                      boxRow: Math.floor(i / 3),
                      boxCol: Math.floor(j / 3)
                    })
                  ) && "invalid"
                  }`}
              >
                <div
                  className={`tooltip ${showHelp && "show"}`}
                >
                  <span>
                    {possibilities.reduce((acc, p, i) => {
                      if (!(i % 3) && i !== 0) {
                        return `${acc}\n${p}`
                      }
                      return `${acc} ${p}`
                    }, "")}
                  </span>
                </div>
                <div className="input-container">
                  <input
                    ref={(ref) => {
                      inputRefs.current[i * 9 + j] = ref
                    }}
                    className={`input${value && +value === +selectedNumber ? ' same-as-selected' : ''}`}
                    value={value}
                    onFocus={() => {
                      inputRefs.current[i * 9 + j].select()
                      if (value) {
                        setSelectedNumber(value)
                      }
                    }}
                    onBlur={() => setSelectedNumber(0)}
                    onChange={(e) => {
                      setCellValue({ value: e.target.value, i, j })
                    }}
                    onKeyDown={(e) => {
                      let rowNumber = i
                      let colNumber = j
                      switch (e.key) {
                        case "ArrowUp":
                          e.preventDefault()
                          rowNumber -= 1
                          break
                        case "ArrowDown":
                          e.preventDefault()
                          rowNumber += 1
                          break
                        case "ArrowLeft":
                          e.preventDefault()
                          colNumber -= 1
                          break
                        case "ArrowRight":
                          e.preventDefault()
                          colNumber += 1
                          break
                        default:
                          break
                      }
                      rowNumber = rowNumber < 0
                        ? 8
                        : (rowNumber > 8 ? 0 : rowNumber)
                      colNumber = colNumber < 0
                        ? 8
                        : (colNumber > 8 ? 0 : colNumber)
                      inputRefs.current[rowNumber * 9 + colNumber].select()
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button
          className="solve-button"
          onClick={() => solve(state, true)}
        >
          Solve
        </button>
        <button
          className="help-button"
          onClick={getHelp}
        >
          {showHelp ? "Don't help" : "Help"}
        </button>
        <button
          className="reset-button"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="new-button"
          onClick={handleGenerate}
        >
          New
        </button>
      </div>
      {/* <div style={{ margin: '16px 0', width: '100%', textAlign: 'center' }}>
        <AdSense.Google
          client='ca-pub-9179894717144436'
          slot='6141439349'
          style={{ display: 'block' }}
          format='auto'
          responsive='true'
          layoutKey='-gw-1+2a-9x+5c'
        />
      </div> */}
      <BlogBox
        title={`Instantly Solve Any Sudoku Puzzle`}
        hideHome
      >
        <h2>
          How to Use the Sudoku Solver
        </h2>
        <ul>
          <li>Step 1: Enter Your puzzle into Sudoku Grid</li>
          <li>Step 2: Click 'Solve' and Get Instant Results</li>
        </ul>
        <h2>
          Features of Our Sudoku Solver
        </h2>
        <ul>
          <li>
            Tackles all Sudoku difficulty levels: Easy, Medium, Hard, and Expert.
          </li>
          <li>
            High-Performance Sudoku Solver: Delivers Rapid and Precise Solutions.
          </li>
          <li>
            Instant Sudoku Solver: Crack Even the Hardest Puzzles in Seconds
          </li>
          <li>
            Enjoy seamless Sudoku solving across all devices: Mobile, Tablet, and Desktop.
          </li>
          <li>
            Conquer Impossible Sudoku Puzzles: Solve even the most challenging grids with ease.
          </li>
        </ul>
        <h2>
          Frequently Asked Questions (FAQ)
        </h2>
        <ul>
          <li>
            Can I Solve Any Sudoku Puzzle with This Tool?: Yes
          </li>
          <li>
            Is This Sudoku Solver Free to Use?: Yes
          </li>
          <li>
            Does This Sudoku Solver Work for X Sudoku Variants?: No works only for 9X9
          </li>
          <li>
            How long does it take to solve any Sudoku puzzle?: No time - within milliseconds
          </li>
        </ul>
      </BlogBox>
      <div className="blogs-list">
        {BLOGS.map(({ title, img, link }) => (
          <BlogCard
            title={title}
            img={img}
            link={link}
          />
        ))}
      </div>
    </div>
  )
}

export default App
