function createEmployeeRecord(employeeArr) {
    const employee = {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employee;
}

function createEmployeeRecords(employeeRecord) {
    return employeeRecord.map( employee => createEmployeeRecord(employee)
    );
    
}

function createTimeInEvent(record, timeIn) {
    const [date, hour] = timeIn.split(' ');

    record.timeInEvents.push(
        {type: 'TimeIn',
        hour: parseInt(hour),
        date: date
    })
    return record;
}

function createTimeOutEvent(record, timeOut) {
    const [date, hour] = timeOut.split(' ');

    record.timeOutEvents.push(
        {type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    })
    return record;
}

function hoursWorkedOnDate(record, dateStr) {
    const timeInEvent = record.timeInEvents.find( e => e.date === dateStr)
    const timeOutEvent = record.timeOutEvents.find( e => e.date === dateStr)

    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(record, dateStr) {
    return hoursWorkedOnDate(record, dateStr) * record.payPerHour;
}

function allWagesFor(record) {
    const daysWorked = record.timeInEvents.map(e => e.date);
    const totalWages = daysWorked.reduce((runningTotal, day) => {
        return runningTotal + wagesEarnedOnDate(record, day);
    }, 0)
    return totalWages
}

function calculatePayroll(recordArr) {
    return recordArr.reduce((runningTotal, employee) => {
        return runningTotal + allWagesFor(employee);
    }, 0)
}

function findEmployeeByFirstName(recordArr, firstName) {
    return recordArr.find(e => e.firstName === firstName)
}