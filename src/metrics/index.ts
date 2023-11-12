import http from 'http';
import promClient from 'prom-client';

const PORT = 3000;

export default function startMetricsServer() {
    promClient.collectDefaultMetrics();

    const server = http.createServer(async function (req, res) {
        try {
            if (req.url === '/metrics') {
                res.setHeader('Content-Type', promClient.register.contentType);
                res.write(await promClient.register.metrics());
                res.end();
                return;
            }
            res.statusCode = 404;
            res.write('Not found');
            res.end();
        } catch (err) {
            console.error(`Metrics server response error`);
            console.error(err);
            res.statusCode = 500;
            res.write('Internal server error');
            res.end();
        }
    })

    server.listen(PORT, function () {
        console.log(`Metrics server started at port ${PORT}`);
    });
}