document.querySelector('input[name=version]').value = window.localStorage.getItem('version')
document.querySelector('input[name=제조사]').value = window.localStorage.getItem('제조사')
document.querySelector('input[name=모델명]').value = window.localStorage.getItem('모델명')
document.querySelector('input[name=OS버전]').value = window.localStorage.getItem('OS버전')

const saveDeviceInfo = () => {
	window.localStorage.setItem('version', document.querySelector('input[name=version]').value)
	 window.localStorage.setItem('제조사', document.querySelector('input[name=제조사]').value)
	 window.localStorage.setItem('모델명', document.querySelector('input[name=모델명]').value)
	 window.localStorage.setItem('OS버전', document.querySelector('input[name=OS버전]').value)
}

const addRow = () => {
	const isOpened = document.querySelector('input[name=isOpened]').checked
	const date = document.querySelector('input[name=date]').value
	const title = document.querySelector('input[name=title]').value
	const detail = document.querySelector('input[name=detail]').value
	const row = {
		isOpened, date, title, detail
	}
	const logs = JSON.parse(window.localStorage.getItem('logs') || '[]')
	logs.push(row)
	window.localStorage.setItem('logs', JSON.stringify(logs))
	window.location.reload()
}

const deleteRow = () => {
	if (window.localStorage.getItem('logs') == null) return
	const logs = JSON.parse(window.localStorage.getItem('logs'))
	logs.splice(Number(document.querySelector('input[name=rowNumber]').value), 1)
	window.localStorage.setItem('logs', JSON.stringify(logs))
	window.location.reload()
}

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
	logs.forEach((log, n) => {
		const date = new Date(log.date)
		document.querySelector('.logs').insertAdjacentHTML('afterbegin', `
			<p class="${log.isOpened ? 'camera-opened' : 'camera-closed'}">
				${n}th [${dateToStr(date)}]<br>
				${log.title}<br>
				${log.detail}<br>
			</p>
		`)
	})
}

document.querySelector('#data-textarea').value = window.localStorage.getItem('logs')
const setData = () => {
	window.localStorage.setItem('logs', document.querySelector('#data-textarea').value)
}