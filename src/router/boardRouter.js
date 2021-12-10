const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");

// localhost:5001/board?key=1&key2=value2&key3=value3
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", (req, res, next) => {
  console.log(req.type);
  // get방식은 req.query
  // post방식은 req.body
  const type = req.query.type;
  if ("list" === type) {
    try {
      // board 목록조회
      const dbconnect_Module = require("./dbconnect_module");

      // MYSQL 쿼리 호출 정보를 입력한다.
      // mybartis xml 파일명
      req.body.mapper = "BoardMapper";
      // select, insert, update, delete 중 택1
      req.body.crud = "select";
      // mybatis xml 파일에서 호출할 쿼리 id
      req.body.mapper_id = "selectBoardList";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error: ", error);
    }
  } else if ("save" === type) {
    // Board 저장
    try {
      // MySql API 모듈(CRUD)
      const dbconnect_Module = require("./dbconnect_module");

      // MySql 쿼리 호출 정보 입력
      req.body.mapper = "BoardMapper"; // mybatis xml 파일명
      req.body.crud = req.body.id ? "update" : "insert"; // select, insert, update, delete 중 입력
      req.body.mapper_id = req.body.id ? "updateBoard" : "insertBoard";

      router.use("/", dbconnect_Module);
      // next 는 현재 작업이 끝나서 response에 값을 넣고 보내지 않고 route로 던져서 처리한다
      // 즉 reponse 작업은 다음 route 에서 수행하도록 처리해준다
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error: ", error);
    }
  } else if ("delete" === type) {
    // Board 저장
    try {
      // MySql API 모듈(CRUD)
      const dbconnect_Module = require("./dbconnect_module");

      // MySql 쿼리 호출 정보 입력
      req.body.mapper = "BoardMapper"; // mybatis xml 파일명
      req.body.crud = "delete"; // select, insert, update, delete 중 입력
      req.body.mapper_id = "deleteBoard";

      router.use("/", dbconnect_Module);
      // next 는 현재 작업이 끝나서 response에 값을 넣고 보내지 않고 route로 던져서 처리한다
      // 즉 reponse 작업은 다음 route 에서 수행하도록 처리해준다
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error: ", error);
    }
  } else if ("count" === type) {
    try {
      // Board 리스트 조회
      const dbconnect_Module = require("./dbconnect_module");

      // MySql 쿼리 호출 정보 입력
      // mybatis xml 파일명
      req.body.mapper = "BoardMapper";
      // select, insert, update, delete 중 택1
      req.body.crud = "select";
      // mybatis xml 파일에서 호출할 쿼리 id
      req.body.mapper_id = "selectBoardListCount";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error: ", error);
    }
  } else if ("page" === type) {
    try {
      console.log(">>>>", req.body.length, req.body.start);
      // Board 리스트 조회
      const dbconnect_Module = require("./dbconnect_module");

      // MySql 쿼리 호출 정보 입력
      // mybatis xml 파일명
      req.body.mapper = "BoardMapper";
      // select, insert, update, delete 중 택1
      req.body.crud = "select";
      // mybatis xml 파일에서 호출할 쿼리 id
      req.body.mapper_id = "selectBoardListPage";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error: ", error);
    }
  }
});

module.exports = router;
