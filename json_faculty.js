import http from 'http';

const faculty = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;

   
    if (method === 'POST' && url === '/faculty') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const member = JSON.parse(body);

                faculty.push(member);

                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Faculty created successfully',
                    faculty: member
                }));

            } catch (error) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Invalid JSON'
                }));
            }
        });
    }

    
    else if (method === 'GET' && url === '/faculty') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(faculty));
    }

    
    else if (method === 'GET' && url.startsWith('/faculty/')) {
        const id = parseInt(url.split('/')[2]);

        const member = faculty.find(member => member.id === id);

        if (!member) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                message: 'Faculty not found'
            }));

            return;
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(member));
    }

    
    else if (method === 'PUT' && url.startsWith('/faculty/')) {
        const id = parseInt(url.split('/')[2]);

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const index = faculty.findIndex(member => member.id === id);

                if (index === -1) {
                    res.writeHead(404, {
                        'Content-Type': 'application/json'
                    });

                    res.end(JSON.stringify({
                        message: 'Faculty not found'
                    }));

                    return;
                }

                const updatedFaculty = JSON.parse(body);

                faculty[index] = {
                    id: id,
                    ...updatedFaculty
                };

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Faculty updated successfully',
                    faculty: faculty[index]
                }));

            } catch (error) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Invalid JSON'
                }));
            }
        });
    }

    
    else if (method === 'DELETE' && url.startsWith('/faculty/')) {
        const id = parseInt(url.split('/')[2]);

        const index = faculty.findIndex(member => member.id === id);

        if (index === -1) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                message: 'Faculty not found'
            }));

            return;
        }

        const deletedFaculty = faculty.splice(index, 1);

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: 'Faculty deleted successfully',
            faculty: deletedFaculty[0]
        }));
    }

    else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: 'Route not found'
        }));
    }
});

// ================================
// Start Server
// ================================
server.listen(4000, () => {
    console.log('Server running at http://localhost:4000');
});