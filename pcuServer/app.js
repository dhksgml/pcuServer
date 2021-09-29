const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');

const { sequelize } = require('./models');
const { User } = require('./models');
const passportConfig = require('./passport');

const app = express();
sequelize.sync({force:false})
    .then(()=>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    });
passportConfig(passport);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());




app.post('/login',async (req,res,next)=>{
    //조회
    //1. req.body.id & req.body.password & req.body.gameName
    if(User.findOne({where:gameName})==req.body.gameName) console.log("게임 이름 같음");
    //2. DB에서 req.body.gameName findOne
    //3. req.body.id가 db에 있는지 확인 ->
    //4. 3번의 id랑 pw 일치 확인
    //5. 일치하면 닉네임 반환 or "Error"반환
    
    console.log(req.body);
    res.send("로그인");

});

app.post('/register',async (req,res,next)=>{
    //등록
    //1. req.body.id & req.body.password & req.body.gameName
    const {id,password,gameName} = req.body;
    try{
        //2. DB에서 req.body.gameName findOne
        const exUser = await User.findOne({where: gameName});
        if(exUser == req.body.gameName){
            console.log("게임 이름 같음");

            //3. push {pw:pw,nick:nick}
            //4. 결과 true false 반환
        }
    }
    catch(error)
    {
        console.error(error);
        next(error);
    };
     
    
    console.log(req.body);
    res.send("레지스터");
});


app.listen("8605",()=>{
    console.log('8605번 포트에서 대기 중..');
});