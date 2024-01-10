const { stdin, stdout } = require('process')
const readline = require('readline')
const rl = readline.createInterface(stdin, stdout)

let 
    dimension,
    board, 
    currentPlayer = 1,
    player1Score = 0,
    player2Score = 0,
    records = []


function initialize() {
    rl.question("Enter Dimension: ", answer => {
        dimension = parseInt(answer)
        board = createBoard(dimension)
        console.log(board)

        playSosGame()
    })
}

function createBoard(size) {
    let board = [];
    for(let i = 0; i < size; i++) {
        board.push([]);
        for(let j = 0; j < size; j++) {
            board[i].push(" ");
        }
    }
    return board
}

function playSosGame() {
    console.log(`Enter player ${currentPlayer} move (x,y,[S or O]):`)
    rl.on("line", move => {
        const [x, y, token] = move.split(move.includes(" ") ? " " : ",");
        boardMove(parseInt(x), parseInt(y), token)
        console.log(`Enter player ${currentPlayer} move (x,y,[S or O]):`)
    })
}

function boardMove(x,y, token) {
    console.clear()
    if (x == 0 || y == 0 || x > dimension || y > dimension) {
        console.log("Invalid move")
        console.log(board)
        return
    }
    
    board[y-1][x-1] = token.toUpperCase()
    console.log(board)

    if(checkWin()) {
        console.log(`Player ${currentPlayer} got SOS!`)
        currentPlayer == 1 ? player1Score++ : player2Score++
    } else {
        currentPlayer = currentPlayer == 1 ? 2 : 1;
    }
    console.log(`Player 1: ${player1Score} score\nPlayer 2: ${player2Score} score`)

}

function checkWin() {
    let win = false

    for(let i = 0; i < dimension; i++) {
        for(let j = 0; j < dimension; j++) {
            if(board[i][j] == "S") {
                const check = checkNeighbor(i,j)
                const coordinates = check[1]
                
                if(records.some(c =>  c[0] === coordinates[0] && c[1] === coordinates[1] && c[2] === coordinates[2])) {
                    return
                }
                records.push(coordinates)
                if(check[0] == "SOS") {
                    win = true
                }
                
            }
        }
    }


    return win
}

function checkNeighbor(y,x) {
    const offsetx = [0, 1, 1, 1, 0, -1, -1, -1]
    const offsety = [-1, -1, 0, 1, 1, 1, 0, -1]

    let key = ""
    let record = []

    for(let i = 0; i < 8; i++) {
        const nx = x + offsetx[i]
        const ny = y + offsety[i]
        if(nx < 0 || ny < 0 || nx > dimension || ny > dimension) {
            continue
        }

        if(board[ny][nx] == "O") {
            const mx = offsetx[i] == 0 ? 0 : offsetx[i] > 0 ? offsetx[i] + 1 : offsetx[i] - 1
            const my = offsety[i] == 0 ? 0 : offsety[i] > 0 ? offsety[i] + 1 : offsety[i] - 1

            if(board[y + my][x + mx] == "S") {
                key = "SOS"
                record.push([y,x])
                record.push([ny,nx])
                record.push([y + my, x + mx])
            }
        }
    }

    return [key, record]
}

initialize()


/*


*/