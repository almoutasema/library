const btnSend = document.querySelector('#send')
const input = document.querySelector('#input')
let username = prompt('Please enter your username')

while (!username.trim()) {
    username = prompt('Please enter your username')
}

const socket = io()

const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

const userColor = getRandomColor()

const getTimeStamp = () => {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
}

btnSend.addEventListener('click', () => {
    if (input.value && username && !input.disabled) {
        const message = {
            username: username,
            message: input.value,
            color: userColor,
            timestamp: getTimeStamp()
        }
        socket.emit('chat message', message)
        input.value = '' // clear the input field
    }
})

input.addEventListener('keydown', (event) => {
    if (event.keyCode === 13 && input.value && username && !input.disabled) {
        const message = {
            username: username,
            message: input.value,
            color: userColor,
            timestamp: getTimeStamp()
        }
        socket.emit('chat message', message)
        input.value = '' // clear the input field
    }
})

// Disconnect socket on beforeunload event
window.addEventListener('beforeunload', () => {
    socket.emit('disconnect')
    socket.close()
})

socket.on('chat message', (data) => {
    const messageBox = document.querySelector('.message-box')
    messageBox.innerHTML += `<div class="message" style="background-color: ${data.color}"><strong>${data.username} (${data.timestamp}):</strong> ${data.message}</div>`
})

socket.on('server message', (message) => {
    const messageBox = document.querySelector('.message-box')
    messageBox.innerHTML += `<div class="message">${message}</div>`
    if (message === 'Du är placerad i kö...') {
        input.disabled = true
    } else if (message === 'Du har blivit flyttad till huvudrummet') {
        input.disabled = false
    }
})

// Check if the user is in the waiting room or main room
socket.on('current room', (room) => {
    if (room === 'main room') {
        input.disabled = false
    }
})
