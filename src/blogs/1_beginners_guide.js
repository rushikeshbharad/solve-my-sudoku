import BlogBox from "../components/blog-box"
import imgBeginnersGuide from "../assets/blog-heros/begginers_guide.jpeg"

export default function BeginnersGuide() {
    console.log('image => ', imgBeginnersGuide)
    return (
        <BlogBox
            title="Sudoku 101: A Beginner's Guide to Solving Puzzles"
            hero={imgBeginnersGuide}
        >
            <>
                <p>
                    Sudoku is a logic-based number-placement puzzle. The objective is to fill a 9x9 grid with digits so that each column, each row, and each of the nine 3x3 subgrids that compose the grid contains all of the digits from 1 to 9.
                </p>
                <p>
                    Sudoku is a great way to improve your problem-solving skills and your concentration. It is also a fun and challenging way to pass the time.
                </p>
                <h2>How to Play Sudoku</h2>
                <ol>
                    <li>
                        Find a Sudoku puzzle. You can find Sudoku puzzles in newspapers, magazines, and online.
                    </li>
                    <li>
                        Look for the numbers that are already filled in. These numbers are called "givens."
                    </li>
                    <li>
                        Use the process of elimination to fill in the rest of the grid.
                    </li>
                </ol>
                <h2>Tips for Solving Sudoku Puzzles</h2>
                <ul>
                    <li>
                        Start by looking for the rows, columns, and 3x3 subgrids that have the most numbers already filled in.
                    </li>
                    <li>
                        Use the process of elimination to fill in the rest of the grid.
                    </li>
                    <li>
                        If you get stuck, take a break and come back to the puzzle later.
                    </li>
                    <li>
                        Don't be afraid to erase and start over.
                    </li>
                </ul>
                <h2>Sudoku Strategies</h2>
                <ul>
                    <li>
                        <b>Hidden Single:</b> A hidden single is a number that can only go in one cell in a row, column, or 3x3 subgrid.
                    </li>
                    <li>
                        <b>Naked Single:</b> A naked single is a number that can only go in one cell in a row, column, or 3x3 subgrid.
                    </li>
                    <li>
                        <b>Hidden Pair:</b> A hidden pair is a pair of numbers that can only go in two cells in a row, column, or 3x3 subgrid.
                    </li>
                    <li>
                        <b>Naked Pair:</b> A naked pair is a pair of numbers that can only go in two cells in a row, column, or 3x3 subgrid.
                    </li>
                </ul>
                <h2>Sudoku Tips for Beginners</h2>
                <ul>
                    <li>
                        Start with easy puzzles.
                    </li>
                    <li>
                        Use a pencil so that you can erase your mistakes.
                    </li>
                    <li>
                        Take your time and don't get frustrated.
                    </li>
                    <li>
                        There are many resources available online to help you learn how to solve Sudoku puzzles.
                    </li>
                </ul>
                <p>
                    Sudoku is a great way to improve your problem-solving skills and your concentration. It is also a fun and challenging way to pass the time. So give it a try!
                </p>
            </>
        </BlogBox>
    )
}
