import http from 'http';

const hospital = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // POST - Add Hospital Record
    if (method === 'POST' && url === '/hospital') {
        let body = "";

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newHospital = JSON.parse(body);
            hospital.push(newHospital);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: "Hospital record added successfully",
                data: newHospital
            }));
        });
    }

    // GET - Get All Hospital Records
    else if (method === 'GET' && url === '/hospital') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Hospital records retrieved successfully",
            data: hospital
        }));
    }

    // GET - Get Hospital Record by ID
    else if (method === 'GET' && url.startsWith('/hospital/')) {
        const hospitalId = parseInt(url.split('/')[2]);

        const hospitalRecord = hospital.find(h => h.id === hospitalId);

        if (hospitalRecord) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: "Hospital record retrieved successfully",
                data: hospitalRecord
            }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "Hospital record not found"
            }));
        }
    }

    // PUT - Update Hospital Record
    else if (method === 'PUT' && url.startsWith('/hospital/')) {
        const hospitalId = parseInt(url.split('/')[2]);

        let body = "";

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            let updatedHospital;

            try {
                updatedHospital = JSON.parse(body);
            } catch {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: "Request body must contain valid JSON"
                }));
                return;
            }

            const hospitalIndex = hospital.findIndex(h => h.id === hospitalId);

            if (hospitalIndex !== -1) {
                hospital[hospitalIndex] = updatedHospital;

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: "Hospital record updated successfully",
                    data: updatedHospital
                }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: "Hospital record not found"
                }));
            }
        });
    }

    // DELETE - Delete Hospital Record
    else if (method === 'DELETE' && url.startsWith('/hospital/')) {
        const hospitalId = parseInt(url.split('/')[2]);

        const hospitalIndex = hospital.findIndex(h => h.id === hospitalId);

        if (hospitalIndex !== -1) {
            const deletedHospital = hospital.splice(hospitalIndex, 1);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: "Hospital record deleted successfully",
                data: deletedHospital[0]
            }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "Hospital record not found"
            }));
        }
    }

    // Invalid Route
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Route not found"
        }));
    }
});

server.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/");
});