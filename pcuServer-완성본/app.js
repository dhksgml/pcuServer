const express = require('express');
const path = require('path');
const morgan = require('morgan');


const { sequelize } = require('./models');
const { User,Sequelize:{Op} } = require('./models');
// const User = require('./models/index').User;


const app = express();
sequelize.sync({force:true})
    .then(()=>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    });


app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));


app.post('/login',async (req,res,next)=>{
    try{
        //조회
    //1. req.body.id & req.body.password & req.body.gameName
    //2. DB에서 req.body.gameName findOne
    //3. req.body.id가 db에 있는지 확인 ->
    //4. 3번의 id랑 pw 일치 확인
    //5. 일치하면 닉네임 반환 or "Error"반환
        var searchGame = await User.findOne({ where: { gameName: req.body.gameName } });
        if(searchGame.gameName)
        {
            // console.log("게임이름 같음");
            var searchID = await User.findOne({ where:{userId: req.body.userId}});
            if(searchID){
                // console.log("아이디가 있습니다.");
                var searchPassword = await User.findOne({
                    where:{[Op.and]:{password: req.body.password,userId: req.body.userId}}
                });                    
                if(searchPassword){
                    // console.log("로그인 성공!");
                    res.send(req.body.userId);
                }
                else{
                    // console.log("비밀번호가 다릅니다.");
                    res.send("Error");
                }
            }
            else{
                console.log("그런 아이디는 없습니다.");
                res.send("Error");
            }
        }
    }
    catch(error){
        console.error(error);
        next(error);
    }

});

app.post('/register',async (req,res,next)=>{
    //등록
    //1. req.body.id & req.body.password & req.body.gameName
    //2. DB에서 req.body.gameName findOne
    //3. push {pw:pw,nick:nick}
    //4. 결과 true false 반환

    try{
        const exUser = await User.create({
            gameName: req.body.gameName,
            userId: req.body.userId,
            password: req.body.password
        });
            
        res.send(true);
    }
    catch(error)
    {
        console.error(error);
        res.send(false);
        next(error);
    };
     
});


app.listen("8605",()=>{
    console.log('8605번 포트에서 대기 중..');
});