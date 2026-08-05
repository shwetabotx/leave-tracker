console.log("Employee Leave Tracker Loaded");


let leaveRequests = [];

const leaveForm = document.getElementById("leaveForm");

leaveForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
        addLeaveRequest();

    }
});

function validateForm() {

    clearErrors();

    let isValid = true;

    // Employee Name Validation
    const employeeName = document
        .getElementById("employeeName")
        .value
        .trim();

    const nameRegex = /^[A-Za-z ]+$/;

    if (employeeName === "") {

        document.getElementById("employeeNameError").textContent =
            "Employee Name is required.";

        isValid = false;

    }
    else if (!nameRegex.test(employeeName)) {

        document.getElementById("employeeNameError").textContent =
            "Employee Name should contain only alphabets and spaces.";

        isValid = false;

    }

    // Employee ID Validation

    const employeeId = document
        .getElementById("employeeId")
        .value
        .trim();

    if (employeeId === "") {

        document.getElementById("employeeIdError").textContent =
            "Employee ID is required.";

        isValid = false;

    }

    // Leave Type Validation

    const leaveType = document
        .getElementById("leaveType")
        .value;

    if (leaveType === "") {

        document.getElementById("leaveTypeError").textContent =
            "Please select a leave type.";

        isValid = false;

    }

    // Start Date Validation

    const startDate = document
        .getElementById("startDate")
        .value;

    if (startDate === "") {

        document.getElementById("startDateError").textContent =
            "Please select a start date.";

        isValid = false;

    }

    // End Date Validation

    const endDate = document
        .getElementById("endDate")
        .value;

    if (endDate === "") {

        document.getElementById("endDateError").textContent =
            "Please select an end date.";

        isValid = false;

    }

    // Date Range Validation

    if (startDate !== "" && endDate !== "") {

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {

            document.getElementById("endDateError").textContent =
                "End Date must be after Start Date.";

            isValid = false;

        }

        const totalDays =
            Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

        if (totalDays > 30) {

            document.getElementById("endDateError").textContent =
                "Leave cannot exceed 30 consecutive days.";

            isValid = false;

        }

    }

    // Reason Validation

    const reason = document
        .getElementById("reason")
        .value
        .trim();

    if (reason === "") {

        document.getElementById("reasonError").textContent =
            "Reason is required.";

        isValid = false;

    }
    else if (reason.length < 10) {

        document.getElementById("reasonError").textContent =
            "Reason must contain at least 10 characters.";

        isValid = false;

    }

    return isValid;
}

// Function to add leave request to the array
function addLeaveRequest() {
    const employeeName = document.getElementById("employeeName").value.trim();
    const employeeId = document.getElementById("employeeId").value.trim();
    const leaveType = document.getElementById("leaveType").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const reason = document.getElementById("reason").value.trim();
    const status = document.getElementById("status").value;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const totalLeaveDays =
        Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const leaveRequest = {
        employeeName,
        employeeId,
        leaveType,
        startDate,
        endDate,
        totalLeaveDays,
        reason,
        status,
        createdDate: new Date().toLocaleDateString()
    };
    leaveRequests.push(leaveRequest);
    console.log(leaveRequests);

    renderLeaveRequests();

    leaveForm.reset();
    document.getElementById("status").value = "Pending";
}

function renderLeaveRequests() {
     console.log("renderLeaveRequests called");

    const tableBody = document.getElementById("leaveTableBody");

    tableBody.innerHTML = "";

    leaveRequests.forEach((leave) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${leave.employeeName}</td>
            <td>${leave.employeeId}</td>
            <td>${leave.leaveType}</td>
            <td>${leave.startDate}</td>
            <td>${leave.endDate}</td>
            <td>${leave.totalLeaveDays}</td>
            <td>${leave.status}</td>
            <td>${leave.createdDate}</td>
        `;

        tableBody.appendChild(row);
    });

}









function clearErrors() {

    document.getElementById("employeeNameError").textContent = "";
    document.getElementById("employeeIdError").textContent = "";
    document.getElementById("leaveTypeError").textContent = "";
    document.getElementById("startDateError").textContent = "";
    document.getElementById("endDateError").textContent = "";
    document.getElementById("reasonError").textContent = "";

}