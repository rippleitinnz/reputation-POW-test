# Reputation POW Test

This repository contains a self-test for nodes to measure their **Proof-of-Work (PoW)** performance, which is essential for running the Evernode Reputation Contract.

---

## ⚙️ System Requirements

- **Operating System**: Ubuntu 20.04+ or equivalent Linux environment
- **Node.js**: v14 or higher
- **Memory**: Minimum 2GB RAM
- **CPU**: Multi-core recommended for realistic performance measurement
- **Disk Space**: 520MB (script is lightweight)

---

## 🔍 Check Node.js Installation

Before running the test, verify that Node.js is installed:

```
node -v
```

2. Set Directory Permissions
Set the permissions to allow read, write, and execute access for the user:

```
chmod 700 ~/pow-test
```
3. Navigate to the Directory
Move into the newly created directory:

```
cd ~/pow-test
```

4. Create the Test Script File
Create an empty JavaScript file named local_pow_test.js
```
touch local_pow_test.js
```

5. Add the Test Script
Open the local_pow_test.js file in a text editor (e.g., nano) and paste the test script into it:
```
nano local_pow_test.js
```

6. Run the Test
Execute the test using Node.js:
```
node local_pow_test.js
```
