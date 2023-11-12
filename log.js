let logs = JSON.parse(window.localStorage.getItem('logs') || '[]')

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
	const sec = twoDigits(Math.floor(Math.random() * (60 - 0) + 0))
	return `${year}.${month}.${day} ${hour}:${min}:${sec}`
}

if (logs.length > 0) {
	logs = logs.map(v => ({...v, date: new Date(v.date)}))
	logs.sort((a, b) => a.date.valueOf() - b.date.valueOf())
	logs.forEach((log) => {
		const date = new Date(log.date)
		document.querySelector('.logs-here').insertAdjacentHTML('afterbegin', `
			<p class="${log.isOpened ? 'camera-opened' : 'camera-closed'}">
				[${dateToStr(date)}]<br>
				${log.title}<br>
				${log.detail}<br>
			</p>
		`)
	})
}

document.querySelector('button').addEventListener('click', () => {
	document.location.href = 'index.html'
})

document.querySelector('.back').addEventListener('click', () => {
	document.location.href = 'index.html'
})