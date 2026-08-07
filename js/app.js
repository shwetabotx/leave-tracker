console.log("Employee Leave Tracker Loaded");

let leaveRequests = [];
let editIndex = -1;

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const leaveTypeFilter = document.getElementById("leaveTypeFilter");

// Search Event

searchInput.addEventListener("input", function () {

    applyFilters();

});

statusFilter.addEventListener("change", function () {
    applyFilters();
});

leaveTypeFilter.addEventListener("change", function () {

    applyFilters();

});

// Search & Filter Functions

function applyFilters() {

    const searchText =
        searchInput.value.trim().toLowerCase();

    const selectedStatus =
        statusFilter.value;

    const selectedLeaveType =
        leaveTypeFilter.value;

    const filteredRequests = leaveRequests.filter((leave) => {


        // Search by Employee Name or Employee ID

        const matchesSearch =
            leave.employeeName.toLowerCase().includes(searchText) ||
            leave.employeeId.toLowerCase().includes(searchText);


        // Status filter

        const matchesStatus =
            selectedStatus === "all" ||
            leave.status === selectedStatus;


        // Leave Type filter

        const matchesLeaveType =
            selectedLeaveType === "all" ||
            leave.leaveType === selectedLeaveType;


        return (
            matchesSearch &&
            matchesStatus &&
            matchesLeaveType
        );

    });


    renderLeaveRequests(filteredRequests);

}

// ======================================================
// FORM
// ======================================================

const leaveForm =
    document.getElementById("leaveForm");


leaveForm.addEventListener("submit", function (event) {

    event.preventDefault();


    if (validateForm()) {

        if (editIndex === -1) {

            addLeaveRequest();

        } else {

            updateLeaveRequest();

        }

    }

});

// Form Validation Function

function validateForm() {

    clearErrors();

    let isValid = true;

    // Employee Name Validation

    const employeeName =
        document
            .getElementById("employeeName")
            .value
            .trim();


    const nameRegex =
        /^[A-Za-z ]+$/;


    if (employeeName === "") {

        document
            .getElementById("employeeNameError")
            .textContent =
            "Employee Name is required.";

        isValid = false;

    }

    else if (!nameRegex.test(employeeName)) {

        document
            .getElementById("employeeNameError")
            .textContent =
            "Employee Name should contain only alphabets and spaces.";

        isValid = false;

    }
    // Employee ID Validation

    const employeeId =
        document
            .getElementById("employeeId")
            .value
            .trim();


    if (employeeId === "") {

        document
            .getElementById("employeeIdError")
            .textContent =
            "Employee ID is required.";

        isValid = false;

    }
    // Leave Type Validation
    const leaveType =
        document
            .getElementById("leaveType")
            .value;


    if (leaveType === "") {

        document
            .getElementById("leaveTypeError")
            .textContent =
            "Please select a leave type.";

        isValid = false;

    }
    // Start Date Validation
    const startDate =
        document
            .getElementById("startDate")
            .value;


    if (startDate === "") {

        document
            .getElementById("startDateError")
            .textContent =
            "Please select a start date.";

        isValid = false;

    }
    // End Date Validation
    const endDate =
        document
            .getElementById("endDate")
            .value;


    if (endDate === "") {

        document
            .getElementById("endDateError")
            .textContent =
            "Please select an end date.";

        isValid = false;

    }
    // Date Range Validation
    
    if (startDate !== "" && endDate !== "") {

        const start =
            new Date(startDate);

        const end =
            new Date(endDate);


        // Start date cannot be after end date

        if (start > end) {

            document
                .getElementById("endDateError")
                .textContent =
                "End Date must be after Start Date.";

            isValid = false;

        }


        // Calculate total days

        const totalDays =
            Math.floor(
                (end - start) /
                (1000 * 60 * 60 * 24)
            ) + 1;


        // Leave cannot exceed 30 days

        if (totalDays > 30) {

            document
                .getElementById("endDateError")
                .textContent =
                "Leave cannot exceed 30 consecutive days.";

            isValid = false;

        }

    }

    // Reason Validation

    const reason =
        document
            .getElementById("reason")
            .value
            .trim();


    if (reason === "") {

        document
            .getElementById("reasonError")
            .textContent =
            "Reason is required.";

        isValid = false;

    }

    else if (reason.length < 10) {

        document
            .getElementById("reasonError")
            .textContent =
            "Reason must contain at least 10 characters.";

        isValid = false;

    }
    return isValid;
}

// Add leave request

