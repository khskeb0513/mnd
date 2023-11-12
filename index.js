let currentDeg = 0;
setInterval(
	() => {
		currentDeg = currentDeg + 30
		document.querySelector('.progress-circle').setAttribute('style', 'transform: rotate(' + currentDeg + 'deg);');
	},
	150
)

let mndLogoTapped = 0;
document.querySelector('h2').addEventListener('click', () => {
	console.log(mndLogoTapped)
	mndLogoTapped = mndLogoTapped + 1
	if (mndLogoTapped > 3) {
		document.location.href = './setting.html'
	}
})

document.querySelector('span#version-text').innerHTML = window.localStorage.getItem('version')
document.querySelector('span#sidebar-manufactor').innerHTML = window.localStorage.getItem('제조사')
document.querySelector('span#sidebar-model').innerHTML = window.localStorage.getItem('모델명')
document.querySelector('span#sidebar-os').innerHTML = window.localStorage.getItem('OS버전')

document.querySelector('div#view-log').addEventListener('click', () => {
	document.location.href = './log.html'
})

const twoDigits = (a) => {
	if (String(a).length == 1) {
		return '0' + a
	} else return a
}

const dateToStr = (date) => {
	const year = date.getFullYear() - 2000
	const month = twoDigits(date.getMonth() + 1)
	const day = twoDigits(date.getDate())
	const hour = twoDigits(date.getHours())
	const min = twoDigits(date.getMinutes())
	return `${year}.${month}.${day} ${hour}:${min}`
}

let logs = JSON.parse(window.localStorage.getItem('logs') || '[]')
if (logs.length > 0) {
	logs = logs.map(v => ({...v, date: new Date(v.date)}))
	logs.sort((a, b) => a.date.valueOf() - b.date.valueOf())
	console.log(logs[0])
	document.querySelector('#installed-date-text').innerHTML = `<strong>설치일시 : </strong>${dateToStr(logs[0].date)}`
	logs.reverse()
	const lastClosed = logs.find(v => v.isOpened == false)
	document.querySelector('#closed-date-text').innerHTML = `<strong>차단일시 : </strong>${dateToStr(lastClosed.date)}`
	setInterval(() => {
		const timeDiff = (new Date() - lastClosed.date) / 1000
		const count = {}
		count.days = Math.floor(timeDiff / (24 * 3600))
		count.hours = twoDigits(Math.floor((timeDiff % (24 * 3600)) / 3600))
		count.minutes = twoDigits(Math.floor((timeDiff % 3600) / 60))
		count.seconds = twoDigits(Math.floor(timeDiff % 60))
		document.querySelector('span.date').innerHTML = `${count.days}일<br>${count.hours} : ${count.minutes} : <b>${count.seconds}</b>`
	}, 1000)
}