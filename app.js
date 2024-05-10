const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // 정적 파일 제공

// 게시물 가져오기
app.get('/posts', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('서버 오류');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// 게시물 작성
app.post('/posts', (req, res) => {
    const newPost = req.body;
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('서버 오류');
            return;
        }
        const posts = JSON.parse(data);
        posts.push(newPost);
        fs.writeFile('data.json', JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('서버 오류');
                return;
            }
            res.redirect('/');
        });
    });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