function addLeaveRequest() {

    const employeeName =
        document
            .getElementById("employeeName")
            .value
            .trim();


    const employeeId =
        document
            .getElementById("employeeId")
            .value
            .trim();


    const leaveType =
        document
            .getElementById("leaveType")
            .value;


    const startDate =
        document
            .getElementById("startDate")
            .value;


    const endDate =
        document
            .getElementById("endDate")
            .value;


    const reason =
        document
            .getElementById("reason")
            .value
            .trim();


    const status =
        document
            .getElementById("status")
            .value;


    // Calculate total leave days

    const start =
        new Date(startDate);

    const end =
        new Date(endDate);


    const totalLeaveDays =
        Math.floor(
            (end - start) /
            (1000 * 60 * 60 * 24)
        ) + 1;


    // Create leave request object

    const leaveRequest = {

        employeeName: employeeName,

        employeeId: employeeId,

        leaveType: leaveType,

        startDate: startDate,

        endDate: endDate,

        totalLeaveDays: totalLeaveDays,

        reason: reason,

        status: status,

        createdDate:
            new Date().toLocaleDateString()

    };

    leaveRequests.push(leaveRequest);
    saveToLocalStorage();

    console.log("Leave request added:");
    console.log(leaveRequest);

    renderLeaveRequests();
    leaveForm.reset();

    document
        .getElementById("status")
        .value = "Pending";

    document
        .getElementById("employeeName")
        .disabled = false;

    document
        .getElementById("employeeId")
        .disabled = false;

}

function renderLeaveRequests(
    requests = leaveRequests
) {

    console.log("renderLeaveRequests called");


    const tableBody =
        document.getElementById("leaveTableBody");
    tableBody.innerHTML = "";

    if (requests.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    class="text-center">

                    No Leave Requests Found

                </td>

            </tr>

        `;

        return;

    }

    requests.forEach((leave) => {


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${leave.employeeName}
            </td>

            <td>
                ${leave.employeeId}
            </td>

            <td>
                ${leave.leaveType}
            </td>

            <td>
                ${leave.startDate}
            </td>

            <td>
                ${leave.endDate}
            </td>

            <td>
                ${leave.totalLeaveDays}
            </td>

            <td>
                ${leave.status}
            </td>

            <td>
                ${leave.createdDate}
            </td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editLeaveRequest('${leave.employeeId}')">

                    Edit

                </button>


                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteLeaveRequest('${leave.employeeId}')">

                    Delete

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}

// Save to local storage

function saveToLocalStorage() {

    localStorage.setItem(
        "leaveRequests",
        JSON.stringify(leaveRequests)
    );

}

// Load from local storage

function loadFromLocalStorage() {

    const storedData =
        localStorage.getItem("leaveRequests");


    if (storedData) {

        leaveRequests =
            JSON.parse(storedData);

    }
}

// Edit leave request function

function editLeaveRequest(employeeId) {

    const index =
        leaveRequests.findIndex(
            (leave) =>
                leave.employeeId === employeeId
        );


    if (index === -1) {

        return;

    }
    editIndex = index;

    const leave =
        leaveRequests[index];
    document
        .getElementById("employeeName")
        .value =
        leave.employeeName;

    document
        .getElementById("employeeId")
        .value =
        leave.employeeId;

    document
        .getElementById("employeeName")
        .disabled = true;

    document
        .getElementById("employeeId")
        .disabled = true;

    document
        .getElementById("leaveType")
        .value =
        leave.leaveType;


    document
        .getElementById("startDate")
        .value =
        leave.startDate;


    document
        .getElementById("endDate")
        .value =
        leave.endDate;


    document
        .getElementById("reason")
        .value =
        leave.reason;


    document
        .getElementById("status")
        .value =
        leave.status;


    console.log(
        "Editing request:",
        employeeId
    );

}

// Update leave request function

function updateLeaveRequest() {


    const leave =
        leaveRequests[editIndex];

    leave.leaveType =
        document
            .getElementById("leaveType")
            .value;


    leave.startDate =
        document
            .getElementById("startDate")
            .value;

    leave.endDate =
        document
            .getElementById("endDate")
            .value;

    leave.reason =
        document
            .getElementById("reason")
            .value
            .trim();


    leave.status =
        document
            .getElementById("status")
            .value;

    const start =
        new Date(leave.startDate);

    const end =
        new Date(leave.endDate);


    leave.totalLeaveDays =
        Math.floor(
            (end - start) /
            (1000 * 60 * 60 * 24)
        ) + 1;

    saveToLocalStorage();

    renderLeaveRequests();

    leaveForm.reset();

    document
        .getElementById("status")
        .value = "Pending";

    document
        .getElementById("employeeName")
        .disabled = false;

    document
        .getElementById("employeeId")
        .disabled = false;

    editIndex = -1;

    console.log("Leave request updated.");

}

// Delete leave request function
function deleteLeaveRequest(employeeId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this leave request?"
        );

    if (confirmDelete) {
        const index =
            leaveRequests.findIndex(
                (leave) =>
                    leave.employeeId === employeeId
            );

        if (index === -1) {
            return;
        }

       leaveRequests.splice(index, 1);

        saveToLocalStorage();
        renderLeaveRequests();

        console.log(
            "Leave request deleted."
        );

    }

}

function clearErrors() {

    document
        .getElementById("employeeNameError")
        .textContent = "";


    document
        .getElementById("employeeIdError")
        .textContent = "";


    document
        .getElementById("leaveTypeError")
        .textContent = "";


    document
        .getElementById("startDateError")
        .textContent = "";


    document
        .getElementById("endDateError")
        .textContent = "";


    document
        .getElementById("reasonError")
        .textContent = "";


    document
        .getElementById("statusError")
        .textContent = "";

}
loadFromLocalStorage();
renderLeaveRequests();