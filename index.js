// Queuing Models

function Addvalues() {
    const queueingModels = document.getElementById("queuing-model").value;
    const arrivalRate = document.getElementById('lambda'); 
    const serviceRate = document.getElementById('mew');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const ca = document.getElementById("variance-1");
    const cs = document.getElementById("variance-2");

    arrivalRate.style.display = "none";
    serviceRate.style.display = "none";
    min.style.display = "none";
    max.style.display = "none";
    ca.style.display = "none";
    cs.style.display = "none";
    
    if (queueingModels === "M/M/1" || queueingModels === "M/M/2") {
        arrivalRate.style.display = "block";
        serviceRate.style.display = "block";
    }

    if (queueingModels === "M/G/1" || queueingModels === "M/G/2") {
        arrivalRate.style.display = "block";
        min.style.display = "block";
        max.style.display = "block";
    }

    if (queueingModels === "G/G/1" || queueingModels === "G/G/2") {
        arrivalRate.style.display = "block";
        serviceRate.style.display = "block";
        ca.style.display = "block";
        cs.style.display = "block";
    }
}



let arrivalRate, serviceRate, min, max;

// M/M/1 Queue Model
function calculateMM1() {
    arrivalRate = Number(document.getElementById('lambda').value)
    serviceRate = Number(document.getElementById('mew').value)
    const utilization = arrivalRate / serviceRate;
    const averageQueueLengthQueue = Math.pow(utilization, 2) / (1 - utilization)
    const averageWaitingTimeQueue = averageQueueLengthQueue / arrivalRate
    const averageWaitingTimeSystem = averageWaitingTimeQueue + (1 / serviceRate)
    const averageQueueLengthSystem = arrivalRate * averageWaitingTimeSystem;

    document.getElementById("utilization").innerHTML = utilization; 
    document.getElementById("avg-queue-length").innerHTML =  averageQueueLengthQueue; 
    document.getElementById("avg-waitingTime-queue").innerHTML =  averageWaitingTimeQueue; 
    document.getElementById("avg-waitingTime-system").innerHTML =  averageWaitingTimeSystem; 
    document.getElementById("avg-queue-length-system").innerHTML = averageQueueLengthSystem; 

}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }

    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

function calculatePo(c, rho) {
    let res = 0
    for (let n = 0; n < c; n++) {
        res += Math.pow((c * rho), n) / factorial(n)
    }
    return 1 / (res + (Math.pow((c * rho), c) / (factorial(c) * (1 - rho))))
}

// M/M/2 Queue Model
function calculateMM2() {
    arrivalRate = Number(document.getElementById('lambda').value)
    serviceRate = Number(document.getElementById('mew').value)
    // Calculate utilization
    const utilization = arrivalRate / (2 * serviceRate);

    // Calculate average queue length and waiting 
    const averageQueueLengthQueue = (calculatePo(2, utilization) * Math.pow((arrivalRate / serviceRate), 2) * utilization) / (factorial(2) * Math.pow(1 - utilization, 2));
    const averageWaitingTimeQueue = averageQueueLengthQueue / arrivalRate
    const averageWaitingTimeSystem = averageWaitingTimeQueue + (1 / serviceRate)
    const averageQueueLengthSystem = arrivalRate * averageWaitingTimeSystem;

    document.getElementById("utilization").innerHTML = utilization; 
    document.getElementById("avg-queue-length").innerHTML =  averageQueueLengthQueue; 
    document.getElementById("avg-waitingTime-queue").innerHTML =  averageWaitingTimeQueue; 
    document.getElementById("avg-waitingTime-system").innerHTML =  averageWaitingTimeSystem; 
    document.getElementById("avg-queue-length-system").innerHTML = averageQueueLengthSystem; 

}

// M/G/1 Queue Model
function calculateMG1() {
    arrivalRate = Number(document.getElementById('lambda').value)
    min = Number(document.getElementById('min').value)
    max = Number(document.getElementById('max').value)
    serviceRate = 1 / ((min + max) / 2)

    const utilization = arrivalRate / serviceRate;
    const averageQueueLengthQueue = (Math.pow(arrivalRate, 2) * (Math.pow(max - min, 2) / 12) + Math.pow(utilization, 2)) / (2 * (1 - utilization));
    const averageWaitingTimeQueue = averageQueueLengthQueue / arrivalRate
    const averageWaitingTimeSystem = averageWaitingTimeQueue + (1 / serviceRate)
    const averageQueueLengthSystem = averageWaitingTimeSystem * arrivalRate

    document.getElementById("utilization").innerHTML = utilization; 
    document.getElementById("avg-queue-length").innerHTML =  averageQueueLengthQueue; 
    document.getElementById("avg-waitingTime-queue").innerHTML =  averageWaitingTimeQueue; 
    document.getElementById("avg-waitingTime-system").innerHTML =  averageWaitingTimeSystem; 
    document.getElementById("avg-queue-length-system").innerHTML = averageQueueLengthSystem; 

}

