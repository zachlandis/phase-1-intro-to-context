function createEmployeeRecord(employee) {
    let employeeInfo = {
        firstName: `${employee[0]}`,
        familyName: `${employee[1]}`,
        title: `${employee[2]}`,
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeInfo
}


function createEmployeeRecords(array) {
    let employees = []
    for (let i = 0; i < array.length; i++) {
        employees.push(createEmployeeRecord(array[i]))

    }
    return employees;
}

function createTimeInEvent(record, timestamp) {
    let [date, time] = timestamp.split(' ')
    let timeInObj = {
        type: 'TimeIn',
        hour: parseInt(time),
        date: date,
    }
    record.timeInEvents.push(timeInObj)
    return record
}


function createTimeOutEvent(record, timestamp) {
    let [date, time] = timestamp.split(' ')
    let timeOutObj = {
        type: 'TimeOut',
        hour: parseInt(time),
        date: date
    }
    record.timeOutEvents.push(timeOutObj)
    return record
}

function hoursWorkedOnDate(record, workDate) {
    let timeIn = record.timeInEvents.find(e => {
        return e.date === workDate;
    })
    
    let timeOut = record.timeOutEvents.find(e => {
        return e.date === workDate;
    })

    return (timeOut.hour - timeIn.hour) / 100

    
}

function wagesEarnedOnDate(record, workDate) {
    return hoursWorkedOnDate(record, workDate) * record.payPerHour
}

function allWagesFor(record) {
    const workDates = record.timeInEvents.map(e => e.date)
    
    let allPay = workDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(record, d)
    }, 0)

    return allPay
}


function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function (e, record){
        return e + allWagesFor(record)
    }, 0) 
}

