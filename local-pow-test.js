const fs = require('fs');
const crypto = require('crypto');
const os = require('os');

const LEDGER_HASH = "58f1c9aa220ebb91bf1d623a3fa6578b53811f207c115588e2263a2747b4c168";
const PUBKEY_HEX = "ed4758c4c388a93617708d00a53823f661d309712d354428b4f825e021b6e3f416";
const FILE_SIZE = 500 * 1024 * 1024;

async function runPowTest(lgrhex, pubkeyhex) {
    // File init
    let startTime = performance.now();
    const filePath = "./testfile.dat";
    if (!fs.existsSync(filePath)) {
        console.log(`Creating file: ${filePath}, Size: ${FILE_SIZE / 1024 / 1024} MB`);
        fs.writeFileSync(filePath, Buffer.alloc(FILE_SIZE, 0));
    } else {
        const stats = fs.statSync(filePath);
        console.log(`File exists: ${filePath}, Size: ${stats.size / 1024 / 1024} MB`);
        if (stats.size !== FILE_SIZE) {
            console.error(`File size mismatch: Expected ${FILE_SIZE / 1024 / 1024} MB, Got ${stats.size / 1024 / 1024} MB`);
            process.exit(1);
        }
    }
    const initTime = performance.now() - startTime;

    // PoW
    startTime = performance.now();
    let hash = lgrhex;
    for (let i = 0; i < 1024; i++) {
        hash = crypto.createHash('sha256').update(hash + pubkeyhex).digest('hex');
        if (i % 100 === 0) console.log(`Hash progress: ${(i / 1024 * 100).toFixed(2)}%`);
    }
    const powTime = performance.now() - startTime;

    // File hash
    startTime = performance.now();
    const fileHash = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
    const hashTime = performance.now() - startTime;

   
// Metrics
    const totalTime = initTime + powTime + hashTime;
    console.log(`Init: ${initTime.toFixed(2)}ms`);
    console.log(`PoW: ${powTime.toFixed(2)}ms`);
    console.log(`HashFile: ${hashTime.toFixed(2)}ms`);
    console.log(`Total: ${totalTime.toFixed(2)}ms`);
    console.log(`CPU: ${os.cpus()[0].model}, Load: ${os.loadavg()[0].toFixed(2)}`);
    console.log(`Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Score: +1`);
    console.log(`File Hash: ${fileHash}`);

    fs.appendFileSync("./pow_test_log.txt", JSON.stringify({
        fileSize: fs.statSync(filePath).size / 1024 / 1024,
        fileHash,
        time: new Date().toISOString(),
        initTime,
        powTime,
        hashTime,
        totalTime,
        cpu: os.cpus()[0].model,
        load: os.loadavg()[0],
        memory: process.memoryUsage().heapUsed / 1024 / 1024
    }, null, 2) + "\n");

    return { fileHash };
}

runPowTest(LEDGER_HASH, PUBKEY_HEX).then(result => {
    console.log(`Result:`, result);
}).catch(err => {
    console.error(`Error: ${err.message}`);
});
