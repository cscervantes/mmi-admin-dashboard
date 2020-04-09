module.exports = {
    endpoints: {
        production: {
            url:'http://localhost:3000/mmi-endpoints/v0/',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.f2X7W_6J8g6y-jKto1fMj5zq7QkOLu9WBGw5b-sHAIc"
            }
        },
        development: {
            url: 'http://localhost:3000/mmi-endpoints/v0/',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.f2X7W_6J8g6y-jKto1fMj5zq7QkOLu9WBGw5b-sHAIc"
            }
        }
    },
    lambda_source: {
        production: {
            url:'http://localhost:3030/lambda-api/'
        },
        development: {
            url: 'http://localhost:3030/lambda-api/'
        }
    }
}