// M/G/2 Queue Model
function calculateMG2() {
    arrivalRate = Number(document.getElementById('lambda').value)
    min = Number(document.getElementById('min').value)
    max = Number(document.getElementById('max').value)
    serviceRate = 1 / ((min + max) / 2)
    const cs = (Math.pow(min - max, 2) / 12) / Math.pow(1 / serviceRate, 2)

    // Calculate utilization
    const utilization = arrivalRate / (2 * serviceRate);

    // Estimate the average length of queue for G/G/2 model
    const expaverageQueueLengthQueue = (calculatePo(2, utilization) * Math.pow((arrivalRate / serviceRate), 2) * utilization) / (factorial(2) * Math.pow(1 - utilization, 2));
    const averageWaitingTimeQueue = (expaverageQueueLengthQueue / arrivalRate) * ((1 + cs) / 2)

    const averageQueueLengthQueue = averageWaitingTimeQueue * arrivalRate
    const averageWaitingTimeSystem = averageWaitingTimeQueue + (1 / serviceRate)
    const averageQueueLengthSystem = arrivalRate * averageWaitingTimeSystem

    document.getElementById("utilization").innerHTML = utilization; 
    document.getElementById("avg-queue-length").innerHTML =  averageQueueLengthQueue; 
    document.getElementById("avg-waitingTime-queue").innerHTML =  averageWaitingTimeQueue; 
    document.getElementById("avg-waitingTime-system").innerHTML =  averageWaitingTimeSystem; 
    document.getElementById("avg-queue-length-system").innerHTML = averageQueueLengthSystem; 

}

// G/G/1 Queue Model
function calculateGG1() {
    arrivalRate = 1 / Number(document.getElementById('lambda').value)
    serviceRate = 1 / Number(document.getElementById('mew').value)
    const ca = Number(document.getElementById('variance-1').value) / (Math.pow(1 / arrivalRate, 2))
    const cs = Number(document.getElementById('variance-2').value) / (Math.pow(1 / serviceRate, 2))

    // Calculate utilization
    const utilization = arrivalRate / serviceRate;

    const averageQueueLengthQueue = (Math.pow(utilization, 2) * (1 + cs) * (ca + (Math.pow(utilization, 2) * cs))) / (2 * (1 - utilization) * (1 + Math.pow(utilization, 2) * cs));
    const averageWaitingTimeQueue = averageQueueLengthQueue / arrivalRate
    const averageWaitingTimeSystem = averageWaitingTimeQueue + (1 / serviceRate)
    const averageQueueLengthSystem = arrivalRate * averageWaitingTimeSystem

    document.getElementById("utilization").innerHTML = utilization; 
    document.getElementById("avg-queue-length").innerHTML =  averageQueueLengthQueue; 
    document.getElementById("avg-waitingTime-queue").innerHTML =  averageWaitingTimeQueue; 
    document.getElementById("avg-waitingTime-system").innerHTML =  averageWaitingTimeSystem; 
    document.getElementById("avg-queue-length-system").innerHTML = averageQueueLengthSystem; 

}

// G/G/2 Queue Model
function calculateGG2() {
    arrivalRate = 1 / Number(document.getElementById('lambda').value)
    serviceRate = 1 / Number(document.getElementById('mew').value)
    const ca = Number(document.getElementById('variance-1').value) / (Math.pow(1 / arrivalRate, 2))
    const cs = Number(document.getElementById('variance-2').value) / (Math.pow(1 / serviceRate, 2))

    // Calculate utilization
    const utilization = arrivalRate / (2 * serviceRate);

    // Estimate the second moment of service time for M/M/2 model
    const expaverageQueueLengthQueue = (calculatePo(2, utilization) * Math.pow((arrivalRate / serviceRate), 2) * utilization) / (factorial(2) * Math.pow(1 - utilization, 2));

    const averageQueueLengthQueue = expaverageQueueLengthQueue * ((ca + cs) / 2)
    const averageWaitingTimeQueue = averageQueueLengthQueue / arrivalRate
    const averageWaitingTimeSystem = averageWaitingTimeQueue + (1 / serviceRate)
    const averageQueueLengthSystem = arrivalRate * averageWaitingTimeSystem

    document.getElementById("utilization").innerHTML = utilization; 
    document.getElementById("avg-queue-length").innerHTML =  averageQueueLengthQueue; 
    document.getElementById("avg-waitingTime-queue").innerHTML =  averageWaitingTimeQueue; 
    document.getElementById("avg-waitingTime-system").innerHTML =  averageWaitingTimeSystem; 
    document.getElementById("avg-queue-length-system").innerHTML = averageQueueLengthSystem; 


}

function Calculate(){
    const queueingModels = document.getElementById("queuing-model").value;
    if(queueingModels === "M/M/1") {
        calculateMM1();
    }

    if(queueingModels === "M/M/2") {
        calculateMM2(); 
    }

    if(queueingModels === "M/G/1") {
        calculateMG1(); 
    }

    if(queueingModels === "M/G/2") {
        calculateMG2(); 
    }

    if(queueingModels === "G/G/1"){
        calculateGG1();
    }

    if(queueingModels === "G/G/2") {
        calculateGG2(); 
    }

}