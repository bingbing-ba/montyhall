;(function () {
  const img = new Image()
  img.src = './img/car.png'
})()
;(function () {
  const doors = document.querySelector('.doors')
  const frontDoors = document.querySelectorAll('.door-front')
  const prizes = document.querySelectorAll('.prize')
  const info = document.querySelector('.info')
  const replay = document.querySelector('.replay')
  let car, firstSelection, toOpen, finalSelection
  function init() {
    info.style.visibility = 'hidden'
    replay.style.visibility = 'hidden'
    prizes.forEach((prize) => {
      prize.style.backgroundImage = 'url("./img/goat.png")'
      prize.classList.remove('opened')
    })
    car = Math.floor(Math.random() * 3)
    firstSelection = null
    toOpen = null
    finalSelection = null
    frontDoors.forEach((frontDoor) => {
      frontDoor.style.transform = 'perspective(0px) rotateY(0deg)'
    })
    const selected = document.querySelector('.selected')
    if (selected) selected.classList.remove('selected')

    addEventToDoor()
  }
  init()

  // el이 몇 번째 자식인지 알아내는 함수
  function getIndex(el) {
    if (!el) return -1
    for (let i = 0; i < el.parentNode.children.length; i++) {
      if (el.parentNode.children[i] === el) {
        return i
      }
    }
    return -1
  }

  // 첫 번째 선택했을 때 선택하지 않은 문 중에서 염소를 열어주는 함수, 선택한것 강조
  function firstChoiceAndOpen() {
    if (firstSelection === car) {
      toOpen = _.sample([0, 1, 2].filter((i) => i !== car))
    } else {
      toOpen = [0, 1, 2].filter((i) => ![firstSelection, car].includes(i))[0]
    }
    openDoor(toOpen)
    frontDoors[firstSelection].parentNode.classList.add('selected')
    addInfo()
  }

  function addReplay() {
    const replayButton = document.querySelector('.replay button')
    replay.style.visibility = 'visible'
    replayButton.addEventListener('click', init, { once: true })
  }

  // 처음 문 선택 후 어떤 선택을 할 건지 정보 보여주는 함수

  function buttonGroupEventListener(e) {
    if (e.target.tagName === 'BUTTON') {
      if (e.target.innerText === '네') {
        finalSelection = [0, 1, 2].filter(
          (i) => ![firstSelection, toOpen].includes(i)
        )[0]
      } else {
        finalSelection = firstSelection
      }

      openDoor(finalSelection)
      info.style.visibility = 'hidden'
      addReplay()
      buttonGroup.removeEventListener('click', buttonGroupEventListener)
    }
  }

  function addInfo() {
    const buttonGroup = info.children[1]
    buttonGroup.addEventListener('click', buttonGroupEventListener)
    info.style.visibility = 'visible'
  }

  // 선택한 문 여는 함수
  function openDoor(idx) {
    if (car === idx) {
      prizes[car].style.backgroundImage = 'url("./img/car.png")'
      prizes[car].style.backgroundSize = 'contain'
    }
    frontDoors[idx].style.transform = 'perspective(1000px) rotateY(-100deg)'
    prizes[idx].classList.add('opened')
  }

  function doorsEventListener(e) {
    if (e.target.classList.contains('door-front')) {
      firstSelection = getIndex(e.target.parentNode)
      firstChoiceAndOpen()
      doors.removeEventListener('click', doorsEventListener)
    }
  }

  function addEventToDoor() {
    doors.addEventListener('click', doorsEventListener)
  }
})()
